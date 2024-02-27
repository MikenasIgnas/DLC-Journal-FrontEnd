/* eslint-disable max-len */
import {
  useAppDispatch,
  useAppSelector,
}                               from '../../../../store/hooks'

import {
  Button,
  Tabs,
  TabsProps,
  message,
}                               from 'antd'

import {
  useParams,
  useSearchParams,
}                               from 'react-router-dom'

import { setSiteId }            from '../../../../auth/SingleCompanyReducer/SingleCompanyReducer'
import CompaniesRacks           from './CompaniesRacks'
import EditableCompaniesRacks   from './EditableCompaniesRacks'
import { setEditCompanyRacks }  from '../../../../auth/SingleCompanyEditsReducer/SingleCompanyEditsReducer'
import { put }                  from '../../../../Plugins/helpers'
import { useCookies }           from 'react-cookie'
import SuccessMessage           from '../../../UniversalComponents/SuccessMessage'

const ClientsCollocationsTab = () => {
  const [searchParams, setSearchParams]   = useSearchParams()
  const sites                             = useAppSelector((state) => state.singleCompany.fullSiteData)
  const editCompanyRacks                  = useAppSelector((state) => state.singleCompanyEdits.editCompanyRacks)
  const dispatch                          = useAppDispatch()
  const siteId                            = searchParams.get('siteId')
  const tabKey                            = searchParams.get('tabKey')
  const page                              = searchParams.get('page')
  const limit                             = searchParams.get('limit')
  const checkedList                       = useAppSelector((state) => state.racks.checkedList)
  const [cookies]                         = useCookies(['access_token'])
  const { id }                            = useParams()
  const [messageApi, contextHolder]       = message.useMessage()

  const saveChanges = async() => {
    dispatch(setEditCompanyRacks(!editCompanyRacks))
    if(editCompanyRacks){
      try{
        await put( 'company/company', { id: id, racks: checkedList }, cookies.access_token)
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

  const items: TabsProps['items'] = sites?.map((site) => ({
    key:      site._id,
    label:    site.name,
    children: !editCompanyRacks ? <CompaniesRacks site={site}/> : <EditableCompaniesRacks site={site}/>,
  }))

  const changeTab = (key: string) => {
    setSearchParams(`page=${page}&limit=${limit}&siteId=${key}&tabKey=${tabKey}`)
    dispatch(setSiteId(key))
  }

  return(
    <>
      <Tabs
        tabBarExtraContent={<Button onClick={saveChanges} type='link'>{!editCompanyRacks ? 'Edit' : 'Save'}</Button>}
        onTabClick={changeTab}
        activeKey={siteId ? siteId : undefined }
        items={items}
      />
      <SuccessMessage contextHolder={contextHolder}/>
    </>
  )
}

export default ClientsCollocationsTab