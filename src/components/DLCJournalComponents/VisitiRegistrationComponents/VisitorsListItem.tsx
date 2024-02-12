/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Avatar, Button, List, Tag }  from 'antd'
import { Permissions, VisitorEmployee } from '../../../types/globalTypes'
import { DeleteOutlined }        from '@ant-design/icons'
import useSetWindowsSize         from '../../../Plugins/useSetWindowsSize'
import { removeVisitor }         from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'
import { useAppDispatch, useAppSelector }        from '../../../store/hooks'
import { deleteItem }       from '../../../Plugins/helpers'
import { useCookies }            from 'react-cookie'
import { selectVisitorsPermissions } from '../../../auth/VisitorEmployeeReducer/selectors'

type VisitorsListItemProps = {
  item:         VisitorEmployee
  permissions:  Permissions[]
}

const VisitorsListItem = ({ item }: VisitorsListItemProps) => {
  const windowSize  = useSetWindowsSize()
  const [cookies]   = useCookies(['access_token'])
  const dispatch    = useAppDispatch()

  const deleteVisitor = async () => {
    try{
      await deleteItem('visit/visitor', {id: item._id}, cookies.access_token)
      dispatch(removeVisitor(item._id))
    }catch (error){
      console.log(error)
    }
  }

  const permissions = useAppSelector((state) => selectVisitorsPermissions(state, item.employee._id))

  return (
    <List.Item
      key={item._id}
      actions={[
        <div key={item._id} className='SelectedVisitorsButtons'>
          <Button icon={<DeleteOutlined style={{color: 'red'}}/>} onClick={deleteVisitor}>Pašalinti lankytoją</Button>
        </div>,
      ]}
    >
      <List.Item.Meta
        className='VisitorsListItem'
        avatar={
          <Avatar
            shape='square' size={windowSize > 600 ? 90 : 40}
            src={item?.employee.photo ?
              item?.employee.photo :
              '../ClientsEmployeesPhotos/noUserImage.jpeg'
            }
          />}
        title={<p style={{fontSize: windowSize > 600 ? '15px' : '12px'}}>{item?.employee.name} {item?.employee.lastname}</p>}
        description={<p style={{fontSize: windowSize > 600 ? '12px' : '10px'}}>{item?.employee.occupation}</p>}
      />
      <div>{permissions.map((el) => <Tag key={el._id}>{el.name}</Tag>)}</div>
    </List.Item>
  )
}

export default VisitorsListItem