/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                        from 'react'
import RegisteredVisitorsListItemCardTitle          from '../RegisteredVisitorsListItemCardTitle'
import RegisteredVisitorsListItem                   from '../RegisteredVisitorsListItem'
import { Button, Card, Form, List, message }        from 'antd'
import { useAppDispatch, useAppSelector }           from '../../../../store/hooks'
import VisitorAdditionList                          from '../../VisitiRegistrationComponents/VisitorAdditionList'
import { setEditVisitors, setOpenVisitorAddition }  from '../../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'
import { selectVisitingCompanyEmplyees }            from '../../../../auth/VisitorEmployeeReducer/selectors'
import {  put }                                     from '../../../../Plugins/helpers'
import { useSearchParams }                          from 'react-router-dom'
import { useCookies }                               from 'react-cookie'
import SuccessMessage from '../../../UniversalComponents/SuccessMessage'

const SelectedVisitorsForm = () => {
  const [form]                      = Form.useForm()
  const [cookies]                   = useCookies(['access_token'])
  const dispatch                    = useAppDispatch()
  const editVisitors                = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const [searchParams]              = useSearchParams()
  const visitingEmployees           = useAppSelector(selectVisitingCompanyEmplyees)
  const visitId                     = searchParams.get('id')
  const openVisitorAddition         = useAppSelector((state) => state.visitPageEdits.openVisitorAddition)
  const [messageApi, contextHolder] = message.useMessage()

  const saveChanges = async(values: any) => {
    dispatch(setEditVisitors(!editVisitors))
    if(editVisitors){
      try{

        visitingEmployees.forEach(visitor => {
          if (values.visitors[visitor._id]) {
            visitor.visitorIdType = values.visitors[visitor._id].visitorIdType
          }
        })
        for(const visitor of visitingEmployees){
          await put('visit/visitor', { id: visitor._id, visitId: visitId, visitorIdType: visitor.visitorIdType }, cookies.access_token)
        }
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }

      }
    }
  }

  const onkeydown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  return (
    <Form form={form} onFinish={saveChanges} onKeyDown={onkeydown}>
      {openVisitorAddition && <VisitorAdditionList setOpenVisitorAddition={setOpenVisitorAddition}/>}
      <Card
        title={<RegisteredVisitorsListItemCardTitle/>} style={{margin: '10px', backgroundColor: '#f9f9f9'}}
        extra={<Button onClick={() => dispatch(setOpenVisitorAddition(true))} type='link' >Pridėti Lankytoją</Button>}>
        <List
          dataSource={visitingEmployees}
          renderItem={(item) =>
            <RegisteredVisitorsListItem item={item}/>
          }
        />
      </Card>
      <SuccessMessage contextHolder={contextHolder}/>
    </Form>
  )
}

export default SelectedVisitorsForm