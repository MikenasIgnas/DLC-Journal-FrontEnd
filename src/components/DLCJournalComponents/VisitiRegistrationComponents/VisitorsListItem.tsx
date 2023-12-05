/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React                                          from 'react'
import { Avatar, Button, Form, List, Modal, Select }  from 'antd'
import { FormInstance, FormListFieldData }            from 'antd/es/form'
import SignatureCanvas                                from 'react-signature-canvas'
import { EmployeesType }                              from '../../../types/globalTypes'
import { CheckOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'

type VisitorsListItemProps = {
  item:   FormListFieldData
  remove: (index: number | number[]) => void
  form:   FormInstance<any>
}

type VisitorsType = {
  idType:          string;
  signature:       string;
  selectedVisitor: EmployeesType
}

const VisitorsListItem = ({ item, remove, form }: VisitorsListItemProps) => {
  const [visible, setVisible]   = React.useState(false)
  const signatureCanvasRef      = React.useRef<any>(null)
  const vistors: VisitorsType[] = form.getFieldValue('visitors')
  const indetificationOptions   = [
    { value: 'Pasas', label: 'Pasas' },
    { value: 'Tapatybės Kortelė', label: 'Tapatybės Kortelė' },
    { value: 'Darbuotojo Pažymėjimas', label: 'Darbuotojo Pažymėjimas' },
  ]
  const oncancel = () => {
    if (visible && signatureCanvasRef.current) {
      const signatureDataUrl = signatureCanvasRef.current.toDataURL()
      if (signatureDataUrl) {
        const updatedVisitors = vistors.map((visitor, index) => {
          if (index === item.name) {
            return {
              ...visitor,
              signature: signatureDataUrl,
            }
          }
          return visitor
        })
        form.setFieldsValue({
          visitors: updatedVisitors,
        })
      }
      setVisible(false)
    }
  }
  const deleteSignature = () => {
    signatureCanvasRef.current.clear()
    const updatedVisitors = vistors.map((visitor, index) => {
      if (index === item.name) {
        return {
          ...visitor,
          signature: null,
        }
      }
      return visitor
    })
    form.setFieldsValue({
      visitors: updatedVisitors,
    })
  }

  return (
    <>
      <List.Item
        style={{flex: '0 0'}}
        actions={[
          <Form.Item noStyle name={[item.name, 'idType']}>
            <Select placeholder='Dokumento tipas' style={{ width: '200px' }} options={indetificationOptions} />
          </Form.Item>,
          <div>
            {form.getFieldValue('visitors')[item.name].signature ? (
              <div style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <CheckOutlined style={{ color: '#4de44d', fontSize: '17px' }} />
                <EyeOutlined style={{ fontSize: '17px' }} onClick={() => setVisible(true)} />
                <DeleteOutlined onClick={deleteSignature} style={{ color: 'red', fontSize: '17px' }} />
              </div>
            ) : (
              <Button onClick={() => setVisible(true)}>Pasirašyti</Button>
            )}
          </div>,
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
          onCancel={oncancel}
          footer={false}
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