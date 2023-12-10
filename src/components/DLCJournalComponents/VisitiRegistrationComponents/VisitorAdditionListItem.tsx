/* eslint-disable max-len */
import React                                from 'react'
import { Avatar, Card, Form }               from 'antd'
import { EmployeesType, VisitsType }        from '../../../types/globalTypes'
import { useCookies }                       from 'react-cookie'
import { useParams }                        from 'react-router'
import Meta                                 from 'antd/es/card/Meta'
import { DeleteOutlined, UserAddOutlined }  from '@ant-design/icons'
import { post }                             from '../../../Plugins/helpers'

type VisitorAdditionListItemProps = {
    item:          EmployeesType
    addVisitor:    (id:number) => void
    removeVisitor: (id:number) => void
}

const VisitorAdditionListItem = ({item, addVisitor, removeVisitor}: VisitorAdditionListItemProps) => {
  const [cookies]                   = useCookies(['access_token'])
  const {id}                        = useParams()
  const form                        = Form.useFormInstance<VisitsType>()
  const visitor                     = Form.useWatch('visitors', form)
  const [isSelected, setIsSelected] = React.useState(false)

  const addVisitingClient = async() => {
    if(!isSelected){
      const updatedVisitors = [...(visitor || []), { idType: undefined, selectedVisitor: item }]
      addVisitor(Number(item.employeeId))
      form.setFieldsValue({
        visitors: updatedVisitors,
      })
      setIsSelected(true)
      if (id) {
        setIsSelected(false)
        await post(`updateVisitorList?visitId=${id}`, item, cookies.access_token)
      }
    }
  }

  const removeVisitingClient = () => {
    removeVisitor(Number(item.employeeId))
    const updatedVisitors = (visitor || []).filter(obj => obj.selectedVisitor.employeeId !== item.employeeId)
    form.setFieldsValue({
      visitors: updatedVisitors,
    })
    setIsSelected(false)
  }
  return (
    <Card
      style={{ margin: '10px', border: isSelected ? '2px solid blue' : 'none' }}
      actions={id ? [ <UserAddOutlined onClick={addVisitingClient} key='add' />] : [
        <UserAddOutlined onClick={addVisitingClient} key='add' />,
        <DeleteOutlined onClick={removeVisitingClient} key='remove'/>,
      ]}
    >
      <Meta
        avatar={<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=2' />}
        title={`${item.name} ${item.lastName}`}
        description={item.occupation}
      />
    </Card>
  )
}

export default VisitorAdditionListItem