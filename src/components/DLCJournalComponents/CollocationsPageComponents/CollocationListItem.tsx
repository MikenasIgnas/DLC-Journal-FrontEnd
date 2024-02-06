/* eslint-disable max-len */
import React                                                      from 'react'
import { Collapse }                                               from 'antd'
import { Premises }                                               from '../../../types/globalTypes'
import { AppstoreAddOutlined, DeleteOutlined, FileExcelOutlined } from '@ant-design/icons'
import { useCookies }                                             from 'react-cookie'
import { deleteItem, generateCsv }                                from '../../../Plugins/helpers'
import { setOpenRacksAdditionModal }                              from '../../../auth/ModalStateReducer/ModalStateReducer'
import { useAppDispatch }                                         from '../../../store/hooks'
import RacksList                                                  from './RacksList'
import { useSearchParams }                                        from 'react-router-dom'

type CollocationListItemProps = {
  item:         Premises
  setPremises:  React.Dispatch<React.SetStateAction<Premises[] | undefined>>
  premises:     Premises[] | undefined
  siteId:       string | undefined
}

const CollocationListItem = ({item, setPremises, premises, siteId}: CollocationListItemProps) => {
  const [cookies]           = useCookies(['access_token'])
  const [, setSearchParams] = useSearchParams()
  const dispatch            = useAppDispatch()

  const addRacks = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
    e.stopPropagation()
    dispatch(setOpenRacksAdditionModal(true))
    setSearchParams(`?menuKey=5&tabKey=1&siteId=${siteId}&premiseId=${id}`)
  }

  const deletePremise = async(e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
    e.stopPropagation()
    await deleteItem('site/premise', {id: item._id} ,cookies.access_token)
    const newPremises = premises?.filter((el) => el._id !== id)
    setPremises(newPremises)
  }

  const generateSingleCollocationCSV = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
    e.stopPropagation()
    generateCsv('generateSingleCollocationCSV', {premiseId: id}, cookies.access_token)
  }

  const genExtra = (id: string) => (
    <div className='SingleCollocationIconContainer'>
      <AppstoreAddOutlined onClick={(e) => addRacks(e, id)}/>
      <FileExcelOutlined style={{color: 'green'}} onClick={(e) => generateSingleCollocationCSV(e, id)}/>
      <DeleteOutlined style={{color: 'red'}} onClick={(e) => deletePremise(e, id)}/>
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
    </div>
  )
}

export default CollocationListItem