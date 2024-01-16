/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                                                         from 'react'
import {
  convertUTCtoLocalDateTime,
  get,
  getCurrentDate,
  getCurrentTime,
  post,
}                                                                    from '../../../Plugins/helpers'
import { useCookies }                                                from 'react-cookie'
import { Button, Empty, Form, Input, Select, message }               from 'antd'
import { CompaniesType, EmployeesType, ClientsGuests, VisitsType }   from '../../../types/globalTypes'
import VisitRegistrationFormItem                                     from './VisitRegistrationSelect'
import VisitorsList                                                  from './VisitorsList'
import VisitPurposeList                                              from './VisitPurposeList'
import VisitorAdditionList                                           from './VisitorAdditionList'
import {addresses}                                                   from './StaticSelectOptions'
import { DatePicker }                                                from 'antd'
import VisitRegistrationCollocationList                              from './VisitRegistrationCollocationList'
import CarPlatesItemList                                             from './CarPlatesItemList'
import useSetVisitor                                                 from '../../../Plugins/useSetVisitor'
import ClientsGuestsItemList                                         from './ClientsGuestsItemList'
import { useNavigate }                                               from 'react-router'
import SuccessMessage                                                from '../../UniversalComponents/SuccessMessage'


const VisitRegistrationForm = () => {
  const [cookies]                                      = useCookies(['access_token'])
  const [searchEmployeeValue, setSearchEmployeeValue]  = React.useState<string | undefined>()
  const [clientsEmployees, setClientsEmployees]        = React.useState<EmployeesType[]>()
  const [isCompanySelected, setIsCompanySelected]      = React.useState(false)
  const [form]                                         = Form.useForm()
  const visitors                                       = Form.useWatch('visitors', form)
  const navigate                                       = useNavigate()
  const [messageApi, contextHolder]                    = message.useMessage()
  const [clientsGuests, setClientsGuests]              = React.useState<ClientsGuests[]>([])
  const [carPlates, setCarPlates]                      = React.useState<string[]>([])
  const [checkedList, setCheckedList]                  = React.useState<{ [key: string]: string[] }>({})
  const {
    companyNames,
    companiesColocations,
    setSearchParams,
    setSelectedVisitors,
    searchParams,
    selectedVisitors,
    addressId,
  } = useSetVisitor()

  const companyId                         = searchParams.get('companyId')

  const selectCompany = async(_: string, option: CompaniesType) => {
    setSearchParams(`companyId=${option.id}`)
    const companiesEmployees = await get(`getAllClientsEmployees?companyId=${option.id}`, cookies.access_token)
    setClientsEmployees(companiesEmployees.data)
    setSelectedVisitors([])
    localStorage.removeItem('visitPurpose')
    form.setFieldValue('visitAddress', null)
    setIsCompanySelected(true)
  }

  const selectAddress = (addressId: string) => {
    const companyId = searchParams.get('companyId')
    setSearchParams(`companyId=${companyId}&addressId=${addressId}`)
    setCheckedList({})
  }

  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchEmployeeValue(e.target.value.toLowerCase())
  }

  const addVisitor = (id: number) => {
    setSelectedVisitors((prev) => prev.includes(id) ? prev : [...prev, id])
  }

  const removeVisitor = (id: number) => {
    setSelectedVisitors((prev) => prev.filter((el) => el !== id))
  }

  const resetForm = () => {
    form.resetFields()
    setSelectedVisitors([])
    setClientsEmployees([])
    setClientsGuests([])
    setCarPlates([])
    setIsCompanySelected(false)
    localStorage.removeItem('visitPurpose')
  }

  const registerVisit = async(values: VisitsType) => {
    const visitPurpose = localStorage.getItem('visitPurpose')
    if(companyId && (values?.visitors && values?.visitors.length > 0)){
      values.visitPurpose = visitPurpose ? JSON.parse(visitPurpose) : []
      values.visitCollocation = checkedList
      values.visitStatus = 'processing'
      values.creationDate = getCurrentDate()
      values.creationTime = getCurrentTime()
      values.clientsGuests = clientsGuests
      values.carPlates = carPlates
      values.scheduledVisitTime = convertUTCtoLocalDateTime(values.scheduledVisitTime)
      values.companyId = Number(companyId)

      const res = await post('postVisitDetails', values, cookies.access_token )
      if(!res.error){
        localStorage.clear()
        navigate(`/DLC Žurnalas/Vizitai/${res.data}?visitAddress=${values.visitAddress}`)
      }
    }else{
      messageApi.error({
        type:    'error',
        content: 'Nepasirinkti įmonės darbuotojai',
      })
    }
  }

  const onkeydown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  return (
    <>
      <Form form={form} onFinish={registerVisit} onKeyDown={onkeydown}>
        <div>
          <div className='VisitRegistrationFormContainer'>
            <Form.Item className='VisitRegistrationFormItem' name='visitingClient' rules={[{ required: true, message: 'Būtina pasirinkti įmonę' }]} >
              <Select
                showSearch
                placeholder='Pasirinkite įmonę'
                onSelect={selectCompany}
                allowClear
                options={companyNames}
              >
              </Select>
            </Form.Item>
            {isCompanySelected &&
          <VisitRegistrationFormItem
            formItemName={'visitAddress'}
            placeholder={'Pasirinkite Adresą'}
            slectOptions={addresses}
            onSelect={selectAddress}
            fieldValue={'visitingClient'}
            updateValue={(prevValues, currentValues) => prevValues.visitingClient !== currentValues.visitingClient}
            validationMessage={'Butina pasirinkti adresą'}
          />
            }
            {isCompanySelected && addressId === 'T72' &&
          <Form.Item name='scheduledVisitTime' style={{width: '100%'}} rules={[{ required: true, message: 'Iveskite atvykimo datą' }]}>
            <DatePicker placeholder={'Planuojama vizito data/laikas'} style={{width: '100%'}} showTime />
          </Form.Item>
            }
          </div>
          {clientsEmployees && clientsEmployees?.length > 0 &&
          <VisitorAdditionList
            clientsEmployees={clientsEmployees}
            setClientsEmployees={setClientsEmployees}
            searchEmployee={searchEmployee}
            searchEmployeeValue={searchEmployeeValue}
            addVisitor={addVisitor}
            removeVisitor={removeVisitor}
          />
          }
          {clientsEmployees && clientsEmployees?.length <= 0 && selectedVisitors && selectedVisitors.length <= 0 &&
          <Empty description='Darbuotojų nėra' image={Empty.PRESENTED_IMAGE_SIMPLE} />
          }
          {selectedVisitors && selectedVisitors?.length > 0 &&
          <VisitorsList clientsEmployees={clientsEmployees} removeVisitor={removeVisitor} setClientsEmployees={setClientsEmployees}/>
          }
          {selectedVisitors && selectedVisitors?.length > 0 && <VisitPurposeList/>}
          {selectedVisitors && selectedVisitors?.length > 0 && addressId &&
          <VisitRegistrationCollocationList
            companiesColocations={companiesColocations}
            setCheckedList={setCheckedList}
            checkedList={checkedList}
          />
          }
        </div>
        <ClientsGuestsItemList
          selectedVisitors={selectedVisitors.length}
          visitors={visitors}
          inputPlaceHolder={'Pridėti'}
          list={clientsGuests}
          setListItems={setClientsGuests}
          companyNameInput={<Input placeholder='Imonė'/>}
        />
        <CarPlatesItemList
          selectedVisitors={selectedVisitors.length}
          visitAddress={addressId}
          list={carPlates}
          setList={setCarPlates}
        />
        <div className='VisitRegistrationButtonContainer'>
          <Button htmlType='submit'>Registruoti</Button>
          <Button style={{marginLeft: '20px'}} onClick={resetForm}> Išvalyti</Button>
        </div>
        <SuccessMessage contextHolder={contextHolder} />
      </Form>
    </>
  )
}

export default VisitRegistrationForm