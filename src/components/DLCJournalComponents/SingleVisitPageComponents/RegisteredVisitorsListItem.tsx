/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                         from 'react'
import {
  Button,
  Form,
  List,
  Avatar,
  Modal,
  Select,
  Tag,
}                                    from 'antd'
import SignatureCanvas               from 'react-signature-canvas'
import { useCookies }                from 'react-cookie'
import { deleteItem, post }          from '../../../Plugins/helpers'
import { useParams }                 from 'react-router'
import useSetWindowsSize             from '../../../Plugins/useSetWindowsSize'
import { VisitorEmployee }           from '../../../types/globalTypes'
import { selectVisitorsPermissions } from '../../../auth/VisitorEmployeeReducer/selectors'
import {
  useAppDispatch,
  useAppSelector,
}                                    from '../../../store/hooks'
import { removeVisitor }             from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'

type RegisteredVisitorsListItemProps = {
  item: VisitorEmployee
}

const RegisteredVisitorsListItem = ({ item }: RegisteredVisitorsListItemProps) => {
  const {id}               = useParams()
  const [cookies]          = useCookies(['access_token'])
  const signatureCanvasRef = React.useRef<any>(null)
  const [open, setOpen]    = React.useState(false)
  const windowSize         = useSetWindowsSize()
  const editVisitors       = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const dispatch           = useAppDispatch()
  const visitorIdTypes     = useAppSelector((state) => state.visit.visitorIdTypes).map((el) => ({value: el._id, label: el.name}))

  const onOk = async() => {
    if(signatureCanvasRef.current){
      const signature = {
        signature: signatureCanvasRef.current.toDataURL(),
      }
      const res = await post(`addSignature?visitId=${id}&employeeId=${item._id}`,signature, cookies.access_token)
      if(!res.error){
        setOpen(false)
      }
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
      console.log(error)
    }
  }

  return (
    <List.Item
      className='VisitorsListItemContainer'
      actions={[
        <div key={item._id} className='SelectedVisitorsButtonContainer'>
          <div>
          </div>
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
        <Form.Item name={[item._id, 'signature']}>
          <SignatureCanvas canvasProps={{width: 500, height: 200 }} ref={signatureCanvasRef} />
        </Form.Item>
      </Modal>
    </List.Item>
  )
}

export default RegisteredVisitorsListItem


