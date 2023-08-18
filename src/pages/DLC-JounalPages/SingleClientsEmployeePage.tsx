/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                from 'react'
import { useCookies } from 'react-cookie'
import { useSearchParams }  from 'react-router-dom'
import { get } from '../../Plugins/helpers'
import { Avatar, Button, Card, Checkbox, Divider } from 'antd'
import { EmployeesType } from '../../types/globalTypes'
import ClientsEmployeesDataDisplay from '../../components/ClientsEmployeesDisplay'



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
              <ClientsEmployeesDataDisplay label={'Darbuotojo įmonė: '} employeeData={companyName}/>
              <ClientsEmployeesDataDisplay label={'Email: '} employeeData={employee?.email}/>
            </div>
            <Divider />
            <div>
              <ClientsEmployeesDataDisplay label={'Mobilus Tel: '} employeeData={employee?.phoneNr}/>
              <ClientsEmployeesDataDisplay label={'Gimimo data: '} employeeData={employee?.birthday}/>
              <ClientsEmployeesDataDisplay label={'Pareigos: '} employeeData={employee?.occupation}/>
              <ClientsEmployeesDataDisplay label={'Pastabos: '} employeeData={employee?.notes}/>
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