/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                from 'react'
import { useCookies } from 'react-cookie'
import { useSearchParams }  from 'react-router-dom'
import { get } from '../../Plugins/helpers'
import { Avatar, Button, Card, Checkbox, Divider } from 'antd'

type EmployeesType = {
    _id:            string;
    companyId:      string;
    name:           string;
    lastName:       string;
    occupation:     string;
    employeeId:     string;
    permissions:    string[];
    employeePhoto?:  string
}

const SingleClientsEmployeePage = () => {
  const [searchParams] =                useSearchParams()
  const companyId =                     searchParams.get('companyId')
  const employeeId =                    searchParams.get('employeeId')
  const [cookies] =                     useCookies(['access_token'])
  const [employee, setEmployee] =       React.useState<EmployeesType>()
  const [companyName, setCompanyName] = React.useState()
  const [edit, setEdit] =               React.useState(false)
  React.useEffect(() => {
    (async () => {
      const clientsEmployee = await get(`getClientsEmployee?companyId=${companyId}&employeeId=${employeeId}`, cookies.access_token)
      const employeesCompanyName = await get(`getClientsEmployeesCompanyName/${companyId}`, cookies.access_token)
      setEmployee(clientsEmployee.data)
      setCompanyName(employeesCompanyName.data)
    })()
  }, [])

  const options = ['Įnešti įrangą', 'Išnešti įrangą', 'Komutavimas', 'Konfiguracija', 'Įleisti trečius asmenis']

  return(
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Card style={{ width: 800, height: 500 }}>
        <Button onClick={() => setEdit(!edit)} style={{display: 'flex', marginLeft: 'auto'}} type='link'>{edit ? 'Edit' : 'Save' }</Button>
        <div style={{display: 'flex'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            <Avatar size={100} src={employee?.employeePhoto ? employee.employeePhoto : '../Images/UserLogo.png'}/>
            <div>{employee?.name} {employee?.lastName}</div>
          </div>
          <Divider type='vertical' style={{height: '150px'}} />
          <div style={{width: '100%'}}>
            <div>
              <div><strong>Email: </strong>{employee?.lastName}</div>
              <div><strong>Darbuotojo įmonė: </strong>{companyName}</div>
            </div>
            <Divider />
            <div>
              <div><strong>Mobilus Tel: </strong></div>
              <div><strong>Gimimo data: </strong></div>
              <div><strong>Pareigos: </strong>{employee?.occupation}</div>
            </div>
          </div>
        </div>
        <Divider/>
        <div>
          <strong>Leidimai: </strong>
          <Checkbox.Group disabled={edit} value={employee?.permissions} options={options} />
        </div>
      </Card>
    </div>
  )
}

export default SingleClientsEmployeePage