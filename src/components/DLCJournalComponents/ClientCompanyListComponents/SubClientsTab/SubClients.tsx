/* eslint-disable max-len */
import React                  from 'react'
import SubClientsDrawer       from './SubClientsDrawer'
import ListItem               from './ListItem'

import {
  Button,
  Divider,
  List,
  message,
}                             from 'antd'

import {
  deleteItem,
  get,
  put,
}                             from '../../../../Plugins/helpers'

import { CompaniesType }      from '../../../../types/globalTypes'
import { useCookies }         from 'react-cookie'

import {
  useParams,
  useSearchParams,
}                             from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
}                             from '../../../../store/hooks'

import {
  resetIsSubClientAdded,
  setIsSubClientAdded,
}                             from '../../../../auth/AddSubClientReducer/addSubClientReducer'
import SuccessMessage from '../../../UniversalComponents/SuccessMessage'


const SubClients = () => {
  const [open, setOpen]                 = React.useState(false)
  const [subClients, setSubClients]     = React.useState<CompaniesType[]>()
  const [cookies]                       = useCookies()
  const [searchParams, setSearchParams] = useSearchParams()
  const subClientId                     = searchParams.get('subClientId')
  const tabKey                          = searchParams.get('tabKey')
  const openSubClientAdditionModal      = useAppSelector((state) => state.modals.openSubClientAdditionModal)
  const dispatch                        = useAppDispatch()
  const addSubClient                    = useAppSelector((state) => state.isSubClientAdded.isSubClientAdded)
  const { id }                          = useParams()
  const [messageApi, contextHolder]     = message.useMessage()

  React.useEffect(() => {
    (async () => {
      try{
        const companiesSubClients = await get(`company/company?parentId=${id}`, cookies.access_token)
        if(companiesSubClients.length > 0){
          setSubClients(companiesSubClients)
        }
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    })()
    return () => {
      dispatch(resetIsSubClientAdded())
    }
  },[openSubClientAdditionModal, addSubClient, open])

  const showDrawer = (subClient: string | undefined) => {
    setSearchParams(`&subClientId=${subClient}&tabKey=${tabKey}`)
    setOpen(true)
  }

  const subClientCompanyRemoved = (id:string) => {
    if(subClients){
      let newCompaniesList = [...subClients]
      newCompaniesList = newCompaniesList.filter(x => x?._id !== id)
      setSubClients(newCompaniesList)
    }
  }

  const deletSubClient = async (subClientId: string | undefined) => {
    if(subClientId ){
      await deleteItem('company/company', {id: subClientId} ,cookies.access_token)
      subClientCompanyRemoved(subClientId)
    }
  }

  const removeFormSubClientList = async(companyId: string | undefined) => {
    if(companyId){
      try{
        await put('company/company', {id: companyId, parentId: 'null'} ,cookies.access_token)
        dispatch(setIsSubClientAdded(true))
        subClientCompanyRemoved(companyId)
        messageApi.success({
          type:    'success',
          content: 'Išsaugota',
        })
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    }
  }

  const onClose = () => {
    setOpen(false)
  }

  const listButtons = (listItemId: string | undefined) => {
    return [
      <Button type='link' onClick={() => showDrawer(listItemId)} key={`${listItemId}`}>Peržiūrėti</Button>,
      <Button type='link' onClick={() => removeFormSubClientList && removeFormSubClientList(listItemId)} key={`${listItemId}`}>Perkelti</Button>,
      <Button type='link' onClick={() => deletSubClient(listItemId)} key={`${listItemId}`}>Ištrinti</Button>,
    ]
  }

  return (
    <div className='SubClientsContainer'>
      <Divider>Sub Klientai</Divider>
      <List
        locale={{emptyText: 'Nėra pridėtų sub klientų'}}
        dataSource={subClients}
        bordered
        renderItem={(item:  CompaniesType) => {
          return(
            <ListItem
              id={item._id}
              item={item}
              photosFolder={'../CompanyLogos'}
              altImage={'noImage.jpg'}
              listButtons={listButtons}
            />
          )
        }}/>
      { open &&
      <SubClientsDrawer
        subClientId={subClientId}
        onClose={onClose}
        open={open}/>
      }
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default SubClients