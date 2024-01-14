/* eslint-disable max-len */
import React                                from 'react'
import { Button, Card, Form, Input, List }  from 'antd'
import { get, post }                        from '../../../Plugins/helpers'
import { useParams }                        from 'react-router'
import { useCookies }                       from 'react-cookie'
import { ClientsGuests }                    from '../../../types/globalTypes'

type ItemListProps = {
    cardTitle:          string;
    inputPlaceHolder:   string;
    list:               ClientsGuests[]
    setListItems:       React.Dispatch<React.SetStateAction<ClientsGuests[]>>
    url?:               string;
    removeUrl?:         string;
    companyNameInput?:  React.ReactNode
}

const ClientsGuestsItemList = ({ cardTitle, setListItems, url, list, removeUrl }: ItemListProps) => {
  const {id}        = useParams()
  const [cookies]   = useCookies(['access_token'])
  const form        = Form.useFormInstance<ClientsGuests>()

  const removeListItem = async(index: number) => {
    const filtered = list.filter((_el, i) => index !== i)
    setListItems(filtered)
    await get(`${removeUrl}?visitId=${id}&index=${index}`, cookies.access_token)
  }

  const onCreate = async() => {
    const guestName   = form.getFieldValue('guestName')
    const companyName = form.getFieldValue('companyName')

    const values = {
      guestName,
      companyName,
    }

    if(values.guestName){
      setListItems([...list, values])
      if(url){
        const updateValue = {
          values,
        }
        await post(`${url}?visitId=${id}`, updateValue, cookies.access_token)
      }
    }
  }

  return (
    <Card title={cardTitle} style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
      <Form.Item
        name='guestName'
        label={<div style={{ width: '100px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'}}>Vardas Pavardė</div>}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='companyName'
        label={<div style={{ width: '110px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'}}>Įmonė</div>}>
        <Input />
      </Form.Item>
      <div style={{width: '100%', textAlign: 'center'}}>
        <Button onClick={() => onCreate()}>Pridėti</Button>
      </div>
      <List
        locale={{emptyText: ' '}}
        itemLayout='horizontal'
        dataSource={list}
        renderItem={(item, i) => (
          <List.Item
            actions={[<Button key={i} onClick={() => removeListItem(i)} type='link'>Ištrinti</Button>]}
          >
            <List.Item.Meta
              title={item.guestName}
              description={item.companyName}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default ClientsGuestsItemList