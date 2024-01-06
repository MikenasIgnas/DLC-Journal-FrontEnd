/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React                                                      from 'react'
import { Button, Form, List, Select, Image, Avatar, Modal, Tag }  from 'antd'
import SignatureCanvas                                            from 'react-signature-canvas'
import { useCookies }                                             from 'react-cookie'
import { get, post }                                              from '../../../Plugins/helpers'
import { useParams }                                              from 'react-router'
import { identificationOptions }                                  from '../VisitiRegistrationComponents/StaticSelectOptions'
import useSetWindowsSize from '../../../Plugins/useSetWindowsSize'
import { DeleteOutlined } from '@ant-design/icons'

type RegisteredVisitorsListItemProps = {
  signature:     string | null | undefined
  edit:          boolean;
  idType:        string | null | undefined;
  employeeId:    number | undefined;
  name:          string;
  lastName:      string;
  occupation:    string;
  permissions:   string[]
  deleteVisitor: (employeeId: number | undefined) => void
  index:         number
  employeePhoto: string | undefined;
}

const RegisteredVisitorsListItem = ({
  signature,
  edit,
  idType,
  employeeId,
  name,
  lastName,
  occupation,
  permissions,
  deleteVisitor,
  index,
  employeePhoto,
}: RegisteredVisitorsListItemProps) => {
  const {id}                                = useParams()
  const [cookies]                           = useCookies(['access_token'])
  const signatureCanvasRef                  = React.useRef<any>(null)
  const [open, setOpen]                     = React.useState(false)
  const [savedSignature, setSavedSignature] = React.useState<string| undefined | null>(signature)
  const windowSize                          = useSetWindowsSize()
  const onOk = async() => {
    if(signatureCanvasRef.current){
      const signature = {
        signature: signatureCanvasRef.current.toDataURL(),
      }
      const res = await post(`addSignature?visitId=${id}&employeeId=${employeeId}`,signature, cookies.access_token)
      setSavedSignature(signatureCanvasRef.current.toDataURL())
      if(!res.error){
        setOpen(false)
      }
    }
  }

  const onModalOpen = () => {
    setOpen(true)
  }

  const onCancel = () => {
    if(signatureCanvasRef.current){
      signatureCanvasRef.current.clear()
    }
    setSavedSignature(null)
    setOpen(false)
  }

  const deleteSignature = async() => {
    await get(`deleteSignature?visitId=${id}&employeeId=${employeeId}`, cookies.access_token)
    if(signatureCanvasRef.current){
      signatureCanvasRef.current.clear()
    }
    setSavedSignature(null)
  }

  return (
    <List.Item
      className='VisitorsListItemContainer'
      actions={[
        <div className='SelectedVisitorsButtonContainer'>
          <div>
            {savedSignature && <Image width={150} src={savedSignature}/>}
            {!savedSignature ?
              <Button style={{ width: '140px'}} disabled={!edit} onClick={onModalOpen}>Pasirašyti</Button> :
              <DeleteOutlined style={{color: 'red'}} disabled={!edit} onClick={deleteSignature}/>
            }
          </div>
          <Form.Item name={['visitors', index, 'idType']} className='RegisteredVisitorsSelect' initialValue={idType}>
            <Select style={{width: '100%'}} disabled={!edit} options={identificationOptions}/>
          </Form.Item>
          <Button onClick={() => deleteVisitor(employeeId)}>Pašalinti lankytoją</Button>,
        </div>,
      ]}
    >
      <List.Item.Meta
        className='VisitorsListItem'
        avatar={
          <Avatar
            shape='square' size={windowSize > 600 ? 90 : 40}
            src={employeePhoto ? `../../ClientsEmployeesPhotos/${employeePhoto}` : '../../ClientsEmployeesPhotos/noUserImage.jpeg'}
          />}
        title={<p style={{fontSize: windowSize > 600 ? '15px' : '12px'}}>{name} {lastName}</p>}
        description={<p style={{fontSize: windowSize > 600 ? '12px' : '10px'}}>{occupation}</p>}
      />
      <div className='PermissionTags'>{permissions.map((el: string, i: number) => <div key={i}><Tag key={i}>{el}</Tag></div>)}</div>
      <Modal
        open={open}
        onCancel={onCancel}
        onOk={onOk}
      >
        <Form.Item name={[name, 'signature']}>
          <SignatureCanvas canvasProps={{width: 500, height: 200 }} ref={signatureCanvasRef} />
        </Form.Item>
      </Modal>
    </List.Item>
  )
}

export default RegisteredVisitorsListItem


