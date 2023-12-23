/* eslint-disable max-len */
import React                    from 'react'
import { Button, Card, Input, List }    from 'antd'
import { EmployeesType }        from '../../../types/globalTypes'
import VisitorAdditionListItem  from './VisitorAdditionListItem'

type VisitorAdditionListProps = {
    clientsEmployees:     EmployeesType[] | undefined
    searchEmployee:       (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    searchEmployeeValue:  string | undefined
    addVisitor:           (id:number) => void
    removeVisitor:        (id:number) => void
    setOpenVisitorAddition?: React.Dispatch<React.SetStateAction<boolean>>
    setClientsEmployees?: React.Dispatch<React.SetStateAction<EmployeesType[] | undefined>>
}

const VisitorAdditionList = ({setClientsEmployees, clientsEmployees, searchEmployee, searchEmployeeValue, addVisitor, removeVisitor, setOpenVisitorAddition }: VisitorAdditionListProps) => {
  return (
    <Card title={
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>Įmonės Darbuotojai</div>
        {setOpenVisitorAddition && <Button type='link' onClick={() => setOpenVisitorAddition(false)}>Uždaryti</Button>}
      </div>
    } style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
      <Input placeholder='Ieškoti' onChange={searchEmployee}/>
      <List
        style={{overflow: 'auto', maxHeight: '450px'}}
        grid={{
          gutter: 16,
          xs:     1,
          sm:     2,
          md:     4,
          lg:     4,
          xl:     6,
          xxl:    3,
        }}
        dataSource={clientsEmployees}
        renderItem={(item) => ( !searchEmployeeValue || item.name.toLowerCase().includes(searchEmployeeValue)) &&
          <VisitorAdditionListItem
            item={item}
            addVisitor={addVisitor}
            removeVisitor={removeVisitor}
            photoFolder='../../ClientsEmployeesPhotos/'
            clientsEmployees={clientsEmployees}
            setClientsEmployees={setClientsEmployees} />
        }>
      </List>
    </Card>
  )
}

export default VisitorAdditionList