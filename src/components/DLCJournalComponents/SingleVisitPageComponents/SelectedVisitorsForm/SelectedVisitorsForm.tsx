/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                        from 'react'
import RegisteredVisitorsListItemCardTitle          from '../RegisteredVisitorsListItemCardTitle'
import RegisteredVisitorsListItem                   from '../RegisteredVisitorsListItem'
import { Button, Card, Form, List }                 from 'antd'
// import { useParams }                                from 'react-router'
import { useAppDispatch, useAppSelector }           from '../../../../store/hooks'
// import { deleteItem, get, put }                          from '../../../../Plugins/helpers'
import VisitorAdditionList                          from '../../VisitiRegistrationComponents/VisitorAdditionList'
// import { useCookies }                               from 'react-cookie'
import { setOpenVisitorAddition }  from '../../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'
import { selectVisitingCompanyEmplyees } from '../../../../auth/VisitorEmployeeReducer/selectors'
import VisitorsListItem from '../../VisitiRegistrationComponents/VisitorsListItem'



const SelectedVisitorsForm = () => {
  const [form]                                          = Form.useForm()
  // const {id}                                            = useParams()
  // const [cookies]                                       = useCookies(['access_token'])
  // const editVisitors                                    = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const dispatch                                        = useAppDispatch()
  // const visitData = useAppSelector((state) => state.visit.visit)


  // const addVisitor =  async(visitorId: string | undefined) => {
  //   if(visitorId){
  //     // setSelectedVisitors((prev) => prev.includes(visitorId) ? prev : [...prev, visitorId])
  //   }
  // }

  const visitingEmployees = useAppSelector(selectVisitingCompanyEmplyees)

  const saveChanges = async(_values: any) => {
    // dispatch(setEditVisitors(!editVisitors))
    // if(editVisitors){
    //   visitors.forEach(visitor => {
    //     if (values.visitors[visitor._id]) {
    //       visitor.visitorIdType = values.visitors[visitor._id].visitorIdType
    //     }
    //   })
    //   for(const visitor of visitors){
    //     const res = await get(`company/CompanyEmployee?id=${visitor.employeeId}&visitId=${id}`, cookies.access_token)
    //     const res2 = await get(`visit/visitor?employeeId=${res._id}&visitId=${id}`, cookies.access_token)
    //     console.log(res2)
    //     await put('visit/visitor', { id: res2?.[0]._id, visitId: id, visitorIdType: visitor.visitorIdType }, cookies.access_token)
    //   }
    // }
  }

  // const removeVisitor = (_visitorId: string | undefined) => {
  //   // setSelectedVisitors((prev) => prev.filter((el) => el !== visitorId))
  // }

  const deleteVisitor = async(_visitorId: string | undefined) => {
    // if (visitData) {
    //   const updatedVisitData = [...visitors]
    //   if (visitors) {
    //     visitors = updatedVisitData.filter(
    //       (el) => el._id !== visitorId
    //     )
    //     setVisitors(updatedVisitData)
    //     removeVisitor(visitorId)
    //     await deleteItem('visit/visitor', {id: visitorId, visitId: id} ,cookies.access_token)
    //   }
    // }
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
        <VisitorAdditionList setOpenVisitorAddition={setOpenVisitorAddition}/>
      }
      <Card
        title={<RegisteredVisitorsListItemCardTitle/>} style={{margin: '10px', backgroundColor: '#f9f9f9'}}
        extra={<Button onClick={() => dispatch(setOpenVisitorAddition(true))} type='link' >Pridėti Lankytoją</Button>}>
        <List
          dataSource={visitingEmployees}
          renderItem={(item) =>
            // <RegisteredVisitorsListItem item={item} deleteVisitor={deleteVisitor} />
            <VisitorsListItem item={item}/>
          }
        />
      </Card>
    </Form>
  )
}

export default SelectedVisitorsForm