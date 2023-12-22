/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React                                                      from 'react'
import { Button, Form, List, Select, Image, Avatar, Modal, Tag }  from 'antd'
import SignatureCanvas                                            from 'react-signature-canvas'
import { useCookies }                                             from 'react-cookie'
import { get, post }                                              from '../../../Plugins/helpers'
import { useParams }                                              from 'react-router'
import { identificationOptions }                                  from '../VisitiRegistrationComponents/StaticSelectOptions'

type RegisteredVisitorsListItemProps = {
  signature:              string | null | undefined
  edit:                   boolean;
  idType:                 string | null | undefined;
  employeeId:             number | undefined;
  name:                   string;
  lastName:               string;
  occupation:             string;
  permissions:            string[]
  deleteVisitor:          (employeeId: number | undefined) => void
  index:                  number
  employeePhoto:          string | undefined;
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
    <>
      <List.Item
        className='RegisteredVisitorsListItemContainer'
        actions={[
          <div style={{display: 'flex', width: '470px', alignItems: 'center', justifyContent: 'flex-end'}}>
            <div>
              {savedSignature && <Image width={150} src={savedSignature}/>}
              {!savedSignature ?
                <Button disabled={!edit} onClick={onModalOpen}>Pasirašyti</Button> :
                <Button style={{marginLeft: '15px'}} disabled={!edit} onClick={deleteSignature}>Ištrinti</Button>
              }
            </div>
            <Form.Item name={['visitors', index, 'idType']} className='RegisteredVisitorsSelect' initialValue={idType}>
              <Select disabled={!edit} options={identificationOptions}/>
            </Form.Item>
            <Button type='link' onClick={() => deleteVisitor(employeeId)}>Ištrinti</Button>,
          </div>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar shape='square' size={50} src={employeePhoto ? `../../ClientsEmployeesPhotos/${employeePhoto}` : '../../ClientsEmployeesPhotos/noUserImage.jpeg'} />}
          title={<p>{name} {lastName}</p>}
          description={occupation}
        />
        <div >{permissions?.map((el, i) => <Tag key={i}>{el}</Tag>)}</div>
      </List.Item>
      <Modal
        onOk={onOk}
        open={open}
        onCancel={onCancel}
      >
        <SignatureCanvas canvasProps={{width: 500, height: 200 }} ref={signatureCanvasRef} />
      </Modal>
    </>
  )
}

export default RegisteredVisitorsListItem