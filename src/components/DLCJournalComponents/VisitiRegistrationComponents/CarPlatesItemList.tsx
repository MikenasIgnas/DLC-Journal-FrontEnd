/* eslint-disable max-len */
import React            from 'react'

import {
  Button,
  Card,
  Input,
  List,
  message,
}                       from 'antd'

import {
  patch,
  put,
}                       from '../../../Plugins/helpers'

import { useParams }    from 'react-router'
import { useCookies }   from 'react-cookie'
import { SearchProps }  from 'antd/es/input'

import {
  useAppDispatch,
  useAppSelector,
}                       from '../../../store/hooks'

import { selectSite }   from '../../../auth/SitesReducer/selectors'

import {
  addCarPlates,
  removeCarPlates,
}                       from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'
import SuccessMessage from '../../UniversalComponents/SuccessMessage'

type ItemListProps = {
    url?:               string;
    removeUrl?:         string;
    list?:              string[] | undefined
    companyNameInput?:  React.ReactNode
    setList?:           React.Dispatch<React.SetStateAction<string[] | undefined>>
}

const {Search} = Input

const CarPlatesItemList = ({ list, setList }: ItemListProps) => {
  const {id}                                  = useParams()
  const [cookies]                             = useCookies(['access_token'])
  const [carPlatesInput, setCarPlatesInput]   = React.useState<string>('')
  const selectedSite                          = useAppSelector(selectSite)
  const visitorCount                          = useAppSelector((state) => state.visit.visitor.length)
  const carPlates                             = useAppSelector((state) => state.visit.carPlates)
  const dispatch                              = useAppDispatch()
  const [messageApi, contextHolder]           = message.useMessage()
  const isSecurity                            = useAppSelector((state) => state.auth.isSecurity)

  const removeListItem = async(item: string, index: number) => {
    const filtered = list?.filter((_el, i) => index !== i)
    if (setList && list) {
      setList(filtered)
    } else {
      try{
        dispatch(removeCarPlates(index))
        await patch('visit/carplate', {visitId: id, carPlate: item}, cookies.access_token)
        messageApi.success({
          type:    'success',
          content: 'Ištrinta',
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

  const onListItemAddition: SearchProps['onSearch'] = async(value) => {
    if (value !== '') {
      if (setList && list) {
        setList([...list, value])
      } else {
        try{
          dispatch(addCarPlates(value))
          if (carPlates) {
            await put('visit/visit', {id: id, carPlates: [...carPlates, value]}, cookies.access_token)
          }
          messageApi.success({
            type:    'success',
            content: 'Pridėta',
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
      setCarPlatesInput('')
    }
  }

  return (
    <>
      {visitorCount && visitorCount > 0 && selectedSite?.name === 'T72' ?
        <Card title='Pridėti automobilį' style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
          <Search
            disabled={isSecurity as boolean}
            value={carPlatesInput}
            onChange={(e) => setCarPlatesInput(e.target.value)}
            placeholder='Įveskite automobilio numerius'
            onSearch={onListItemAddition}
            enterButton={<div>Pridėti</div>}
          />
          <List
            style={{marginTop: '50px'}}
            dataSource={list ? list : carPlates}
            renderItem={(item, index) =>
              <List.Item actions={[!isSecurity && <Button key={index} type='link' onClick={() => removeListItem(item, index)}>Ištrinti</Button>]}>
                <List.Item.Meta title={ <div style={{width: '100%'}}>{item}</div>}/>
              </List.Item>
            }
          />
        </Card>
        : null
      }
      <SuccessMessage contextHolder={contextHolder}/>
    </>
  )
}

export default CarPlatesItemList