/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import { Avatar, Button, Form, List, Modal, Select } from 'antd'
import { FormInstance, FormListFieldData } from 'antd/es/form'
import React from 'react'
import SignatureCanvas from 'react-signature-canvas'

type VisitorsListItemProps = {
  item: FormListFieldData
  remove: (index: number | number[]) => void
  form: FormInstance<any>
}

const VisitorsListItem = ({ item, remove, form }: VisitorsListItemProps) => {
  const [visible, setVisible] = React.useState(false)
  const signatureCanvasRef =          React.useRef<any>(null)

  const indetificationOptions = [
    { value: 'Pasas', label: 'Pasas' },
    { value: 'Tapatybės Kortelė', label: 'Tapatybės Kortelė' },
    { value: 'Darbuotojo Pažymėjimas', label: 'Darbuotojo Pažymėjimas' },
  ]
  const onOk = () => {
    form.setFieldsValue({
      visitors: {signature: signatureCanvasRef?.current?.toDataURL()},
    })
    setVisible(false)
  }
  return (
    <>
      <List.Item
        style={{flex: '0 0'}}
        actions={[
          <Form.Item noStyle name={[item.name, 'idType']} >
            <Select placeholder='Dokumento tipas' style={{ width: '200px' }} options={indetificationOptions} />
          </Form.Item>,
          <Button onClick={() => setVisible(true)}>Pasirašyti</Button>,
          <Button onClick={() => remove(item.name)} type='link'>Ištrinti</Button>,
        ]}
      >
        <List.Item.Meta
          style={{flex: '0 0'}}
          avatar={<Avatar src={''} />}
          title={<div>{form.getFieldValue('visitors')[item.name].selectedVisitor.name} {form.getFieldValue('visitors')[item.name].selectedVisitor.lastName}</div>}
          description={<div>{form.getFieldValue('visitors')[item.name].selectedVisitor.occupation}</div>}
        />
        <div>{form.getFieldValue('visitors')[item.name].selectedVisitor.permissions}</div>
        <Modal
          open={visible}
          onOk={onOk}
          onCancel={() => setVisible(false)}
        >
          <Form.Item name={[item.name, 'signature']}>
            <SignatureCanvas canvasProps={{width: 500, height: 200 }} ref={signatureCanvasRef} />
          </Form.Item>
        </Modal>
      </List.Item>
    </>
  )
}

export default VisitorsListItem