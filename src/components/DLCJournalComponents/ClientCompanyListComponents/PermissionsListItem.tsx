/* eslint-disable max-len */
import { DeleteOutlined, EditOutlined, SaveOutlined }   from '@ant-design/icons'
import { Input, List }                                         from 'antd'
import React                                            from 'react'
import { useCookies }                                   from 'react-cookie'
import { put }                                          from '../../../Plugins/helpers'
import { Permissions }                                  from '../../../types/globalTypes'

type PermissionsListItemProps = {
    item: Permissions
    deletePermission: (id: string) => void
    setPermissions: React.Dispatch<React.SetStateAction<Permissions[]>>
    permissions: Permissions[]
}

const PermissionsListItem = ({item, deletePermission, permissions, setPermissions}: PermissionsListItemProps) => {
  const [cookie]                    = useCookies(['access_token'])
  const [inputValue, setInputValue] = React.useState<string >()
  const [edit, setEdit]             = React.useState(false)

  const saveChanges = async(id: string) => {
    const data = {
      id:   id,
      name: inputValue,
    }
    await put('company/permission', data, cookie.access_token)
    const updatedPermissions = permissions.map(perm =>
      perm._id === id ? { ...perm, name: inputValue } : perm
    )

    setPermissions(updatedPermissions)
    setEdit(false)
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
    </List.Item>
  )
}

export default PermissionsListItem