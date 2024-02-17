/* eslint-disable max-len */
import React, { useState }        from 'react'
import { Button, Divider, Modal } from 'antd'
import { get }                    from '../../../Plugins/helpers'
import { useCookies }             from 'react-cookie'
import VisitsConfingForm          from './VisitsConfingForm'

type ConfingItemsType = {
    name:   string | undefined;
    _id:    string;
}

const VisitsConfigModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen]     = useState(false)
  const [cookies]                         = useCookies(['access_token'])
  const [visitStatus, setVisitStatus]     = React.useState<ConfingItemsType[]>([])
  const [visitorIdType, setVisitorIdType] = React.useState<ConfingItemsType[]>([])
  const [visitPurpose, setVisitPurpose]   = React.useState<ConfingItemsType[]>([])

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
        const visitStatusRes   = await get('visit/visitStatus', cookies.access_token)
        const visitorIdTypeRes = await get('visit/visitorIdType', cookies.access_token)
        const visitPurposeRes  = await get('visit/visitPurpose', cookies.access_token)
        setVisitStatus(visitStatusRes)
        setVisitorIdType(visitorIdTypeRes)
        setVisitPurpose(visitPurposeRes)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  return (
    <>
      <Button style={{width: '100%'}} type='primary' onClick={showModal}>
        Vizitų Konfiguracija
      </Button>
      <Modal title='Vizitų konfiguracijos' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Divider plain>Tvarkyti visito statusus</Divider>
        <VisitsConfingForm
          configItems={visitStatus}
          url={'visit/visitStatus'}
          setConfigItems={setVisitStatus}
        />
        <Divider plain>Tvarkyti lankytojų dokumentus</Divider>
        <VisitsConfingForm
          configItems={visitorIdType}
          url={'visit/visitorIdType'}
          setConfigItems={setVisitorIdType}
        />
        <Divider plain>Tvarkyti vizito tikslus</Divider>
        <VisitsConfingForm
          configItems={visitPurpose}
          url={'visit/visitPurpose'}
          setConfigItems={setVisitPurpose}
        />
      </Modal>
    </>
  )
}

export default VisitsConfigModal