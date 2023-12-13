/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React                                              from 'react'
import { Avatar, Button, Form, List, Modal, Select, Tag } from 'antd'
import { FormListFieldData }                              from 'antd/es/form'
import SignatureCanvas                                    from 'react-signature-canvas'
import { VisitorsType }                                   from '../../../types/globalTypes'
import { CheckOutlined, DeleteOutlined, EyeOutlined }     from '@ant-design/icons'
import {identificationOptions}                            from './StaticSelectOptions'

type VisitorsListItemProps = {
  item:     FormListFieldData
}

const VisitorsListItem = ({ item }: VisitorsListItemProps) => {
  const [visible, setVisible]     = React.useState(false)
  const signatureCanvasRef        = React.useRef<any>(null)
  const form                      = Form.useFormInstance()
  const visitors: VisitorsType[]  = form.getFieldValue('visitors')

  const oncancel = () => {
    if (visible && signatureCanvasRef.current) {
      const signatureDataUrl = signatureCanvasRef.current.toDataURL()
      if (signatureDataUrl) {
        const updatedVisitors = visitors.map((visitor, index) => {
          if (index === item.name) {
            return {
              idType:          visitor.idType,
              selectedVisitor: visitor.selectedVisitor,
              signature:       signatureDataUrl,
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
    const updatedVisitors = visitors.map((visitor, index) => {
      if (index === item.name) {
        return {
          idType:          visitor.idType,
          selectedVisitor: visitor.selectedVisitor,
          signature:       undefined,
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
        key={item.key}
        className='VisitorsListItemContainer'
        actions={[
          <div style={{display: 'flex', alignItems: 'center', width: '400px', justifyContent: 'space-around'}}>
            <Form.Item noStyle name={[item.name, 'idType']}>
              <Select placeholder='Dokumento tipas' className='VisitorsListItemSelect' options={identificationOptions} />
            </Form.Item>,
            <div>
              {form.getFieldValue('visitors')[item.name].signature ? (
                <div className='SignatureContainer'>
                  <CheckOutlined className='CheckIcon'/>
                  <EyeOutlined className='PreviewIcon' onClick={() => setVisible(true)} />
                  <DeleteOutlined className='DeleteIcon' onClick={deleteSignature}/>
                </div>
              ) : (
                <Button onClick={() => setVisible(true)}>Pasirašyti</Button>
              )}
            </div>
          </div>,
        ]}
      >
        <List.Item.Meta
          className='VisitorsListItem'
          avatar={<Avatar src={''} />}
          title={<div>{form.getFieldValue('visitors')[item.name].selectedVisitor.name} {form.getFieldValue('visitors')[item.name].selectedVisitor.lastName}</div>}
          description={<div>{form.getFieldValue('visitors')[item.name].selectedVisitor.occupation}</div>}
        />
        <div>Leidimai: {form.getFieldValue('visitors')[item.name].selectedVisitor.permissions.map((el: string, i: number) => <div key={i}><Tag key={i}>{el}</Tag></div>)}</div>
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