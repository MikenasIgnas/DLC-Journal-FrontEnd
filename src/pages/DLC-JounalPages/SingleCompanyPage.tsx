/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                      from 'react'
import { get }                    from '../../Plugins/helpers'
import { useCookies }             from 'react-cookie'
import { useParams }              from 'react-router-dom'
import { Button, Card, Divider }  from 'antd'
import { CompaniesType }          from '../../types/globalTypes'
import EmployeesAdditionModal     from '../../components/EmployeeAdditionModal'
import ClientsEmployeeList        from './ClientsEmployeeList'
import ColocationView             from '../../components/ColocationView'

type EmployeesType = {
  _id:            string;
  companyId:      string;
  name:           string;
  lastName:       string;
  occupation:     string;
  employeeId:     string;
  permissions:    string[];
}

const SingleCompanyPage = () => {
  const [cookies] =                     useCookies(['access_token'])
  const {id} =                          useParams()
  const [company, setCompany] =         React.useState<CompaniesType>()
  const [employees, setEmployees] =     React.useState<EmployeesType[]>()
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany =     await get(`SingleCompanyPage/${id}`, cookies.access_token)
        const companyEmployees =  await get(`getSingleCompaniesEmployees/${id}`, cookies.access_token)
        setCompany(singleCompany.data)
        setEmployees(companyEmployees.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[isModalOpen])

  const J13 = company?.companyInfo.J13
  const T72 = company?.companyInfo.T72

  return (
    <Card headStyle={{textAlign: 'center'}} title={company?.companyInfo.companyName.toUpperCase()} bordered={false} style={{ width: '98%', marginTop: '10px' }}>
      <Button style={{display: 'flex', margin: 'auto'}} onClick={()=> setIsModalOpen(true)}>Pridėti darbuotoją</Button>
      {isModalOpen && <EmployeesAdditionModal setIsModalOpen={setIsModalOpen}/>}
      <Divider>Kolokacijos</Divider>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <ColocationView locationName={'J13'} locationData={J13}/>
        <ColocationView locationName={'T72'} locationData={T72}/>
      </div>
      <ClientsEmployeeList list={employees}/>
    </Card>
  )
}

export default SingleCompanyPage