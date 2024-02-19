/* eslint-disable max-len */
import React                         from 'react'
import {
  Collapse,
  Modal,
  message,
}                                    from 'antd'
import { Premises }                  from '../../../types/globalTypes'
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  FileExcelOutlined,
}                                    from '@ant-design/icons'
import { useCookies }                from 'react-cookie'
import {
  deleteItem,
  generateCsv,
}                                    from '../../../Plugins/helpers'
import { setOpenRacksAdditionModal } from '../../../auth/ModalStateReducer/ModalStateReducer'
import { useAppDispatch }            from '../../../store/hooks'
import RacksList                     from './RacksList'
import { useSearchParams }           from 'react-router-dom'
import SuccessMessage                from '../../UniversalComponents/SuccessMessage'

type CollocationListItemProps = {
  item:        Premises
  setPremises: React.Dispatch<React.SetStateAction<Premises[] | undefined>>
  premises:    Premises[] | undefined
  siteId:      string | undefined
}

const CollocationListItem = ({item, setPremises, premises, siteId}: CollocationListItemProps) => {
  const [cookies]                     = useCookies(['access_token'])
  const [, setSearchParams]           = useSearchParams()
  const dispatch                      = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [messageApi, contextHolder]   = message.useMessage()

  const openRacksAdditionModal = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
    e.stopPropagation()
    dispatch(setOpenRacksAdditionModal(true))
    setSearchParams(`?menuKey=5&tabKey=1&siteId=${siteId}&premiseId=${id}`)
  }

  const showModal = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleOk = async(e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
    setIsModalOpen(false)
    e.stopPropagation()
    try{
      await deleteItem('site/premise', {id: item._id} ,cookies.access_token)
      const newPremises = premises?.filter((el) => el._id !== id)
      setPremises(newPremises)
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const generateSingleCollocationCSV = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
    e.stopPropagation()
    generateCsv('generateSingleCollocationCSV', {premiseId: id}, cookies.access_token)
  }

  const genExtra = (id: string) => (
    <div className='SingleCollocationIconContainer'>
      <AppstoreAddOutlined onClick={(e) => openRacksAdditionModal(e, id)}/>
      <FileExcelOutlined style={{color: 'green'}} onClick={(e) => generateSingleCollocationCSV(e, id)}/>
      <DeleteOutlined style={{color: 'red'}} onClick={showModal}/>
    </div>
  )

  return(
    <div>
      <Collapse
        defaultActiveKey={[`${item._id}`]}
        items={[
          {
            key:      item._id,
            label:    item.name,
            extra:    genExtra(item._id),
            children: <RacksList premiseId={item._id}/>,
          },
        ]}
      />
      <Modal title='Pašalinti patalpą' open={isModalOpen} onOk={(e) => handleOk(e, item._id)} onCancel={handleCancel}>
        <p>Ar tikrai norite pašalinti {item.name} patalpą? </p>
      </Modal>
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default CollocationListItem