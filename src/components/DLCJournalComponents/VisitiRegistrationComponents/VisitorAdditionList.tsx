/* eslint-disable max-len */
import React                                from 'react'
import { Button, Card, Input, List }        from 'antd'
import VisitorAdditionListItem              from './VisitorAdditionListItem'
import { ActionCreatorWithPayload }         from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector }   from '../../../store/hooks'
import { selectNonVisitingCompanyEmplyees } from '../../../auth/VisitorEmployeeReducer/selectors'
import { useSearchParams }                  from 'react-router-dom'

type VisitorAdditionListProps = {
    setOpenVisitorAddition?:  ActionCreatorWithPayload<boolean>
}

const VisitorAdditionList = ({ setOpenVisitorAddition }: VisitorAdditionListProps) => {
  const [searchEmployeeValue, setSearchEmployeeValue] = React.useState<string | undefined>()
  const [searchParams]                                = useSearchParams()
  const dispatch                                      = useAppDispatch()
  const companyEmployees                              = useAppSelector(selectNonVisitingCompanyEmplyees)
  const siteId                                        = searchParams.get('siteId')

  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchEmployeeValue(e.target.value.toLowerCase())
  }

  return (
    <>
      {companyEmployees && companyEmployees?.length > 0 && siteId &&
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
            photoFolder='../../ClientsEmployeesPhotos/'
          />
          }>
        </List>
      </Card>
      }
    </>
  )
}

export default VisitorAdditionList