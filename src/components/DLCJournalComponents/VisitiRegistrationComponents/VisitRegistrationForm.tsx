/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                                                  from 'react'
import { get }                                                from '../../../Plugins/helpers'
import { useCookies }                                         from 'react-cookie'
import { Form, FormInstance, Select }                         from 'antd'
import { useSearchParams }                                    from 'react-router-dom'
import { CompaniesType, EmployeesType, UserType, VisitsType } from '../../../types/globalTypes'
import VisitRegistrationFormItem                              from './VisitRegistrationSelect'
import VisitorsList                                           from './VisitorsList'
import CollocationsList                                       from './CollocationsList'
import ItemList                                               from './ItemList'
import VisitPurposeList                                       from './VisitPurposeList'
import VisitorAdditionList                                    from './VisitorAdditionList'
import filterPermisions                                       from './filterPermisions'

type VisitRegistrationFormProps = {
  form:             FormInstance<VisitsType>
  setClientsGuests: React.Dispatch<React.SetStateAction<string[]>>
  clientsGuests:    string[];
  setCarPlates:     React.Dispatch<React.SetStateAction<string[]>>
  carPlates:        string[]
}

type CollocationsType = {
  [key: string]: string[];
}

const VisitRegistrationForm = ({setClientsGuests, clientsGuests, setCarPlates, carPlates}:VisitRegistrationFormProps) => {
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
  const [companiesColocations, setCompaniesCollocations]  = React.useState<CollocationsType[]>()
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
      const singleCompany = await get(`SingleCompanyPage/${companyId}`, cookies.access_token)
      if(addressId === 'J13'){
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.J13)
      }else{
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.T72)
      }
      setDlcEmployees(dlcEmployees.data)
      setAllCompanies(companies.data)
    })()
  }, [companyId, selectedVisitors, addressId])

  const companyNames = allCompanies?.map((el)=> {
    return { ...el, value: el.companyInfo.companyName, label: el.companyInfo.companyName}
  })

  const DLCEmployees = dlcEmployees?.map((el) => {
    return {...el, value: el.username, label: el.username}
  })

  const addresses = [
    {
      value: 'J13',
      label: 'J13',
    },
    {
      value: 'T72',
      label: 'T72',
    },
  ]

  const selectCompany = async(_: string, option: CompaniesType) => {
    setSearchParams(`companyId=${option.id}`)
    const companiesEmployees = await get(`getAllClientsEmployees?companyId=${option.id}`, cookies.access_token)
    setClientsEmployees(companiesEmployees.data)
    setIsCompanySelected(true)
  }

  const selectAddress = (addressId: string) => {
    const companyId = searchParams.get('companyId')
    setSearchParams(`companyId=${companyId}&addressId=${addressId}`)
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
      </div>
      {companyId && addressId &&
      <VisitorAdditionList
        clientsEmployees={clientsEmployees}
        searchEmployee={searchEmployee}
        searchEmployeeValue={searchEmployeeValue}
        addVisitor={addVisitor}
        removeVisitor={removeVisitor}
      />
      }
      {selectedVisitors && selectedVisitors?.length > 0 && <VisitorsList/>}
      {selectedVisitors && selectedVisitors?.length > 0 && <VisitPurposeList/>}
      {selectedVisitors && selectedVisitors?.length > 0 && <CollocationsList companiesColocations={companiesColocations}/>}
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
    </div>
  )
}

export default VisitRegistrationForm