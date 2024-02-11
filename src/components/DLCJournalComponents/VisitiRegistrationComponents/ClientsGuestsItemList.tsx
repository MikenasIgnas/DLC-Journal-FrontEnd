/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                         from 'react'
import { Button, Card, Input, List } from 'antd'
import { get, put }                  from '../../../Plugins/helpers'
import { useCookies }                from 'react-cookie'
import { Guest, Visitors }      from '../../../types/globalTypes'
import { useParams }                 from 'react-router'

type ItemListProps = {
    url?:               string;
    removeUrl?:         string;
    cardTitle?:         string;
    inputPlaceHolder?:  string;
    list:               Guest[] | undefined
    setListItems:       React.Dispatch<React.SetStateAction<Guest[] | undefined>>
    companyNameInput?:  React.ReactNode
    visitors:           Visitors[]
    selectedVisitors:   number | undefined
    fetchData?:         () => Promise<void>
}

const ClientsGuestsItemList = ({ removeUrl,list, setListItems, selectedVisitors, fetchData }: ItemListProps) => {
  const [cookies]       = useCookies(['access_token'])
  const { id }          = useParams()
  const [clientsGuestNamesInput, setClientsGuestsNamesInput]      = React.useState<string>('')
  const [clientsGuestCompanyInput, setClientsGuestCompanyInput]   = React.useState<string>('')

  const removeListItem = async(index: number) => {
    const filtered = list?.filter((_item, i) => i !== index)
    if(filtered){
      setListItems(filtered)
    }
    if (removeUrl && id) {
      await get(`${removeUrl}?visitId=${id}&index=${index}`, cookies.access_token)
      if(fetchData){
        fetchData()
      }
    }

  }

  const onCreate = async() => {
    const guests = {
      name:    clientsGuestNamesInput,
      company: clientsGuestCompanyInput,
    }
    await put('visit/visit', {id: id, guests}, cookies.access_token)
    if(clientsGuestNamesInput !== ''){
      setListItems((prev) => prev && [...prev, guests])
      setClientsGuestsNamesInput('')
      setClientsGuestCompanyInput('')
    }
  }

  return (
    <>
      {
        selectedVisitors && selectedVisitors > 0 ?
          <Card title={'Atvykstanty tretieji asmenys'} style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
            <Input addonBefore='Vardas/Pavardė' value={clientsGuestNamesInput} onChange={(e) => setClientsGuestsNamesInput(e.target.value)}/>
            <Input addonBefore='Įmonė' value={clientsGuestCompanyInput} onChange={(e) => setClientsGuestCompanyInput(e.target.value)}/>
            <div style={{width: '100%', textAlign: 'center'}}>
              <Button onClick={onCreate} >Pridėti</Button>
            </div>
            <List
              locale={{ emptyText: ' ' }}
              itemLayout='horizontal'
              dataSource={list}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  actions={[
                    <Button key={index} onClick={() => removeListItem(index)} type='link'>
                  Ištrinti
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.name || 'Unknown Name'}
                    description={item.company || 'Unknown Company'}
                  />
                </List.Item>
              )}
            />
          </Card>
          : null
      }

      {/* {selectedVisitors && selectedVisitors > 0 && !canBringCompany ?
        <div style={{ textAlign: 'center', margin: '30px'}}>
          <Tag color='error'>Klientas negali turėti palydos</Tag>
        </div>
        : null
      } */}
    </>
  )
}

export default ClientsGuestsItemList