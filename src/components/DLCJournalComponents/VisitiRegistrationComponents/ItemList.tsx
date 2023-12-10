/* eslint-disable max-len */
import React                          from 'react'
import { Button, Card, Input, List }  from 'antd'
import { SearchProps }                from 'antd/es/input/Search'
import { get, post }                  from '../../../Plugins/helpers'
import { useParams }                  from 'react-router-dom'
import { useCookies }                 from 'react-cookie'
const { Search } =  Input

type ItemListProps = {
    cardTitle:        string;
    inputValue:       string;
    inputPlaceHolder: string;
    setInputValue:    React.Dispatch<React.SetStateAction<string>>
    list:             string[]
    setListItems:     React.Dispatch<React.SetStateAction<string[]>>
    url?:             string;
    removeUrl?:       string;
}

const ItemList = ({cardTitle, inputPlaceHolder, inputValue, setInputValue, list, setListItems, url, removeUrl}: ItemListProps) => {
  const {id}      = useParams()
  const [cookies] = useCookies(['access_token'])

  const removeListItem = async(index: number) => {
    const filtered = list.filter((el, i) => index !== i)
    setListItems(filtered)
    await get(`${removeUrl}?visitId=${id}&index=${index}`, cookies.access_token)
  }

  const onListItemAddition: SearchProps['onSearch'] = async(value) => {
    if(value !== ''){
      setListItems([...list, value])
      setInputValue('')
      if(url){
        const updateValue = {
          value,
        }
        await post(`${url}?visitId=${id}`, updateValue, cookies.access_token)
      }
    }
  }

  return (
    <Card title={cardTitle} style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
      <Search
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={inputPlaceHolder}
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
            <List.Item.Meta style={{flex: '0 0'}} title={item}/>
          </List.Item>}
      />
      }
    </Card>
  )
}

export default ItemList