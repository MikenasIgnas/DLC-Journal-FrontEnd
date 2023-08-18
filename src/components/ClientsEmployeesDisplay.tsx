import react from 'react'
import { EmployeesType } from '../types/globalTypes'

type clientsEmployeesDataDisplayProps = {
    label:        string;
    employeeData: string | undefined;
}

const ClientsEmployeesDataDisplay = ({label, employeeData}: clientsEmployeesDataDisplayProps) => {
  return (
    <div style={{display: 'flex', width: '250px', justifyContent: 'space-between'}}>
      <div><strong>{label} </strong></div>
      <div>{employeeData}</div>
    </div>
  )
}

export default ClientsEmployeesDataDisplay