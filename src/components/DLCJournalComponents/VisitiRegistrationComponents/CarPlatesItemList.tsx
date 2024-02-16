/* eslint-disable max-len */
import { Button, Card, Input, List } from 'antd'
import React                         from 'react'
import { get, post }                 from '../../../Plugins/helpers'
import { useParams }                 from 'react-router'
import { useCookies }                from 'react-cookie'
import { SearchProps }               from 'antd/es/input'

type ItemListProps = {
    url?:               string;
    removeUrl?:         string;
    list:               string[]
    companyNameInput?:  React.ReactNode
    setList:            React.Dispatch<React.SetStateAction<string[]>>
    visitAddress:       string | null
    selectedVisitors:   number | undefined
}

const {Search} = Input

const CarPlatesItemList = ({ removeUrl, url, list, setList, selectedVisitors, visitAddress }: ItemListProps) => {
  const {id}                                  = useParams()
  const [cookies]                             = useCookies(['access_token'])
  const [carPlatesInput, setCarPlatesInput]   = React.useState<string>('')


  const removeListItem = async(index: number) => {
    const filtered = list.filter((_el, i) => index !== i)
    setList(filtered)
    if(removeUrl){
      await get(`${removeUrl}?visitId=${id}&index=${index}`, cookies.access_token)
    }
  }

  const onListItemAddition: SearchProps['onSearch'] = async(value) => {
    if(value !== ''){
      setList([...list, value])
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
      {selectedVisitors && selectedVisitors > 0 && visitAddress === 'T72' ?
        <Card title='Pridėti automobilį' style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
          <Search
            value={carPlatesInput}
            onChange={(e) => setCarPlatesInput(e.target.value)}
            placeholder='Įveskite automobilio numerius'
            onSearch={onListItemAddition}
            enterButton={<div>Pridėti</div>}
          />
          {
            list.length > 0 &&
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