/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React, { useRef, useState }  from 'react'
import { Input, Modal, Tabs }       from 'antd'
import { useCookies }               from 'react-cookie'
import { deleteItem, get, post }    from '../../../Plugins/helpers'
import { useSearchParams }          from 'react-router-dom'
import SiteTab                      from './SiteTab'
import { CloseOutlined }            from '@ant-design/icons'
import { Sites }                    from '../../../types/globalTypes'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;



const CollocationTab = () => {
  const [activeKey, setActiveKey]                               = useState<string>()
  const [isSiteAdditionModalOpen, setIsSiteAdditionModalOpen]   = React.useState(false)
  const [siteNameInputValue, setSiteNameInputValue]             = React.useState<string>('')
  const [sites, setSites]                                       = React.useState<Sites[]>([])
  const newTabIndex                                             = useRef(0)
  const [cookies]                                               = useCookies(['access_token'])
  const [, setSearchParamas]                                    = useSearchParams()

  React.useEffect(() => {
    (async () => {
      try {
        const sitesRes  = await get('site/site', cookies.access_token)
        setSites(sitesRes)
        setActiveKey(sitesRes[0]._id)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [isSiteAdditionModalOpen])

  const handleCancel = () => {
    setIsSiteAdditionModalOpen(false)
  }

  const onChange = (newActiveKey: string) => {
    setSearchParamas(`?menuKey=5&tabKey=1&siteId=${newActiveKey}`)
    setActiveKey(newActiveKey)
  }

  const add = () => {
    setIsSiteAdditionModalOpen(true)
  }

  const onOk = async() => {
    const newActiveKey = `newTab${newTabIndex.current++}`
    const newPanes = [...sites]
    newPanes.push({
      label: siteNameInputValue, key:   newActiveKey,
      name:  '',
      _id:   '',
    })
    setSites(newPanes)
    setActiveKey(newActiveKey)
    setSiteNameInputValue('')
    await post('site/site', { name: siteNameInputValue }, cookies.access_token )
    setIsSiteAdditionModalOpen(false)
  }

  const remove = async(targetKey: TargetKey) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    sites.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = sites.filter((item) => item._id !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    setSites(newPanes)
    setActiveKey(newActiveKey)
    await deleteItem('site/site', {id: targetKey} ,cookies.access_token)
  }

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add()
    } else {
      remove(targetKey)
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
      </Modal>
    </>
  )
}

export default CollocationTab