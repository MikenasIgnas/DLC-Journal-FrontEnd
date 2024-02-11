/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                from 'react'
import { Avatar, Button, Form, List, Tag }  from 'antd'
import { FormListFieldData }                from 'antd/es/form'
import { EmployeesType, VisitorsType, Permissions }      from '../../../types/globalTypes'
import { DeleteOutlined }                   from '@ant-design/icons'
import useSetWindowsSize                    from '../../../Plugins/useSetWindowsSize'

type VisitorsListItemProps = {
  item:                 FormListFieldData
  setCompanyEmployees?: React.Dispatch<React.SetStateAction<EmployeesType[] | undefined>>
  companyEmployees?:    EmployeesType[] | undefined
  removeVisitor:        (id: string) => void
  permissions:          Permissions[]
}

const VisitorsListItem = ({ item, setCompanyEmployees, companyEmployees, removeVisitor, permissions }: VisitorsListItemProps) => {
  const form                          = Form.useFormInstance()
  const visitors: VisitorsType[]      = form.getFieldValue('visitors')
  const visitorsItem: VisitorsType    = form.getFieldValue('visitors')[item.name]
  const windowSize                    = useSetWindowsSize()
  const deleteVisitor = async () => {
    const filter = visitors.filter(
      (el) => el.selectedVisitor._id !== visitorsItem.selectedVisitor._id
    )
    removeVisitor(visitorsItem.selectedVisitor._id)
    form.setFieldsValue({
      visitors: filter,
    })

    if (setCompanyEmployees && companyEmployees) {
      setCompanyEmployees([...companyEmployees, visitorsItem.selectedVisitor])
    }
  }
  const matchingItems = permissions.filter(item => visitorsItem.selectedVisitor.permissions.includes(item._id))

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
            src={visitorsItem.selectedVisitor.photo ?
              visitorsItem.selectedVisitor.photo :
              '../ClientsEmployeesPhotos/noUserImage.jpeg'
            }
          />}
        title={<p style={{fontSize: windowSize > 600 ? '15px' : '12px'}}>{visitorsItem.selectedVisitor.name} {visitorsItem.selectedVisitor.lastname}</p>}
        description={<p style={{fontSize: windowSize > 600 ? '12px' : '10px'}}>{visitorsItem.selectedVisitor.occupation}</p>}
      />
      <div>{matchingItems.map((el) => <Tag key={el._id}>{el.name}</Tag>)}</div>
    </List.Item>
  )
}

export default VisitorsListItem