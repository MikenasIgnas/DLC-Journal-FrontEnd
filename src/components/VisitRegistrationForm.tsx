/* eslint-disable max-len */
import React                    from 'react'
import { get }                  from '../Plugins/helpers'
import { useCookies }           from 'react-cookie'
import { Button, Form }         from 'antd'
import { useForm }              from 'antd/es/form/Form'
import VisitRegistrationSelect  from '../components/VisitRegistrationSelect'
import { CompaniesColocationType, CompaniesEmlployeesType, CompaniesPremisesType, CompaniesSitesType, CompaniesType, UserType }   from '../types/globalTypes'

type OptionsType = {
  value:      string;
  label:      string;
  companyId:  string;
}

type VisitValuesType = {
  company:      string;
  location:     string;
  premises:     string;
  colocation:   string;
  employee:     string,
  DLCEmployee:  string;
}

type VisitRegistrationFormPRops = {
    setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const VisitRegistrationForm = ({setCurrent}: VisitRegistrationFormPRops) => {
  const [cookies] =                                                   useCookies(['access_token'])
  const [allCompanies, setAllCompanies] =                             React.useState<CompaniesType[]>()
  const [allCompanySites, setAllCompanySites] =                       React.useState<CompaniesSitesType[]>()
  const [allCompanyPremises, setAllCompanyPremises] =                 React.useState<CompaniesPremisesType[]>()
  const [allColocations, setAllCompanyColocations] =                  React.useState<CompaniesColocationType[]>()
  const [allEmployees, setAllEmployees] =                             React.useState<CompaniesEmlployeesType[]>()
  const [allDlcEmployees, setAllDlcEmployees] =                       React.useState<UserType[]>()
  const [isCompanySelected, setIsCompanySelected] =                   React.useState(false)
  const [isCompanySiteSelected, setIsCompanySiteSelected] =           React.useState(false)
  const [isCompanyPremiseSelected, setIsCompanyPremiseSelected] =     React.useState(false)
  const [isCompanyColocationlected, setIsCompanyColocationSelected] = React.useState(false)
  const [isCompanyEmployeelected, setIsCompanyEmployeeSelected] =     React.useState(false)
  const [form] = useForm()

  const onChange = (value: string, options: OptionsType) => {
    const filter = allCompanySites?.filter((el)=> el.CompanyId === options.companyId)
    setAllCompanySites(filter)
    setIsCompanySelected(true)
  }

  const onCompanySiteChange = (value: string, options: OptionsType) => {
    const filter = allCompanyPremises?.filter((el)=> el.siteId === options.companyId)
    setAllCompanyPremises(filter)
    setIsCompanySiteSelected(true)
  }

  const onCompanyPremiseChange = (value: string, options: OptionsType) => {
    const filter = allColocations?.filter((el)=> el.PremiseId === options.companyId)
    setAllCompanyColocations(filter)
    setIsCompanyPremiseSelected(true)
  }

  const onCompanyColocationChange = (value: string, options: OptionsType) => {
    const filteredEmployees = allEmployees?.filter((el) => el.CompanyId === options.companyId)
    setAllEmployees(filteredEmployees)
    setIsCompanyColocationSelected(true)
  }

  const onCompanyEmployeeChange = () => {
    setIsCompanyEmployeeSelected(true)
  }

  React.useEffect(() => {
    (async () => {
      const companies =         await get('getCompanies', cookies.access_token)
      const companySites =      await get('getCompaniesSites', cookies.access_token)
      const companyPremises =   await get('getCompaniesPremises', cookies.access_token)
      const companyColocation = await get('getCompaniesColocation', cookies.access_token)
      const companyEmployees =  await get('getCompaniesEmployees', cookies.access_token)
      const allDlcEmployees =   await get('getAllUsers', cookies.access_token)
      setAllDlcEmployees(allDlcEmployees.data)
      setAllCompanies(companies.data)
      setAllCompanySites(companySites.data)
      setAllCompanyPremises(companyPremises.data)
      setAllCompanyColocations(companyColocation.data)
      setAllEmployees(companyEmployees.data)

    })()
  }, [])

  const companyNames = allCompanies?.map((el)=> {
    return {value: el.CompanyName, label: el.CompanyName, companyId: el.id}
  })

  const companySites = allCompanySites?.map((el)=> {
    return {value: el.AvailableSites, label: el.AvailableSites, companyId: el.id}
  })

  const companyPremises = allCompanyPremises?.map((el)=> {
    return {value: el.premiseName, label: el.premiseName, companyId: el.id}
  })

  const companyColocations = allColocations?.map((el)=> {
    return {value: el.RackNumber, label: el.RackNumber, companyId: el.CompanyId}
  })

  const companyEmployees = allEmployees?.map((el)=> {
    return {value: el.employee_name, label: el.employee_name, companyId: el.id}
  })

  const dlcEmployees = allDlcEmployees?.map((el) => {
    return {value: el.username, label: el.username}
  })

  const submitRegistration = (value: VisitValuesType) => {
    localStorage.setItem('visitDetails', JSON.stringify(value))
    setCurrent(1)
  }

  return (
    <Form form={form} onFinish={submitRegistration} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <div style={{
        width:          '100%',
        display:        'flex',
        justifyContent: 'center',
        alignItems:     'center',
      }}>
        <div>
          <VisitRegistrationSelect
            formItemName={'company'}
            placeholder={'Pasirinkiti įmonę'}
            onChange={onChange}
            slectOptions={companyNames}
          />
          {
            isCompanySelected ?
              <VisitRegistrationSelect
                formItemName={'location'}
                placeholder={'Pasirinkiti vietą'}
                onChange={onCompanySiteChange}
                slectOptions={companySites}
              />
              : null
          }
          {
            isCompanySiteSelected ?
              <VisitRegistrationSelect
                formItemName={'premises'}
                placeholder={'Pasirinkiti patalpas'}
                onChange={onCompanyPremiseChange}
                slectOptions={companyPremises}
              />
              : null
          }
          {
            isCompanyPremiseSelected ?
              <VisitRegistrationSelect
                formItemName={'colocation'}
                placeholder={'Pasirinkiti lokaciją'}
                onChange={onCompanyColocationChange}
                slectOptions={companyColocations}
              />
              : null
          }
          {
            isCompanyColocationlected ?
              <VisitRegistrationSelect
                formItemName={'employee'}
                placeholder={'Pasirinkiti darbuotoją'}
                onChange={onCompanyEmployeeChange}
                slectOptions={companyEmployees}
              />
              : null
          }
          {
            isCompanyEmployeelected ?
              <VisitRegistrationSelect
                formItemName={'DLCEmployee'}
                placeholder={'Pasirinkiti darbuotoją'}
                slectOptions={dlcEmployees}
              />
              : null
          }
        </div>
      </div>
      <Button htmlType='submit'>Submit</Button>
    </Form>
  )
}

export default VisitRegistrationForm