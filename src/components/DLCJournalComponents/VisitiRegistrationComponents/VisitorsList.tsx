/* eslint-disable max-len */
import React                    from 'react'
import { Card, Form, List }     from 'antd'
import VisitorsListItem         from './VisitorsListItem'
import { EmployeesType }        from '../../../types/globalTypes'

type VisitorsListProps = {
  setClientsEmployees?: React.Dispatch<React.SetStateAction<EmployeesType[] | undefined>>
  clientsEmployees?:    EmployeesType[] | undefined
  removeVisitor:        (id: number) => void
}

const VisitorsList = ({setClientsEmployees, clientsEmployees, removeVisitor}: VisitorsListProps) => {
  return (
    <Card title='Lankytojai' style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
      <Form.List name='visitors'>
        {(fields) => (
          <List
            dataSource={fields}
            renderItem={(item) => <VisitorsListItem removeVisitor={removeVisitor} clientsEmployees={clientsEmployees} setClientsEmployees={setClientsEmployees} key={item.key} item={item}/>}
          />
        )}
      </Form.List>
    </Card>
  )
}

export default VisitorsList