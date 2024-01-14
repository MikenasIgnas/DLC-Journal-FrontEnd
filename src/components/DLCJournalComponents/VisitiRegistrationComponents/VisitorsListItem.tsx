/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                from 'react'
import { Avatar, Button, Form, List, Tag }  from 'antd'
import { FormListFieldData }                from 'antd/es/form'
import { EmployeesType, VisitorsType }      from '../../../types/globalTypes'
import { DeleteOutlined }                   from '@ant-design/icons'
import useSetWindowsSize                    from '../../../Plugins/useSetWindowsSize'

type VisitorsListItemProps = {
  item:                 FormListFieldData
  setClientsEmployees?: React.Dispatch<React.SetStateAction<EmployeesType[] | undefined>>
  clientsEmployees?:    EmployeesType[] | undefined
  removeVisitor:        (id: number) => void
}

const VisitorsListItem = ({ item, setClientsEmployees, clientsEmployees, removeVisitor }: VisitorsListItemProps) => {
  const form                          = Form.useFormInstance()
  const visitors: VisitorsType[]      = form.getFieldValue('visitors')
  const visitorsItem: VisitorsType    = form.getFieldValue('visitors')[item.name]
  const windowSize                    = useSetWindowsSize()


  const deleteVisitor = async () => {
    const filter = visitors.filter(
      (el) => el.selectedVisitor.employeeId !== visitorsItem.selectedVisitor.employeeId
    )
    removeVisitor(Number(visitorsItem.selectedVisitor.employeeId))
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
      actions={[
        <div key={item.key} className='SelectedVisitorsButtons'>
          <Button icon={<DeleteOutlined style={{color: 'red'}}/>} onClick={deleteVisitor}>Pašalinti lankytoją</Button>
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
      <div>{visitorsItem.selectedVisitor.permissions.map((el: string, i: number) => <Tag key={i}>{el}</Tag>)}</div>
    </List.Item>
  )
}

export default VisitorsListItem