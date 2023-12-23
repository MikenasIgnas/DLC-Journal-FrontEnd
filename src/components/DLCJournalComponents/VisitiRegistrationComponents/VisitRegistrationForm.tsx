/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                                                                   from 'react'
import { get }                                                                 from '../../../Plugins/helpers'
import { useCookies }                                                          from 'react-cookie'
import { Button, Empty, Form, FormInstance, Select }                           from 'antd'
import { useSearchParams }                                                     from 'react-router-dom'
import { CollocationType, CompaniesType, EmployeesType, UserType, VisitsType } from '../../../types/globalTypes'
import VisitRegistrationFormItem                                               from './VisitRegistrationSelect'
import VisitorsList                                                            from './VisitorsList'
import ItemList                                                                from './ItemList'
import VisitPurposeList                                                        from './VisitPurposeList'
import VisitorAdditionList                                                     from './VisitorAdditionList'
import filterPermisions                                                        from './filterPermisions'
import {addresses}                                                             from './StaticSelectOptions'
import { DatePicker }                                                          from 'antd'
import VisitRegistrationCollocationList                                        from './VisitRegistrationCollocationList'

type VisitRegistrationFormProps = {
  form:             FormInstance<VisitsType>
  setClientsGuests: React.Dispatch<React.SetStateAction<string[]>>
  clientsGuests:    string[];
  setCarPlates:     React.Dispatch<React.SetStateAction<string[]>>
  carPlates:        string[]
  setCheckedList:   React.Dispatch<React.SetStateAction<CollocationType>>
  checkedList:      CollocationType
}

const VisitRegistrationForm = ({ setClientsGuests, clientsGuests, setCarPlates, carPlates, checkedList, setCheckedList }:VisitRegistrationFormProps) => {
  const [cookies]                                         = useCookies(['access_token'])
  const [dlcEmployees, setDlcEmployees]                   = React.useState<UserType[]>()
  const [allCompanies, setAllCompanies]                   = React.useState<CompaniesType[]>()
  const [searchParams, setSearchParams]                   = useSearchParams()
  const companyId                                         = searchParams.get('companyId')
  const addressId                                         = searchParams.get('addressId')
  const [selectedVisitors, setSelectedVisitors]           = React.useState<number[]>([])
  const [searchEmployeeValue, setSearchEmployeeValue]     = React.useState<string | undefined>()
  const [clientsEmployees, setClientsEmployees]           = React.useState<EmployeesType[]>()
  const [isCompanySelected, setIsCompanySelected]         = React.useState(false)
  const [companiesColocations, setCompaniesCollocations]  = React.useState<CollocationType[]>()
  const [guestsImput, setGuestsInput]                     = React.useState<string>('')
  const [carPlatesInput, setCarPlatesInput]               = React.useState<string>('')
  const form                                              = Form.useFormInstance<VisitsType>()
  const values                                            = Form.useWatch('visitors', form)
  const filteredPermisions                                = filterPermisions(values)
  const canBringCompany                                   = filteredPermisions.includes('Įleisti Trečius asmenis')

  React.useEffect(() => {
    (async () => {
      const companies     = await get('getCompanies', cookies.access_token)
      const dlcEmployees  = await get('getAllUsers', cookies.access_token)
      const singleCompany = await get(`getSingleCompany?companyId=${companyId}`, cookies.access_token)
      localStorage.removeItem('visitPurpose')
      if(addressId === 'J13'){
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.J13)
      }else{
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.T72)
      }
      setDlcEmployees(dlcEmployees.data)
      setAllCompanies(companies.data)
    })()
  }, [companyId, addressId, selectedVisitors])

  const companyNames = allCompanies?.map((el)=> {
    return { ...el, value: el.companyInfo.companyName, label: el.companyInfo.companyName}
  })
  const DLCEmployees = dlcEmployees?.map((el) => {
    return {...el, value: el.username, label: el.username}
  })

  const selectCompany = async(_: string, option: CompaniesType) => {
    setSearchParams(`companyId=${option.id}`)
    const companiesEmployees = await get(`getAllClientsEmployees?companyId=${option.id}`, cookies.access_token)
    setClientsEmployees(companiesEmployees.data)
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

  return (
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
        <>
          <VisitRegistrationFormItem
            formItemName={'visitAddress'}
            placeholder={'Pasirinkite Adresą'}
            slectOptions={addresses}
            onSelect={selectAddress}
            fieldValue={'visitingClient'}
            updateValue={(prevValues, currentValues) => prevValues.visitingClient !== currentValues.visitingClient}
            validationMessage={'Butina pasirinkti adresą'}
          />
          <VisitRegistrationFormItem
            formItemName={'dlcEmployees'}
            placeholder={'Pasirinkite Lydintį'}
            slectOptions={DLCEmployees}
            fieldValue={'visitAddress'}
            updateValue={(prevValues, currentValues) => prevValues.visitAddress !== currentValues.visitAddress}
            validationMessage={'Būtina pasirinkti lydintyjį'}
          />
        </>
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
          searchEmployee={searchEmployee}
          searchEmployeeValue={searchEmployeeValue}
          addVisitor={addVisitor}
          removeVisitor={removeVisitor}
        />
      }
      {clientsEmployees && clientsEmployees?.length <= 0 && <Empty description='Darbuotojų nėra' image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      {selectedVisitors && selectedVisitors?.length > 0 && <VisitorsList/>}
      {selectedVisitors && selectedVisitors?.length > 0 && addressId && <VisitPurposeList/>}
      {selectedVisitors && selectedVisitors?.length > 0 && addressId &&
      <VisitRegistrationCollocationList
        companiesColocations={companiesColocations}
        setCheckedList={setCheckedList}
        checkedList={checkedList}
      />
      }

      {selectedVisitors && selectedVisitors?.length > 0 && !canBringCompany && <div className='ErrorText'>Negali būti palydos</div>}
      {selectedVisitors && selectedVisitors?.length > 0 && canBringCompany &&
        <ItemList
          cardTitle={'Pridėti palydą'}
          inputValue={guestsImput}
          inputPlaceHolder={'Pridėti palydą'}
          setInputValue={setGuestsInput}
          list={clientsGuests}
          setListItems={setClientsGuests}
        />
      }
      {selectedVisitors && selectedVisitors?.length > 0 && addressId === 'T72' &&
        <ItemList
          cardTitle={'Pridėti automobilį'}
          inputValue={carPlatesInput}
          inputPlaceHolder={'Pridėti automobilį'}
          setInputValue={setCarPlatesInput}
          list={carPlates}
          setListItems={setCarPlates}
        />
      }
      <div className='VisitRegistrationButtonContainer'>
        <Button htmlType='submit'>Registruoti</Button>
        <Button style={{marginLeft: '20px'}} onClick={resetForm}> Išvalyti</Button>
      </div>
    </div>
  )
}

export default VisitRegistrationForm