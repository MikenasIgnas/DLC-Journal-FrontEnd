/* eslint-disable react-hooks/exhaustive-deps */
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
import { VisitsType, Guest }                 from '../../../types/globalTypes'
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
import { useAppDispatch, useAppSelector }                   from '../../../store/hooks'
import { setCompanyEmployees, setVisit }                    from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'

const VisitRegistrationForm = () => {
  const [cookies]                                       = useCookies(['access_token'])
  const [searchEmployeeValue, setSearchEmployeeValue]   = React.useState<string | undefined>()
  const [form]                                          = Form.useForm()
  const visitors                                        = Form.useWatch('visitors', form)
  const navigate                                        = useNavigate()
  const [messageApi, contextHolder]                     = message.useMessage()
  const [clientsGuests, setClientsGuests]               = React.useState<Guest[] | undefined>([])
  const [carPlates, setCarPlates]                       = React.useState<string[] | undefined>([])
  const companyEmployees                                = useAppSelector((state) => state.visit.companyEmployees)
  const dispatch                                        = useAppDispatch()
  const {
    companyNames,
    setSearchParams,
    searchParams,
    addressId,
    sites,
    permissions,
    visitStatus,
  } = useSetVisitor()

  const companyId                                       = searchParams.get('companyId')
  const visitId                                         = searchParams.get('id')
  const checkedList                                     = useAppSelector((state) => state.racks.checkedList)
  const addressesOptions  = sites.map((el) => ({value: el._id, label: el.name}))
  const address           = addressesOptions.filter((el) => el.value === addressId)

  const selectCompany = async(value: string) => {
    setSearchParams(`companyId=${value}`)
    const companiesEmployees = await get(`company/CompanyEmployee?companyId=${value}`, cookies.access_token)
    dispatch(setCompanyEmployees(companiesEmployees))

    localStorage.removeItem('visitPurpose')
    form.setFieldValue('visitAddress', null)
  }


  const selectAddress = async(_: string, data: {value: string, label: string}) => {
    const companyId = searchParams.get('companyId')
    if(!visitId && data.value && companyId){
      const res = await post('visit/visit', { companyId: companyId, permissions: [], racks: [], visitPurpose: [], siteId: data.value, statusId: '123131313131' }, cookies.access_token)
      setSearchParams(`companyId=${companyId}&addressId=${data.value}&id=${res._id}`)
      dispatch(setVisit(res))
    }else{
      setSearchParams(`companyId=${companyId}&addressId=${data.value}&id=${visitId}`)
    }
  }

  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchEmployeeValue(e.target.value.toLowerCase())
  }

  const resetForm = () => {
    form.resetFields()
    setCompanyEmployees([])
    setClientsGuests([])
    setCarPlates([])
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
        navigate(`/DLC Žurnalas/Vizitai/${visitId}?visitAddress=${values.siteId}`)
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
      <Form form={form} onFinish={registerVisit} onKeyDown={onkeydown} initialValues={{visitingClient: companyId, siteId: addressId}}>
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
            {companyId &&
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
            {companyId && address?.[0]?.label === 'T72' &&
          <Form.Item name='scheduledVisitTime' style={{width: '100%'}} rules={[{ required: true, message: 'Iveskite atvykimo datą' }]}>
            <DatePicker placeholder={'Planuojama vizito data/laikas'} style={{width: '100%'}} showTime />
          </Form.Item>
            }
          </div>
          <VisitorAdditionList
            searchEmployee={searchEmployee}
            searchEmployeeValue={searchEmployeeValue}
          />
          {companyEmployees && companyEmployees?.length <= 0 && <Empty description='Darbuotojų nėra' image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          <VisitorsList permissions={permissions}/>
          <VisitPurposeList permissions={permissions}/>
          <VisitRegistrationCollocationList/>
        </div>
        <ClientsGuestsItemList
          visitors={visitors}
          inputPlaceHolder={'Pridėti'}
          list={clientsGuests}
          setListItems={setClientsGuests}
          companyNameInput={<Input placeholder='Imonė'/>}
        />
        <CarPlatesItemList
          visitAddress={addressId as string}
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