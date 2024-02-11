/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                                                from 'react'
import {
  get,
  post,
}                                                           from '../../../Plugins/helpers'
import { useCookies }                                       from 'react-cookie'
import { Button, Empty, Form, Input, Select, message }      from 'antd'
import { CompaniesType, EmployeesType, VisitsType, Guest }  from '../../../types/globalTypes'
import VisitRegistrationFormItem                            from './VisitRegistrationSelect'
import VisitorsList                                         from './VisitorsList'
import VisitPurposeList                                     from './VisitPurposeList'
import VisitorAdditionList                                  from './VisitorAdditionList'
import { DatePicker }                                       from 'antd'
import VisitRegistrationCollocationList                     from './VisitRegistrationCollocationList'
import CarPlatesItemList                                    from './CarPlatesItemList'
import useSetVisitor                                        from '../../../Plugins/useSetVisitor'
import ClientsGuestsItemList                                from './ClientsGuestsItemList'
import { useNavigate }                                      from 'react-router'
import SuccessMessage                                       from '../../UniversalComponents/SuccessMessage'


const VisitRegistrationForm = () => {
  const [cookies]                                       = useCookies(['access_token'])
  const [searchEmployeeValue, setSearchEmployeeValue]   = React.useState<string | undefined>()
  const [companyEmployees, setCompanyEmployees]         = React.useState<EmployeesType[] | undefined>([])
  const [isCompanySelected, setIsCompanySelected]       = React.useState(false)
  const [form]                                          = Form.useForm()
  const visitors                                        = Form.useWatch('visitors', form)
  const navigate                                        = useNavigate()
  const [messageApi, contextHolder]                     = message.useMessage()
  const [clientsGuests, setClientsGuests]               = React.useState<Guest[]>([])
  const [carPlates, setCarPlates]                       = React.useState<string[]>([])
  const [checkedList, setCheckedList]                   = React.useState<string[]>([])
  const [companies, setCompanies]                       = React.useState<CompaniesType[]>([])
  const {
    companyNames,
    companyPremise,
    setSearchParams,
    setSelectedVisitors,
    searchParams,
    selectedVisitors,
    addressId,
    sites,
    permissions,
    companyRacks,
    visitStatus,
  } = useSetVisitor()
  const companyId         = searchParams.get('companyId')

  React.useEffect(() => {
    (async () => {
      try {
        const companiesRes  = await get('company/company', cookies.access_token)
        setCompanies(companiesRes)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])


  const addressesOptions  = sites.map((el) => ({value: el._id, label: el.name}))
  const address           = addressesOptions.filter((el) => el.value === addressId)
  const selectCompany = async(_: string, option: CompaniesType) => {
    setSearchParams(`companyId=${option._id}`)
    const companiesEmployees = await get(`company/CompanyEmployee?companyId=${option._id}`, cookies.access_token)
    setCompanyEmployees(companiesEmployees)
    setSelectedVisitors([])
    localStorage.removeItem('visitPurpose')
    form.setFieldValue('visitAddress', null)
    setIsCompanySelected(true)
  }


  const selectAddress = (_: string, data: {value: string, label: string}) => {
    const companyId = searchParams.get('companyId')
    setSearchParams(`companyId=${companyId}&addressId=${data.value}`)
    setCheckedList([])
  }
  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchEmployeeValue(e.target.value.toLowerCase())
  }

  const addVisitor = (id: string | undefined) => {
    if(id){
      setSelectedVisitors((prev) => prev?.includes(id) ? prev : [...prev, id])
    }
  }

  const removeVisitor = (id: string | undefined) => {
    setSelectedVisitors((prev) => prev?.filter((el) => el !== id))
  }

  const resetForm = () => {
    form.resetFields()
    setSelectedVisitors([])
    setCompanyEmployees([])
    setClientsGuests([])
    setCarPlates([])
    setIsCompanySelected(false)
    localStorage.removeItem('visitPurpose')
  }

  const registerVisit = async(values: VisitsType) => {
    const visitPurpose = localStorage.getItem('visitPurpose')
    const preparedStatus = visitStatus.filter((el) => el.name === 'Paruošti')
    if(visitPurpose){
      const selectedPermissions = JSON.parse(visitPurpose)
      values.companyId = companyId
      values.permissions = selectedPermissions
      values.racks = checkedList
      values.carPlates = carPlates
      values.guests = clientsGuests
      values.siteId = addressId
      values.visitPurpose = selectedPermissions
      values.statusId = preparedStatus?.[0]._id
      const myObject = values
      const { visitors, ...newObject } = myObject
      const res = await post('visit/visit', newObject, cookies.access_token)
      for( const item of visitors ) {
        await post('visit/visitor', {visitId: res._id, employeeId: item.selectedVisitor._id}, cookies.access_token)
      }
      if(!res.message){
        localStorage.clear()
        navigate(`/DLC Žurnalas/Vizitai/${res._id}?visitAddress=${values.siteId}`)
      }else{
        messageApi.error({
          type:    'error',
          content: res.message,
        })
      }
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
                formItemName={'siteId'}
                placeholder={'Pasirinkite Adresą'}
                slectOptions={addressesOptions}
                onSelect={selectAddress}
                fieldValue={'visitingClient'}
                updateValue={(prevValues, currentValues) => prevValues.visitingClient !== currentValues.visitingClient}
                validationMessage={'Butina pasirinkti adresą'}
              />
            }
            {isCompanySelected && address?.[0]?.label === 'T72' &&
          <Form.Item name='scheduledVisitTime' style={{width: '100%'}} rules={[{ required: true, message: 'Iveskite atvykimo datą' }]}>
            <DatePicker placeholder={'Planuojama vizito data/laikas'} style={{width: '100%'}} showTime />
          </Form.Item>
            }
          </div>
          {companyEmployees && companyEmployees?.length > 0 &&
          <VisitorAdditionList
            companyEmployees={companyEmployees}
            setCompanyEmployees={setCompanyEmployees}
            searchEmployee={searchEmployee}
            searchEmployeeValue={searchEmployeeValue}
            addVisitor={addVisitor}
            removeVisitor={removeVisitor}
          />
          }
          {companyEmployees && companyEmployees?.length <= 0 && selectedVisitors && selectedVisitors.length <= 0 &&
          <Empty description='Darbuotojų nėra' image={Empty.PRESENTED_IMAGE_SIMPLE} />
          }
          {selectedVisitors && selectedVisitors?.length > 0 &&
          <VisitorsList
            companyEmployees={companyEmployees}
            removeVisitor={removeVisitor}
            setCompanyEmployees={setCompanyEmployees}
            permissions={permissions}
          />
          }
          {selectedVisitors && selectedVisitors?.length > 0 && <VisitPurposeList permissions={permissions}/>}
          {selectedVisitors && selectedVisitors?.length > 0 && addressId &&
          <VisitRegistrationCollocationList
            companies={companies}
            companyRacks={companyRacks}
            companyPremise={companyPremise}
            setCheckedList={setCheckedList}
            checkedList={checkedList} />
          }
        </div>
        <ClientsGuestsItemList
          selectedVisitors={selectedVisitors?.length}
          visitors={visitors}
          inputPlaceHolder={'Pridėti'}
          list={clientsGuests}
          setListItems={setClientsGuests}
          companyNameInput={<Input placeholder='Imonė'/>}
        />
        <CarPlatesItemList
          selectedVisitors={selectedVisitors?.length}
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