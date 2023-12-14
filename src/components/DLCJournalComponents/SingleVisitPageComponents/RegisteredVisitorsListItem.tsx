/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React                                                from 'react'
import { Button, Form, List, Select, Image, Avatar, Modal } from 'antd'
import SignatureCanvas                                      from 'react-signature-canvas'
import { useCookies }                                       from 'react-cookie'
import { get, post }                                        from '../../../Plugins/helpers'
import { useParams }                                        from 'react-router'
import { identificationOptions }                            from '../VisitiRegistrationComponents/StaticSelectOptions'

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

  const deleteSignature = async() => {
    await get(`deleteSignature?visitId=${id}&employeeId=${employeeId}`, cookies.access_token)
    setSavedSignature(null)
  }
  return (
    <>
      <List.Item
        actions={[
          <div>
            {savedSignature && <Image width={150} src={savedSignature}/>}
            {!savedSignature ? <Button onClick={onModalOpen}>Pasirašyti</Button> : <Button onClick={deleteSignature}>Ištrinti</Button>}
          </div>,
          <Form.Item name={['visitors', index, 'idType']} className='RegisteredVisitorsSelect' initialValue={idType}>
            <Select disabled={!edit} options={identificationOptions}/>
          </Form.Item>,
          <Button type='link' onClick={() => deleteVisitor(employeeId)}>Ištrinti</Button>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={''} />}
          title={<p>{name} {lastName}</p>}
          description={occupation}
        />
        <div className='RegisteredVisitorsPermissions'>{permissions?.map((el, i) => <div key={i}>{el}</div>)}</div>
      </List.Item>
      <Modal
        onOk={onOk}
        open={open}
      >
        <SignatureCanvas canvasProps={{width: 500, height: 200 }} ref={signatureCanvasRef} />
      </Modal>
    </>
  )
}

export default RegisteredVisitorsListItem