/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React                                              from 'react'
import { Avatar, Button, Form, List, Modal, Select, Tag, Image } from 'antd'
import { FormListFieldData }                              from 'antd/es/form'
import SignatureCanvas                                    from 'react-signature-canvas'
import { EmployeesType, VisitorsType }                    from '../../../types/globalTypes'
import { CheckOutlined, DeleteOutlined, EyeOutlined }     from '@ant-design/icons'
import {identificationOptions}                            from './StaticSelectOptions'

type VisitorsListItemProps = {
  item:                 FormListFieldData
  setClientsEmployees?: React.Dispatch<React.SetStateAction<EmployeesType[] | undefined>>
  clientsEmployees?:    EmployeesType[] | undefined
}

const VisitorsListItem = ({ item, setClientsEmployees, clientsEmployees }: VisitorsListItemProps) => {
  const [visible, setVisible]         = React.useState(false)
  const signatureCanvasRef            = React.useRef<any>(null)
  const form                          = Form.useFormInstance()
  const visitors: VisitorsType[]      = form.getFieldValue('visitors')
  const visitorsItem: VisitorsType    = form.getFieldValue('visitors')[item.name]

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
  const deleteVisitor = async () => {
    const filter = visitors.filter(
      (el) => el.selectedVisitor.employeeId !== visitorsItem.selectedVisitor.employeeId
    )

    form.setFieldsValue({
      visitors: filter,
    })


    if (setClientsEmployees && clientsEmployees) {
      setClientsEmployees([...clientsEmployees, visitorsItem.selectedVisitor])
    }
  }
  return (
    <List.Item
      key={item.key}
      className='VisitorsListItemContainer'
      actions={[
        <div style={{display: 'flex', alignItems: 'center', width: '500px', justifyContent: 'space-around'}}>
          <Form.Item noStyle name={[item.name, 'idType']}>
            <Select placeholder='Dokumento tipas' className='VisitorsListItemSelect' options={identificationOptions} />
          </Form.Item>
          <div style={{width: '500px'}}>
            {visitorsItem.signature ? (
              <div className='SignatureContainer'>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
                  <Image key={item.key} width={150} src={signatureCanvasRef.current.toDataURL()}/>
                  <DeleteOutlined className='DeleteIcon' onClick={deleteSignature}/>
                </div>
                <Button onClick={deleteVisitor}>Pašalinti darbuotoją</Button>
              </div>
            ) : (
              <div style={{display: 'flex', justifyContent: 'space-evenly',width: '300px' }}>
                <Button onClick={() => setVisible(true)}>Pasirašyti</Button>
                <Button onClick={deleteVisitor}>Pašalinti darbuotoją</Button>
              </div>
            )}
          </div>
        </div>,
      ]}
    >
      <List.Item.Meta
        className='VisitorsListItem'
        avatar={
          <Avatar
            shape='square' size={50}
            src={visitorsItem.selectedVisitor.employeePhoto ?
              `../ClientsEmployeesPhotos/${visitorsItem.selectedVisitor.employeePhoto}` :
              '../ClientsEmployeesPhotos/noUserImage.jpeg'}
          />}
        title={<div>{visitorsItem.selectedVisitor.name} {visitorsItem.selectedVisitor.lastName}</div>}
        description={<div>{visitorsItem.selectedVisitor.occupation}</div>}
      />
      <div className='DisplayFlex'>{visitorsItem.selectedVisitor.permissions.map((el: string, i: number) => <div key={i}><Tag key={i}>{el}</Tag></div>)}</div>
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
  )
}

export default VisitorsListItem