/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                                      from 'react'
import { get }                                    from '../../../Plugins/helpers'
import { useCookies }                             from 'react-cookie'
import { Button, Form, FormInstance, Select }     from 'antd'
import { useSearchParams }                        from 'react-router-dom'
import { CompaniesType, EmployeesType, UserType } from '../../../types/globalTypes'
import VisitRegistrationFormItem                  from './VisitRegistrationSelect'
import { PlusCircleOutlined }                     from '@ant-design/icons'
import VisitorsList                               from './VisitorsList'
import CollocationsList                           from './CollocationsList'
import ItemList                                   from './ItemList'
import VisitorAdditionModal                       from './VisitorAdditionModal'
import VisitPurposeList                           from './VisitPurposeList'

type VisitRegistrationFormProps = {
  form: FormInstance<any>
  setClientsGuests: React.Dispatch<React.SetStateAction<string[]>>
  clientsGuests: string[];
  setCarPlates: React.Dispatch<React.SetStateAction<string[]>>
  carPlates: string[]
}

type CollocationsType = {
  [key: string]: string[];
}

const VisitRegistrationForm = ({form, setClientsGuests, clientsGuests, setCarPlates, carPlates}:VisitRegistrationFormProps) => {
  const [cookies]                                         = useCookies(['access_token'])
  const [dlcEmployees, setDlcEmployees]                   = React.useState<UserType[]>()
  const [allCompanies, setAllCompanies]                   = React.useState<CompaniesType[]>()
  const [searchParams, setSearchParams]                   = useSearchParams()
  const companyId                                         = searchParams.get('companyId')
  const addressId                                         = searchParams.get('addressId')
  const employeeId                                        = searchParams.get('employeeId')
  const [open, setOpen]                                   = React.useState(false)
  const [selectedVisitors, setSelectedVisitors]           = React.useState<EmployeesType[]>()
  const [searchEmployeeValue, setSearchEmployeeValue]     = React.useState<string | undefined>()
  const [clientsEmployees, setClientsEmployees]           = React.useState<EmployeesType[]>()
  const [isCompanySelected, setIsCompanySelected]         = React.useState(false)
  const [companiesColocations, setCompaniesCollocations]  = React.useState<CollocationsType[]>()
  const [guestsImput, setGuestsInput]                     = React.useState<string>('')
  const [carPlatesInput, setCarPlatesInput]               = React.useState<string>('')

  React.useEffect(() => {
    (async () => {
      const companies =     await get('getCompanies', cookies.access_token)
      const dlcEmployees =  await get('getAllUsers', cookies.access_token)
      const singleCompany = await get(`SingleCompanyPage/${companyId}`, cookies.access_token)
      if(addressId === 'J13'){
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.J13)
      }else{
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.T72)
      }
      setDlcEmployees(dlcEmployees.data)
      setAllCompanies(companies.data)
    })()
  }, [companyId, employeeId, selectedVisitors])

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

  const selectCompany = async(_: string, option: any) => {
    setSearchParams(`companyId=${option.id}`, { replace: true })
    const companiesEmployees = await get(`getAllClientsEmployees?companyId=${option.id}`, cookies.access_token)
    setClientsEmployees(companiesEmployees.data)
    setIsCompanySelected(true)
  }

  const selectAddress = (addressId: string) => {
    const companyId =   searchParams.get('companyId')
    const employeeId =  searchParams.get('employeeId')
    setSearchParams(`companyId=${companyId}&employeeId=${employeeId}&addressId=${addressId}`)
  }
  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchEmployeeValue(e.target.value.toLowerCase())
  }

  const permissions = selectedVisitors?.flatMap((el) => el.permissions) || []
  const uniquePermissions = permissions.filter((permission, index, arr) => {
    return arr.indexOf(permission) === index
  })

  const canBiringCompany = uniquePermissions.includes('Įleisti Trečius asmenis')

  return (
    <div>
      <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Form.Item style={{width: '100%'}} name='visitingClient' rules={[{ required: true, message: 'Būtina pasirinkti įmonę' }]} >
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
      <Button icon={<PlusCircleOutlined />} onClick={() => setOpen(true)}>Pridėti Lankytoją</Button>
      {selectedVisitors && selectedVisitors?.length > 0 && <VisitorsList form={form}/>}
      {uniquePermissions.length > 0 && <VisitPurposeList uniquePermissions={uniquePermissions}/>}
      {selectedVisitors && selectedVisitors?.length > 0 && <CollocationsList companiesColocations={companiesColocations && companiesColocations}/>}
      {selectedVisitors && selectedVisitors?.length > 0 && !canBiringCompany && <div style={{color: 'red'}}>Negali būti palydos</div>}
      {selectedVisitors && selectedVisitors?.length > 0 && canBiringCompany &&
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
      <VisitorAdditionModal
        open={open}
        clientsEmployees={clientsEmployees}
        form={form}
        setOpen={setOpen}
        searchEmployee={searchEmployee}
        setSelectedVisitors={setSelectedVisitors}
        searchEmployeeValue={searchEmployeeValue}
      />
    </div>
  )
}

export default VisitRegistrationForm