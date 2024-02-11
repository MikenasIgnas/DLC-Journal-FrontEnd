/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                        from 'react'
import RegisteredVisitorsListItemCardTitle          from '../RegisteredVisitorsListItemCardTitle'
import RegisteredVisitorsListItem                   from '../RegisteredVisitorsListItem'
import { Button, Card, Form, List }                 from 'antd'
import { useParams }                                from 'react-router'
import { useAppDispatch, useAppSelector }           from '../../../../store/hooks'
import { deleteItem, get, put }                          from '../../../../Plugins/helpers'
import VisitorAdditionList                          from '../../VisitiRegistrationComponents/VisitorAdditionList'
import { useCookies }                               from 'react-cookie'
import { EmployeesType, VisitsType, Permissions, VisitorsIdTypes, Visitors }   from '../../../../types/globalTypes'
import { setEditVisitors, setOpenVisitorAddition }  from '../../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'


type SelectedVisitorsFormProps = {
  visitData:            VisitsType | undefined
  companyEmployees:     EmployeesType[]
  setCompanyEmployees:  React.Dispatch<React.SetStateAction<EmployeesType[]>>
  permissions:          Permissions[]
  visitorIdTypes:       VisitorsIdTypes[]
  visitors: Visitors[]
  setVisitors: React.Dispatch<React.SetStateAction<Visitors[]>>
  setSelectedVisitors: React.Dispatch<React.SetStateAction<string[]>>
}

const SelectedVisitorsForm = ({ visitData, companyEmployees, visitors, setCompanyEmployees, permissions, visitorIdTypes, setVisitors, setSelectedVisitors }: SelectedVisitorsFormProps) => {
  const [form]                                          = Form.useForm()
  const {id}                                            = useParams()
  const [cookies]                                       = useCookies(['access_token'])
  const editVisitors                                    = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const dispatch                                        = useAppDispatch()
  const [searchEmployeeValue, setSearchEmployeeValue]   = React.useState<string | undefined>()

  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchEmployeeValue(e.target.value.toLowerCase())
  }

  const addVisitor =  async(visitorId: string | undefined) => {
    if(visitorId){
      setSelectedVisitors((prev) => prev.includes(visitorId) ? prev : [...prev, visitorId])
    }
  }



  const saveChanges = async(values: any) => {
    dispatch(setEditVisitors(!editVisitors))
    if(editVisitors){
      visitors.forEach(visitor => {
        if (values.visitors[visitor._id]) {
          visitor.visitorIdType = values.visitors[visitor._id].visitorIdType
        }
      })
      for(const visitor of visitors){
        const res = await get(`company/CompanyEmployee?id=${visitor.employeeId}&visitId=${id}`, cookies.access_token)
        const res2 = await get(`visit/visitor?employeeId=${res._id}&visitId=${id}`, cookies.access_token)
        console.log(res2)
        await put('visit/visitor', { id: res2?.[0]._id, visitId: id, visitorIdType: visitor.visitorIdType }, cookies.access_token)
      }
    }
  }

  const removeVisitor = (visitorId: string | undefined) => {
    setSelectedVisitors((prev) => prev.filter((el) => el !== visitorId))
  }

  const deleteVisitor = async(visitorId: string | undefined) => {
    if (visitData) {
      const updatedVisitData = [...visitors]
      if (visitors) {
        visitors = updatedVisitData.filter(
          (el) => el._id !== visitorId
        )
        setVisitors(updatedVisitData)
        removeVisitor(visitorId)
        await deleteItem('visit/visitor', {id: visitorId, visitId: id} ,cookies.access_token)
      }
    }
  }

  const onkeydown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  const openVisitorAddition = useAppSelector((state) => state.visitPageEdits.openVisitorAddition)
  return (
    <Form form={form} onFinish={saveChanges} onKeyDown={onkeydown}>
      { openVisitorAddition &&
        <VisitorAdditionList
          setOpenVisitorAddition={setOpenVisitorAddition}
          companyEmployees={companyEmployees}
          searchEmployee={searchEmployee}
          searchEmployeeValue={searchEmployeeValue}
          addVisitor={addVisitor}
          removeVisitor={removeVisitor} setCompanyEmployees={setCompanyEmployees} />
      }
      <Card
        title={<RegisteredVisitorsListItemCardTitle/>} style={{margin: '10px', backgroundColor: '#f9f9f9'}}
        extra={<Button onClick={() => dispatch(setOpenVisitorAddition(true))} type='link' >Pridėti Lankytoją</Button>}>
        <List
          dataSource={visitors}
          renderItem={(item) =>
            <RegisteredVisitorsListItem visitorIdTypes={visitorIdTypes} item={item} deleteVisitor={deleteVisitor} permissions={permissions}/>
          }
        />
      </Card>
    </Form>
  )
}

export default SelectedVisitorsForm