/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React               from 'react'
import SiteTab             from './SiteTab'
import SuccessMessage      from '../../UniversalComponents/SuccessMessage'
import RacksAdditionModal  from './RacksAdditionModal'

import {
  Input,
  Modal,
  Tabs,
  message,
  Checkbox,
  CheckboxProps,
}                          from 'antd'


import {
  deleteItem,
  get,
  post,
}                          from '../../../Plugins/helpers'

import { useCookies }      from 'react-cookie'
import { useSearchParams } from 'react-router-dom'
import { CloseOutlined }   from '@ant-design/icons'
import { Sites }           from '../../../types/globalTypes'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const CollocationTab = () => {
  const [activeKey, setActiveKey]                               = React.useState<string>()
  const [isSiteAdditionModalOpen, setIsSiteAdditionModalOpen]   = React.useState(false)
  const [isSiteRemovalModalOpen, setIsSiteRemovalModalOpen]     = React.useState(false)
  const [isRemote, setIsRemote]                                 = React.useState(false)
  const [siteNameInputValue, setSiteNameInputValue]             = React.useState<string>('')
  const [sites, setSites]                                       = React.useState<Sites[]>([])
  const newTabIndex                                             = React.useRef(0)
  const [cookies]                                               = useCookies(['access_token'])
  const [searchParams, setSearchParamas]                        = useSearchParams()
  const [messageApi, contextHolder]                             = message.useMessage()
  const menuKey                                                 = searchParams.get('menuKey')
  const tabKey                                                  = searchParams.get('tabKey')
  const siteId                                                  = searchParams.get('siteId')
  React.useEffect(() => {
    (async () => {
      try {
        const sitesRes  = await get('site/site', cookies.access_token)
        setSites(sitesRes)
        setActiveKey(sitesRes[0]._id)
      } catch (error) {
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    })()
  }, [isSiteAdditionModalOpen])

  const handleCancel = () => {
    setIsSiteAdditionModalOpen(false)
  }

  const cancelSiteRemove = () => {
    setIsSiteRemovalModalOpen(false)
  }

  const onChange = (newActiveKey: string) => {
    setSearchParamas(`?menuKey=5&tabKey=1&siteId=${newActiveKey}`)
    setActiveKey(newActiveKey)
  }

  const add = () => {
    setIsSiteAdditionModalOpen(true)
  }

  const onOk = async() => {
    try{
      await post('site/site', { name: siteNameInputValue, isRemote: isRemote }, cookies.access_token )
      const newActiveKey = `newTab${newTabIndex.current++}`
      const newPanes = [...sites]
      newPanes.push({
        name: '',
        _id:  '',
      })
      setSites(newPanes)
      setActiveKey(newActiveKey)
      setSiteNameInputValue('')
      setIsSiteAdditionModalOpen(false)
      messageApi.success({
        type:    'success',
        content: 'Adresas pridėtas',
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

  const openSiteRemoveModal = async(targetKey: TargetKey) => {
    setSearchParamas(`menuKey=${menuKey}&tabKey=${tabKey}&siteId=${targetKey}`)
    setIsSiteRemovalModalOpen(true)
  }
  const onIsRemoteChange: CheckboxProps['onChange'] = (e) => {
    setIsRemote(e.target.checked)
  }
  const onRemoveSite = async() => {
    try{
      await deleteItem('site/site', {id: siteId} ,cookies.access_token)
      let newActiveKey = activeKey
      let lastIndex = -1
      sites.forEach((item, i) => {
        if (item._id === siteId) {
          lastIndex = i - 1
        }
      })
      const newPanes = sites.filter((item) => item._id !== siteId)
      if (newPanes.length && newActiveKey === siteId) {
        if (lastIndex >= 0) {
          newActiveKey = newPanes[lastIndex]._id
        } else {
          newActiveKey = newPanes[0]._id
        }
      }
      setSites(newPanes)
      setActiveKey(newActiveKey)
      setIsSiteRemovalModalOpen(false)
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add()
    } else {
      openSiteRemoveModal(targetKey)
    }
  }

  return (
    <>
      <Tabs
        type='editable-card'
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={sites.map((el: Sites, index: number) => ({
          label:     <div style={{padding: '10px', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>{el.name}</div>,
          children:  <SiteTab name={el.name} siteId={el._id} />,
          key:       el._id ?? `fallback-key-${index}`,
          closeIcon: <CloseOutlined style={{marginRight: '10px'}} />,
        }))}
      />
      <Modal title='Pridėti adresą' open={isSiteAdditionModalOpen} onOk={onOk} onCancel={handleCancel}>
        <Input value={siteNameInputValue} onChange={(e) => setSiteNameInputValue(e.target.value)}/>
        <Checkbox onChange={onIsRemoteChange}/>
      </Modal>
      <Modal title='Pašalinti adresą' open={isSiteRemovalModalOpen} onOk={onRemoveSite} onCancel={cancelSiteRemove}>
        <p>Ar tikrai norite pašalintį adresą?</p>
      </Modal>
      <SuccessMessage contextHolder={contextHolder}/>
      <RacksAdditionModal/>
    </>
  )
}

export default CollocationTab