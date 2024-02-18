/* eslint-disable max-len */
import { DeleteOutlined, EditOutlined, SaveOutlined }   from '@ant-design/icons'
import { Input, List, message }                         from 'antd'
import React                                            from 'react'
import { useCookies }                                   from 'react-cookie'
import { put }                                          from '../../../Plugins/helpers'
import { Permissions }                                  from '../../../types/globalTypes'
import SuccessMessage from '../../UniversalComponents/SuccessMessage'

type PermissionsListItemProps = {
    item: Permissions
    deletePermission: (id: string) => void
    setPermissions: React.Dispatch<React.SetStateAction<Permissions[]>>
    permissions: Permissions[]
}

const PermissionsListItem = ({item, deletePermission}: PermissionsListItemProps) => {
  const [cookie]                    = useCookies(['access_token'])
  const [inputValue, setInputValue] = React.useState<string >()
  const [edit, setEdit]             = React.useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const saveChanges = async(id: string) => {
    try{

      const data = {
        id:   id,
        name: inputValue,
      }
      await put('company/permission', data, cookie.access_token)
      setEdit(false)
      messageApi.success({
        type:    'success',
        content: 'Išsaugota',
      })
    }catch(error){
      if (error instanceof Error) {
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  return (
    <List.Item>
      <List.Item.Meta
        title={!edit ? <div>{item.name}</div> : <Input onChange={(e) => setInputValue(e.target.value)}/>}
      />
      <div style={{display: 'flex', width: '50px', justifyContent: 'space-between', alignItems: 'center'}}>
        {!edit ? <EditOutlined onClick={() => setEdit(true)} style={{color: 'green'}} /> : <SaveOutlined onClick={() => saveChanges(item._id)}/>}
        <DeleteOutlined onClick={() => deletePermission(item._id)} style={{color: 'red'}}/>
      </div>
      <SuccessMessage contextHolder={contextHolder}/>
    </List.Item>
  )
}

export default PermissionsListItem