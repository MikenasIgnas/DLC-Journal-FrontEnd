/* eslint-disable max-len */
import React                    from 'react'
import { Card, Input, List }    from 'antd'
import { EmployeesType }        from '../../../types/globalTypes'
import VisitorAdditionListItem  from './VisitorAdditionListItem'

type VisitorAdditionListProps = {
    clientsEmployees:     EmployeesType[] | undefined
    searchEmployee:       (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    searchEmployeeValue:  string | undefined
    addVisitor:           (id:number) => void
    removeVisitor:        (id:number) => void
}

const VisitorAdditionList = ({clientsEmployees, searchEmployee, searchEmployeeValue, addVisitor, removeVisitor }: VisitorAdditionListProps) => {
  return (
    <Card title={'Įmonės Darbuotojai'} style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
      <Input placeholder='Ieškoti' onChange={searchEmployee}/>
      <List
        dataSource={clientsEmployees}
        grid={{
          gutter: 16,
          xs:     1,
          sm:     2,
          md:     4,
          lg:     4,
          xl:     6,
          xxl:    3,
        }}
        renderItem={(item) => ( !searchEmployeeValue || item.name.toLowerCase().includes(searchEmployeeValue)) &&
          <VisitorAdditionListItem
            item={item}
            addVisitor={addVisitor}
            removeVisitor={removeVisitor}
          />
        }>
      </List>
    </Card>
  )
}

export default VisitorAdditionList