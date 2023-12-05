/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React                                                from 'react'
import { Button, Form, List, Select, Image, Avatar, Modal } from 'antd'
import SignatureCanvas                                      from 'react-signature-canvas'
import { useCookies } from 'react-cookie'
import { post } from '../../../Plugins/helpers'
import { useParams } from 'react-router'


type RegisteredVisitorsListItemProps = {
    signature:              string;
    edit:                   boolean;
    idType:                 string;
    identificationOptions:  {value:string, label:string}[];
    employeeId:             string | undefined;
    name:                   string;
    lastName:               string;
     occupation:            string;
     permissions:           string[]
     deleteVisitor:         (employeeId: string | undefined) => void
     index:                 number
}

const RegisteredVisitorsListItem = ({signature, edit, idType, identificationOptions, employeeId, name, lastName, occupation, permissions, deleteVisitor, index }: RegisteredVisitorsListItemProps) => {
  const {id}                = useParams()
  const [cookies]           = useCookies(['access_token'])
  const signatureCanvasRef  = React.useRef<any>(null)
  const [open, setOpen]     = React.useState(false)

  const oncancel = async() => {
    if(signatureCanvasRef.current){
      const signature = {
        signature: signatureCanvasRef.current.toDataURL(),
      }
      const res = await post(`addSignature?visitId=${id}&employeeId=${employeeId}`,signature, cookies.access_token)
      if(!res.error){
        setOpen(false)
      }
    }
  }

  return (
    <>
      <List.Item
        actions={[
          <div>
            <Image
              width={150}
              src={signature || (signatureCanvasRef?.current?.isEmpty() ? undefined : signatureCanvasRef?.current?.toDataURL())}
            />
            <Button onClick={() => setOpen(true)}>Pasirašyti</Button>
          </div>,
          <Form.Item name={['visitors', index, 'idType']} initialValue={idType}>
            <Select disabled={!edit} style={{width: '150px'}} options={identificationOptions}/>
          </Form.Item>,
          <Button type='link' onClick={() => deleteVisitor(employeeId)}>Ištrinti</Button>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={''} />}
          title={<p>{name} {lastName}</p>}
          description={occupation}
        />
        <div style={{width: '150px'}}>{permissions?.map((el, i) => <div key={i}>{el}</div>)}</div>
      </List.Item>
      <Modal
        footer={false}
        onCancel={oncancel}
        open={open}
      >
        <SignatureCanvas canvasProps={{width: 500, height: 200 }} ref={signatureCanvasRef} />
      </Modal>
    </>
  )
}

export default RegisteredVisitorsListItem