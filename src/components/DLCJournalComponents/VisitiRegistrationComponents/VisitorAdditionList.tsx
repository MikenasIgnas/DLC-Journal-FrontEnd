/* eslint-disable max-len */
import React                          from 'react'
import { Button, Card, Input, List }  from 'antd'
import { EmployeesType }              from '../../../types/globalTypes'
import VisitorAdditionListItem        from './VisitorAdditionListItem'
import { ActionCreatorWithPayload }   from '@reduxjs/toolkit'
import { useAppDispatch }             from '../../../store/hooks'

type VisitorAdditionListProps = {
  companyEmployees:         EmployeesType[]
    searchEmployee:           (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    searchEmployeeValue:      string | undefined
    addVisitor:               (item: string | undefined) => void
    removeVisitor:            (id: string | undefined) => void
    setOpenVisitorAddition?:  ActionCreatorWithPayload<boolean>
    setCompanyEmployees:     React.Dispatch<React.SetStateAction<EmployeesType[]>>
}

const VisitorAdditionList = ({setCompanyEmployees, companyEmployees, searchEmployee, searchEmployeeValue, addVisitor, removeVisitor, setOpenVisitorAddition }: VisitorAdditionListProps) => {
  const dispatch          = useAppDispatch()
  return (
    <>
      {companyEmployees && companyEmployees?.length > 0 &&
      <Card title={
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>Įmonės Darbuotojai</div>
          {setOpenVisitorAddition && <Button type='link' onClick={() => dispatch(setOpenVisitorAddition(false))}>Uždaryti</Button>}
        </div>
      } style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
        <Input placeholder='Ieškoti' onChange={searchEmployee}/>
        <List
          style={{overflow: 'auto', maxHeight: '450px'}}
          grid={{
            gutter: 16,
            xs:     1,
            sm:     1,
            md:     2,
            lg:     2,
            xl:     2,
            xxl:    4,
          }}
          dataSource={companyEmployees}
          renderItem={(item) => (!searchEmployeeValue || `${item.name} ${item.lastname}`.toLowerCase().includes(searchEmployeeValue.toLocaleLowerCase())) &&
          <VisitorAdditionListItem
            searchEmployeeValue={searchEmployeeValue}
            item={item}
            addVisitor={addVisitor}
            removeVisitor={removeVisitor}
            photoFolder='../../ClientsEmployeesPhotos/'
            clientsEmployees={companyEmployees}
            setCompanyEmployees={setCompanyEmployees} />
          }>
        </List>
      </Card>
      }
    </>
  )
}

export default VisitorAdditionList