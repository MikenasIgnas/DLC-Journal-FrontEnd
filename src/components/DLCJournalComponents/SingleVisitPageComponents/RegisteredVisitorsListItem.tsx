/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                                      from 'react'
import { Button, Form, List, Avatar, Modal }         from 'antd'
import SignatureCanvas                                            from 'react-signature-canvas'
import { useCookies }                                             from 'react-cookie'
import { get, post }                                                   from '../../../Plugins/helpers'
import { useParams }                                              from 'react-router'
import useSetWindowsSize                                          from '../../../Plugins/useSetWindowsSize'
// import { useAppSelector }                                         from '../../../store/hooks'
import { EmployeesType, Visitors }  from '../../../types/globalTypes'

type RegisteredVisitorsListItemProps = {
  item:           Visitors
  deleteVisitor:  (employeeId: string | undefined, item: EmployeesType ) => Promise<void>
}

const RegisteredVisitorsListItem = ({ item, deleteVisitor }: RegisteredVisitorsListItemProps) => {
  const {id}                                    = useParams()
  const [cookies]                               = useCookies(['access_token'])
  const signatureCanvasRef                      = React.useRef<any>(null)
  const [open, setOpen]                         = React.useState(false)
  const windowSize                              = useSetWindowsSize()
  // const editVisitors            = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const [clientsEmployee, setClientsEmployee]   = React.useState<EmployeesType>()
  // const employeePermissions     = permissions.filter((el) => clientsEmployee?.permissions.includes(el._id))
  // const visitorsIdSelectOptions = visitorIdTypes.map((el) => ({value: el._id, label: el.name}))
  // const visitorsIdType          = visitorsIdSelectOptions.find((el) => el.value === item.visitorIdType)

  React.useEffect(() => {
    (async () => {
      try{
        const companyEmployeeRes = await get(`company/CompanyEmployee?id=${item.employeeId}`, cookies.access_token)
        setClientsEmployee(companyEmployeeRes)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

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
  return (
    <List.Item
      className='VisitorsListItemContainer'
      actions={[
        <div key={item._id} className='SelectedVisitorsButtonContainer'>
          <div>
          </div>
          {/* <Form.Item name={['visitors', item._id, 'visitorIdType']} className='RegisteredVisitorsSelect' initialValue={visitorsIdType?.label}>
            <Select style={{width: '100%'}} disabled={!editVisitors} options={visitorsIdSelectOptions}/>
          </Form.Item> */}
          <Button onClick={() => clientsEmployee && deleteVisitor(item?._id, clientsEmployee)}>Pašalinti lankytoją</Button>,
        </div>,
      ]}
    >
      <List.Item.Meta
        className='VisitorsListItem'
        avatar={
          <Avatar
            shape='square' size={windowSize > 600 ? 90 : 40}
            src={clientsEmployee?.photo ? clientsEmployee?.photo : '../../ClientsEmployeesPhotos/noUserImage.jpeg'}
          />}
        title={<p style={{fontSize: windowSize > 600 ? '15px' : '12px'}}>{clientsEmployee?.name} {clientsEmployee?.lastname}</p>}
        description={<p style={{fontSize: windowSize > 600 ? '12px' : '10px'}}>{clientsEmployee?.occupation}</p>}
      />
      {/* <div className='PermissionTags'>{employeePermissions.map((el, i: number) => <div key={i}><Tag key={i}>{el.name}</Tag></div>)}</div> */}
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


