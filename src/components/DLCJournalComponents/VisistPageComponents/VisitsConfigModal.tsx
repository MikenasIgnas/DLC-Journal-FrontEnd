/* eslint-disable max-len */
import React, { useState }        from 'react'
import { Button, Divider, Modal, message } from 'antd'
import { get }                    from '../../../Plugins/helpers'
import { useCookies }             from 'react-cookie'
import VisitsConfingForm          from './VisitsConfingForm'
import SuccessMessage from '../../UniversalComponents/SuccessMessage'

type ConfingItemsType = {
    name:   string | undefined;
    _id:    string;
}

const VisitsConfigModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen]     = useState(false)
  const [cookies]                         = useCookies(['access_token'])
  const [visitorIdType, setVisitorIdType] = React.useState<ConfingItemsType[]>([])
  const [messageApi, contextHolder]       = message.useMessage()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  React.useEffect(() => {
    (async () => {
      try{
        const visitorIdTypeRes = await get('visit/visitorIdType', cookies.access_token)
        setVisitorIdType(visitorIdTypeRes)
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    })()
  },[])

  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <Button type='default' onClick={showModal}>
        Dokumentų tipai
      </Button>
      <Modal title='Vizitų konfiguracijos' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Divider plain>Tvarkyti lankytojų dokumentus</Divider>
        <VisitsConfingForm
          configItems={visitorIdType}
          url={'visit/visitorIdType'}
          setConfigItems={setVisitorIdType}
        />
      </Modal>
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default VisitsConfigModal