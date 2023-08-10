/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React          from 'react'
import { get }        from '../../Plugins/helpers'
import { useCookies } from 'react-cookie'
import { useParams }  from 'react-router-dom'
import { Button, Card, Divider }       from 'antd'
import { CompaniesType } from '../../types/globalTypes'
import EmployeesAdditionModal from '../../components/EmployeeAdditionModal'

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
        console.log(companyEmployees.data)
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
    <Card title={company?.companyInfo.companyName} bordered={false} style={{ width: 300 }}>
      <div>
        <Button onClick={()=> setIsModalOpen(true)}>Pridėti darbuotoją</Button>
        {isModalOpen && <EmployeesAdditionModal setIsModalOpen={setIsModalOpen}/>}
        {J13 && <Divider>J13</Divider>}
        {J13?.map((item, index) => (
          <div key={index}>
            {Object.entries(item).map(([key, values]) => (
              <div key={key}>
                <div>Key: {key}</div>
                {values.map((value, valueIndex) => (
                  <div key={valueIndex}>
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        {T72 && <Divider>T72</Divider>}
        {T72?.map((item, index) => (
          <div key={index}>
            {Object.entries(item).map(([key, values]) => (
              <div key={key}>
                <div>Key: {key}</div>
                {values.map((value, valueIndex) => (
                  <div key={valueIndex}>
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        <div>
          {employees?.map((ele) =>
            <div key={ele.employeeId}>
              <Divider></Divider>
              <div>Id: {ele.employeeId}</div>
              <div>Vardas: {ele.name}</div>
              <div>Pavardė: {ele.lastName}</div>
              <div>Pareigos: {ele.occupation}</div>
              <div>Leidimai: {ele.permissions.map((elem, i) => <div key={i}>{elem}</div>)}</div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default SingleCompanyPage