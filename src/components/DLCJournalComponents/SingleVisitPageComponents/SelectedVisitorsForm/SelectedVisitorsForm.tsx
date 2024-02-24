/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                from 'react'
import RegisteredVisitorsListItemCardTitle  from '../RegisteredVisitorsListItemCardTitle'
import RegisteredVisitorsListItem           from '../RegisteredVisitorsListItem'
import VisitorAdditionList                  from '../../VisitiRegistrationComponents/VisitorAdditionList'
import SuccessMessage                       from '../../../UniversalComponents/SuccessMessage'

import {
  Button,
  Card,
  Form,
  List,
  message,
}                                           from 'antd'

import {
  useAppDispatch,
  useAppSelector,
}                                           from '../../../../store/hooks'

import {
  setEditVisitors,
  setOpenVisitorAddition,
}                                           from '../../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'

import { selectVisitingCompanyEmplyees }    from '../../../../auth/VisitorEmployeeReducer/selectors'
import {  put }                             from '../../../../Plugins/helpers'
import { useSearchParams }                  from 'react-router-dom'
import { useCookies }                       from 'react-cookie'

type VisitorInfo = {
  visitorIdType: string;
  signatures: string;
};

type Visitors = {
  [visitorId: string]: VisitorInfo;
};

type VisitorsData = {
  visitors: Visitors;
};

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
  const isSecurity                  = useAppSelector((state) => state.auth.isSecurity)

  const saveChanges = async (values: VisitorsData) => {
    dispatch(setEditVisitors(!editVisitors))
    if (editVisitors) {
      try {
        for (const visitor of visitingEmployees) {
          if (values.visitors[visitor._id]) {
            visitor.visitorIdType = values.visitors[visitor._id].visitorIdType
            visitor.signatures = values.visitors[visitor._id].signatures
          }

          let signatureFile
          if (visitor.signatures) {
            const signatureDataURL = visitor.signatures
            if (signatureDataURL) {
              const resBlob = await fetch(signatureDataURL)
              const blob = await resBlob.blob()
              signatureFile = new File([blob], 'signature.png', { type: 'image/png' })
            }
          }

          const updateValues = {
            id:            visitor._id,
            visitId:       visitId,
            visitorIdType: visitor.visitorIdType,
          }

          await put('visit/visitor', updateValues, cookies.access_token, signatureFile)


          messageApi.success({
            type:    'success',
            content: 'Išsaugota',
          })
        }
      } catch (error) {
        if (error instanceof Error) {
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
        extra={!isSecurity && <Button onClick={() => dispatch(setOpenVisitorAddition(true))} type='link' >Pridėti Lankytoją</Button>}>
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