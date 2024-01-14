/* eslint-disable max-len */
import { Button, Card, Input, List } from 'antd'
import React                         from 'react'
import { get, post }                 from '../../../Plugins/helpers'
import { useParams }                 from 'react-router'
import { useCookies }                from 'react-cookie'
import { SearchProps }               from 'antd/es/input'
import useSetSingleVisitData         from '../../../Plugins/useSetSingleVisitData'

type ItemListProps = {
    url?:               string;
    removeUrl?:         string;
    companyNameInput?:  React.ReactNode
}

const {Search} = Input

const CarPlatesItemList = ({ removeUrl, url }: ItemListProps) => {
  const {id}        = useParams()
  const [cookies]   = useCookies(['access_token'])
  const {visitData, carPlates, setCarPlates} = useSetSingleVisitData()
  const [carPlatesInput, setCarPlatesInput] = React.useState<string>('')
  const removeListItem = async(index: number) => {
    const filtered = carPlates.filter((_el, i) => index !== i)
    setCarPlates(filtered)
    await get(`${removeUrl}?visitId=${id}&index=${index}`, cookies.access_token)
  }

  const onListItemAddition: SearchProps['onSearch'] = async(value) => {
    if(value !== ''){
      setCarPlates([...carPlates, value])
      setCarPlatesInput('')
      if(url){
        const updateValue = {
          value,
        }
        await post(`${url}?visitId=${id}`, updateValue, cookies.access_token)
      }
    }
  }

  return (
    <>
      { visitData?.[0].visitAddress === 'T72' &&
      <Card title='Pridėti automobilį' style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
        <Search
          value={carPlatesInput}
          onChange={(e) => setCarPlatesInput(e.target.value)}
          placeholder='Įveskite automobilio numerius'
          onSearch={onListItemAddition}
          enterButton={<div>Pridėti</div>}
        />
        {
          carPlates.length > 0 &&
        <List
          style={{marginTop: '50px'}}
          dataSource={carPlates}
          renderItem={(item, index) =>
            <List.Item actions={[<Button key={index} type='link' onClick={() => removeListItem(index)}>Ištrinti</Button>]}>
              <List.Item.Meta title={ <div style={{width: '100%'}}>{item}</div>}/>
            </List.Item>
          }
        />
        }
      </Card>
      }
    </>
  )
}

export default CarPlatesItemList