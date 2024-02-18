/* eslint-disable max-len */
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import { Input, List, message } from 'antd'
import React from 'react'
import { useCookies } from 'react-cookie'
import { deleteItem, put } from '../../../Plugins/helpers'
import SuccessMessage from '../../UniversalComponents/SuccessMessage'

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
  const [cookies]                     = useCookies(['access_token'])
  const [inputValue, setInputValue]   = React.useState<string | undefined>(item.name)
  const [edit, setEdit]               = React.useState(false)
  const [messageApi, contextHolder]   = message.useMessage()

  const saveChanges = async(id: string) => {
    try{
      const data = {
        id:   id,
        name: inputValue,
      }
      await put(url, data, cookies.access_token)

      const updatedPermissions = configItems.map(perm =>
        perm._id === id ? { ...perm, name: inputValue } : perm
      )

      messageApi.success({
        type:    'success',
        content: 'Išsaugota',
      })

      setConfigItems(updatedPermissions)
      setEdit(false)
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
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
        title={!edit ? <div>{item.name}</div> : <Input onChange={(e) => setInputValue(e.target.value !== '' ? e.target.value : item.name )} defaultValue={item.name}/>}
      />
      <div style={{display: 'flex', width: '50px', justifyContent: 'space-between', alignItems: 'center'}}>
        {!edit ? <EditOutlined onClick={() => setEdit(true)} style={{color: 'green'}} /> : <SaveOutlined onClick={() => saveChanges(item._id)}/>}
        <DeleteOutlined onClick={() => deletePermission(item._id)} style={{color: 'red'}}/>
      </div>
      <SuccessMessage contextHolder={contextHolder}/>
    </List.Item>
  )
}

export default VisitConfigListItem