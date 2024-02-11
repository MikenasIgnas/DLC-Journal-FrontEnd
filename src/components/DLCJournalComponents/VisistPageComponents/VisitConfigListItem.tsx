/* eslint-disable max-len */
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import { Input, List } from 'antd'
import React from 'react'
import { useCookies } from 'react-cookie'
import { deleteItem, put } from '../../../Plugins/helpers'

type ConfingItemsType = {
    name:   string | undefined;
    _id:    string;
}

type VisitConfigListItemProps = {
    item:           ConfingItemsType
    configItems:    ConfingItemsType[]
    setConfigItems: React.Dispatch<React.SetStateAction<ConfingItemsType[]>>
    url:      string;
}

const VisitConfigListItem = ({ item, configItems, setConfigItems, url }: VisitConfigListItemProps) => {
  const [cookies]                    = useCookies(['access_token'])
  const [inputValue, setInputValue] = React.useState<string >()
  const [edit, setEdit]             = React.useState(false)

  const saveChanges = async(id: string) => {
    const data = {
      id:   id,
      name: inputValue,
    }
    await put(url, data, cookies.access_token)
    const updatedPermissions = configItems.map(perm =>
      perm._id === id ? { ...perm, name: inputValue } : perm
    )

    setConfigItems(updatedPermissions)
    setEdit(false)
  }
  const permissionRemoved = (id:string | undefined) => {
    let newPermissionsList = [...configItems]
    newPermissionsList = newPermissionsList.filter(x => x?._id !== id)
    setConfigItems(newPermissionsList)
  }
  const deletePermission = async(id: string) => {
    await deleteItem(url, { id: id }, cookies.access_token)
    permissionRemoved(id)
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

export default VisitConfigListItem