/* eslint-disable max-len */
import React                          from 'react'
import {
  Button,
  Form,
  List,
  Avatar,
  Modal,
  Select,
  Tag,
  message,
}                                       from 'antd'

import {
  VisitorEmployee,
  VisitsType,
}                                       from '../../../types/globalTypes'

import {
  useAppDispatch,
  useAppSelector,
}                                       from '../../../store/hooks'

import { useCookies }                   from 'react-cookie'
import { deleteItem }                   from '../../../Plugins/helpers'
import { selectVisitorsPermissions }    from '../../../auth/VisitorEmployeeReducer/selectors'
import { removeVisitor }                from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'

import SignatureCanvas                  from 'react-signature-canvas'
import useSetWindowsSize                from '../../../Plugins/useSetWindowsSize'
import SuccessMessage                   from '../../UniversalComponents/SuccessMessage'

import {
  CheckCircleOutlined,
  DeleteOutlined,
}                                       from '@ant-design/icons'

type RegisteredVisitorsListItemProps = {
  item: VisitorEmployee
}

const RegisteredVisitorsListItem = ({ item }: RegisteredVisitorsListItemProps) => {
  const [cookies]                     = useCookies(['access_token'])
  const signatureCanvasRef            = React.useRef<SignatureCanvas>(null)
  const [open, setOpen]               = React.useState(false)
  const windowSize                    = useSetWindowsSize()
  const editVisitors                  = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const dispatch                      = useAppDispatch()
  const visitorIdTypes                = useAppSelector((state) => state.visit.visitorIdTypes).map((el) => ({value: el._id, label: el.name}))
  const [messageApi, contextHolder]   = message.useMessage()
  const form                          = Form.useFormInstance<VisitsType>()
  const [signatureUrl, setSignatureURl] = React.useState('')

  const onOk = async() => {
    if(signatureCanvasRef.current){
      form.setFieldValue(['visitors', item._id, 'signatures'], signatureCanvasRef.current.toDataURL())

      setSignatureURl(signatureCanvasRef.current.toDataURL())
      setOpen(false)
    }
  }

  const onCancel = () => {
    if(signatureCanvasRef.current){
      signatureCanvasRef.current.clear()
    }
    setOpen(false)
  }

  const permissions = useAppSelector((state) => selectVisitorsPermissions(state, item.employee._id))

  const deleteVisitor = async () => {
    try{
      await deleteItem('visit/visitor', {id: item._id}, cookies.access_token)
      dispatch(removeVisitor(item._id))
    }catch (error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  const removeSignature = () => {
    if(signatureCanvasRef.current){
      signatureCanvasRef.current.clear()
      setSignatureURl('')
    }
  }
  return (
    <List.Item
      className='VisitorsListItemContainer'
      actions={[
        <div key={item._id} style={{width: !signatureCanvasRef.current ? '500px' : '450px'}} className='SelectedVisitorsButtonContainer'>
          <div>
          </div>
          {
            signatureUrl === '' ?
              <Button disabled={!editVisitors} onClick={() => setOpen(true)}>Pasirašyti</Button>
              :
              <>
                <Tag style={{cursor: 'pointer'}} icon={<CheckCircleOutlined />} color='success'>
                  Pasirašyta
                </Tag>
                <DeleteOutlined type='primary' onClick={() => removeSignature()}/>
              </>
          }
          <Form.Item name={['visitors', item._id, 'visitorIdType']} className='RegisteredVisitorsSelect' initialValue={item.visitorIdType}>
            <Select style={{width: '100%'}} disabled={!editVisitors} options={visitorIdTypes} />
          </Form.Item>
          <Button onClick={deleteVisitor}>Pašalinti lankytoją</Button>,
        </div>,
      ]}
    >
      <List.Item.Meta
        className='VisitorsListItem'
        avatar={
          <Avatar
            shape='square' size={windowSize > 600 ? 90 : 40}
            src={item?.employee.photo ? item?.employee.photo : '../../ClientsEmployeesPhotos/noUserImage.jpeg'}
          />}
        title={<p style={{fontSize: windowSize > 600 ? '15px' : '12px'}}>{item?.employee?.name} {item?.employee?.lastname}</p>}
        description={<p style={{fontSize: windowSize > 600 ? '12px' : '10px'}}>{item?.employee?.occupation}</p>}
      />
      <div className='PermissionTags'>{permissions.map((el, i: number) => <div key={i}><Tag key={i}>{el.name}</Tag></div>)}</div>
      <Modal
        open={open}
        onCancel={onCancel}
        onOk={onOk}
      >
        <Form.Item name={['visitors', item._id, 'signatures']}>
          <SignatureCanvas canvasProps={{width: 500, height: 200 }} ref={signatureCanvasRef} />
        </Form.Item>
      </Modal>
      <SuccessMessage contextHolder={contextHolder}/>
    </List.Item>
  )
}

export default RegisteredVisitorsListItem