/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                                      from 'react'
import { Avatar, Button, Form, List, Modal, Select, Tag, Image }  from 'antd'
import { FormListFieldData }                                      from 'antd/es/form'
import SignatureCanvas                                            from 'react-signature-canvas'
import { EmployeesType, VisitorsType }                            from '../../../types/globalTypes'
import { DeleteOutlined }                                         from '@ant-design/icons'
import {identificationOptions}                                    from './StaticSelectOptions'
import useSetWindowsSize                                          from '../../../Plugins/useSetWindowsSize'

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
  const windowSize                    = useSetWindowsSize()

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
        <div className='SelectedVisitorsButtonContainer'>
          <Form.Item noStyle name={[item.name, 'idType']}>
            <Select style={{width: '100%'}} placeholder='Dokumento tipas' className='VisitorsListItemSelect' options={identificationOptions} />
          </Form.Item>
          <div>
            {visitorsItem.signature ? (
              <div className='SignatureContainer'>
                <div className='SignatureButtons'>
                  <Image key={item.key} width={150} src={signatureCanvasRef.current.toDataURL()}/>
                  <DeleteOutlined className='DeleteIcon' onClick={deleteSignature}/>
                </div>
                <Button onClick={deleteVisitor}>Pašalinti Lankytoją</Button>
              </div>
            ) : (
              <div className='SelectedVisitorsButtons'>
                <Button style={{ width: '155px'}} onClick={() => setVisible(true)}>Pasirašyti</Button>
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
            shape='square' size={windowSize > 600 ? 90 : 40}
            src={visitorsItem.selectedVisitor.employeePhoto ?
              `../ClientsEmployeesPhotos/${visitorsItem.selectedVisitor.employeePhoto}` :
              '../ClientsEmployeesPhotos/noUserImage.jpeg'
            }
          />}
        title={<p style={{fontSize: windowSize > 600 ? '15px' : '12px'}}>{visitorsItem.selectedVisitor.name} {visitorsItem.selectedVisitor.lastName}</p>}
        description={<p style={{fontSize: windowSize > 600 ? '12px' : '10px'}}>{visitorsItem.selectedVisitor.occupation}</p>}
      />
      <div className='PermissionTags'>{visitorsItem.selectedVisitor.permissions.map((el: string, i: number) => <div key={i}><Tag key={i}>{el}</Tag></div>)}</div>
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