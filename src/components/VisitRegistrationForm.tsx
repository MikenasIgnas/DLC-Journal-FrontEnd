/* eslint-disable max-len */
import React                    from 'react'
import { get }                  from '../Plugins/helpers'
import { useCookies }           from 'react-cookie'
import { Button, Checkbox, Form, Select } from 'antd'
import { useForm }              from 'antd/es/form/Form'
import { CompaniesType }        from '../types/globalTypes'

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
  const [cookies] =                                 useCookies(['access_token'])
  const [allCompanies, setAllCompanies] =           React.useState<CompaniesType[]>()
  const [isCompanySelected, setIsCompanySelected] = React.useState(false)
  const [isSiteSelected, setIsSiteSelected] =       React.useState(false)
  const [sites, setCompaniesSites] =                React.useState<string[]>([])
  const [dlcEmployees, setDlcEmployees] =           React.useState<any>([])
  const [selectedCompany, setSelectedCompany] =     React.useState<any>()
  const [selectedSite, setSelectedSite] =           React.useState<any[]>([])
  const [form] =                                    useForm()

  React.useEffect(() => {
    (async () => {
      const companies = await get('getCompanies', cookies.access_token)
      const dlcEmployees = await get('getAllUsers', cookies.access_token)
      setDlcEmployees(dlcEmployees.data)
      setAllCompanies(companies.data)
    })()
  }, [])

  const companyNames = allCompanies?.map((el)=> {
    return { value: el.id, label: el.companyInfo.companyName, info: el.companyInfo}
  })
  const allSites = sites?.map((el, i)=> {
    return { value: i, label: el }
  })

  const dlcEmployeeNames = dlcEmployees.map((el:any) => {
    return {value: el.key,label: el.username}
  })

  const selectCompany = (value: any, companyData:any) => {
    const companiesSites = Object.keys(companyData.info).filter(key => key !== 'companyName' && key !== 'companyDescription')
    setSelectedCompany(companyData.info)
    setIsCompanySelected(true)
    setCompaniesSites(companiesSites)
  }
  const selectSite = (value: number) => {
    if(value === 0) {
      setSelectedSite(selectedCompany.J13)
      setIsSiteSelected(true)
    }else{
      setSelectedSite(selectedCompany.T72)
      setIsSiteSelected(true)
    }
  }
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
          <Form.Item
            rules={[
              {
                required: true,
                message:  'Please input your password!',
              },
            ]} name='company'>
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              placeholder = 'Pasirinkiti įmonę'
              style={{width: '300px'}}
              options={companyNames}
              onSelect ={selectCompany}
            >
            </Select>
          </Form.Item>
          { isCompanySelected ? <Form.Item
            rules={[
              {
                required: true,
                message:  'Please input your password!',
              },
            ]} name='site'>
            <Select
              placeholder = 'Pasirinkiti adresą'
              style={{width: '300px'}}
              options={allSites}
              onSelect={selectSite}
            >
            </Select>
          </Form.Item> : ''
          }
          <div>
            {selectedSite.map((entry, index) => (
              <div key={index}>
                {Object.keys(entry).map(key => (
                  <div key={key}>
                    <strong>{key}:</strong>
                    {entry[key].map((value: any, innerIndex: any) => (
                      <Checkbox.Group key={innerIndex} options={[value]}/>
                    ))}
                  </div>
                ))}
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message:  'Please input your password!',
                    },
                  ]} name='dlcEmployee'>
                  <Select
                    placeholder = 'Pasirinkiti lydintį asmenį'
                    style={{width: '300px'}}
                    options={dlcEmployeeNames}
                  >
                  </Select>
                </Form.Item>
              </div>
            ))
            }
          </div>
        </div>
      </div>
      <Button htmlType='submit'>Submit</Button>
    </Form>
  )
}

export default VisitRegistrationForm