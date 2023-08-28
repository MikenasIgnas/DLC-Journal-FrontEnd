/* eslint-disable max-len */
import { Form, Input } from 'antd'
import react from 'react'

type clientsEmployeesDataDisplayProps = {
    label:        string;
    employeeData: string | undefined;
    edit?:         boolean;
    formItemName: string;
}

const ClientsEmployeesDataDisplay = ({label, employeeData, edit, formItemName}: clientsEmployeesDataDisplayProps) => {
  return (
    <div style={{display: 'flex', width: edit ? '300px' : '250px', justifyContent: 'space-between', margin: '20px', height: '25px'}}>
      <div style={{width: '250px'}}><strong>{label}</strong></div>
      {!edit ? <div>{employeeData}</div> : <Form.Item name={formItemName} initialValue={employeeData} style={{width: '270px', padding: '0px'}} ><Input/></Form.Item> }
    </div>
  )
}

export default ClientsEmployeesDataDisplay