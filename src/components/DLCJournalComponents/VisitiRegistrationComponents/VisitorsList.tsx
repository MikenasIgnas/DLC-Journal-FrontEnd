/* eslint-disable max-len */
import React                            from 'react'
import { Card, Form, List }             from 'antd'
import VisitorsListItem                 from './VisitorsListItem'
import { EmployeesType, Permissions }   from '../../../types/globalTypes'

type VisitorsListProps = {
  setCompanyEmployees?: React.Dispatch<React.SetStateAction<EmployeesType[] | undefined>>
  companyEmployees?:    EmployeesType[] | undefined
  removeVisitor:        (id: string | undefined) => void
  permissions:          Permissions[]
}

const VisitorsList = ({setCompanyEmployees, companyEmployees, removeVisitor, permissions}: VisitorsListProps) => {
  return (
    <Card title='Lankytojai' style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
      <Form.List name='visitors'>
        {(fields) => (
          <List
            dataSource={fields}
            renderItem={(item) => <VisitorsListItem
              removeVisitor={removeVisitor}
              permissions={permissions}
              companyEmployees={companyEmployees}
              setCompanyEmployees={setCompanyEmployees}
              key={item.key}
              item={item}
            />}
          />
        )}
      </Form.List>
    </Card>
  )
}

export default VisitorsList