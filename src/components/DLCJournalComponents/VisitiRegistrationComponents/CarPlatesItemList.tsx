/* eslint-disable max-len */
import { Button, Card, Input, List } from 'antd'
import React                         from 'react'
import { get, put }                  from '../../../Plugins/helpers'
import { useParams }                 from 'react-router'
import { useCookies }                from 'react-cookie'
import { SearchProps }               from 'antd/es/input'
import { useAppSelector }            from '../../../store/hooks'
import { selectSite }                from '../../../auth/SitesReducer/selectors'

type ItemListProps = {
    url?:               string;
    removeUrl?:         string;
    list:               string[] | undefined
    companyNameInput?:  React.ReactNode
    setList:            React.Dispatch<React.SetStateAction<string[] | undefined>>
}

const {Search} = Input

const CarPlatesItemList = ({ removeUrl, url, list, setList }: ItemListProps) => {
  const {id}                                  = useParams()
  const [cookies]                             = useCookies(['access_token'])
  const [carPlatesInput, setCarPlatesInput]   = React.useState<string>('')
  const selectedSite                          = useAppSelector(selectSite)
  const visitorCount                          = useAppSelector((state) => state.visit.visitor.length)

  const removeListItem = async(index: number) => {
    const filtered = list?.filter((_el, i) => index !== i)
    setList(filtered)
    if(removeUrl){
      await get(`${removeUrl}?visitId=${id}&index=${index}`, cookies.access_token)
    }
  }

  const onListItemAddition: SearchProps['onSearch'] = async(value) => {
    if(value !== '' && list){
      setList([...list, value])
      setCarPlatesInput('')
      if(url){
        await put(url, {id: id, carPlates: value}, cookies.access_token)
      }
    }
  }

  return (
    <>
      {visitorCount && visitorCount > 0 && selectedSite?.name === 'T72' ?
        <Card title='Pridėti automobilį' style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
          <Search
            value={carPlatesInput}
            onChange={(e) => setCarPlatesInput(e.target.value)}
            placeholder='Įveskite automobilio numerius'
            onSearch={onListItemAddition}
            enterButton={<div>Pridėti</div>}
          />
          {
            list && list?.length > 0 &&
        <List
          style={{marginTop: '50px'}}
          dataSource={list}
          renderItem={(item, index) =>
            <List.Item actions={[<Button key={index} type='link' onClick={() => removeListItem(index)}>Ištrinti</Button>]}>
              <List.Item.Meta title={ <div style={{width: '100%'}}>{item}</div>}/>
            </List.Item>
          }
        />
          }
        </Card>
        : null
      }
    </>
  )
}

export default CarPlatesItemList