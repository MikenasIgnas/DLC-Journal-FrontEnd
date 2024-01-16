/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                              from 'react'
import { Button, Card, Input, List, Tag } from 'antd'
import { get, post }                      from '../../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'
import { ClientsGuests, VisitorsType }    from '../../../types/globalTypes'
import filterPermisions                   from './filterPermisions'
import { useParams }                      from 'react-router'

type ItemListProps = {
    url?:               string;
    removeUrl?:         string;
    cardTitle?:         string;
    inputPlaceHolder?:  string;
    list:               ClientsGuests[] | undefined
    setListItems:       React.Dispatch<React.SetStateAction<ClientsGuests[]>>
    companyNameInput?:  React.ReactNode
    visitors:           VisitorsType[] | undefined
    selectedVisitors:   number | undefined
    fetchData?:          () => Promise<void>
}

const ClientsGuestsItemList = ({ url, removeUrl, visitors,list, setListItems, selectedVisitors, fetchData }: ItemListProps) => {
  const [cookies]       = useCookies(['access_token'])
  const { id }          = useParams()
  const canBringCompany = filterPermisions(visitors).includes('Įleisti Trečius asmenis')
  const [clientsGuestNamesInput, setClientsGuestsNamesInput]      = React.useState<string>('')
  const [clientsGuestCompanyInput, setClientsGuestCompanyInput]   = React.useState<string>('')

  const removeListItem = async(index: number) => {
    const filtered = list?.filter((_item, i) => i !== index)
    if(filtered){
      setListItems(filtered)
    }
    if (removeUrl && id) {
      console.log(filtered)
      await get(`${removeUrl}?visitId=${id}&index=${index}`, cookies.access_token)
      if(fetchData){
        fetchData()
      }
    }

  }

  const onCreate = async() => {
    const values = {
      guestName:   clientsGuestNamesInput,
      companyName: clientsGuestNamesInput,
    }

    if(clientsGuestNamesInput !== ''){
      setListItems((prev) => [...prev, values])
      setClientsGuestsNamesInput('')
      setClientsGuestCompanyInput('')
      if(url && fetchData){
        await post(`${url}?visitId=${id}`, values, cookies.access_token)
        fetchData()
      }
    }
  }
  return (
    <>
      {
        selectedVisitors && selectedVisitors > 0 && canBringCompany ?
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
                    title={item.guestName || 'Unknown Name'}
                    description={item.companyName || 'Unknown Company'}
                  />
                </List.Item>
              )}
            />
          </Card>
          : null
      }

      {selectedVisitors && selectedVisitors > 0 && !canBringCompany ?
        <div style={{ textAlign: 'center', margin: '30px'}}>
          <Tag color='error'>Klientas negali turėti palydos</Tag>
        </div>
        : null
      }
    </>
  )
}

export default ClientsGuestsItemList