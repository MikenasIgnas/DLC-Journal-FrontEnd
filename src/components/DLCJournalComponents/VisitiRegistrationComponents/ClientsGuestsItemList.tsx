/* eslint-disable max-len */
import React              from 'react'

import {
  Button,
  Card,
  Input,
  List,
}                         from 'antd'

import { put }            from '../../../Plugins/helpers'
import { useCookies }     from 'react-cookie'
import { Guest }          from '../../../types/globalTypes'
import { useParams }      from 'react-router'

import {
  useAppDispatch,
  useAppSelector,
}                         from '../../../store/hooks'

import {
  addGuests,
  removeGuest,
}                         from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'

type ItemListProps = {
    url?:               string;
    cardTitle?:         string;
    list?:              Guest[] | undefined
    setListItems?:      React.Dispatch<React.SetStateAction<Guest[] | undefined>>
}

const ClientsGuestsItemList = ({ list, setListItems }: ItemListProps) => {
  const [cookies]                                                 = useCookies(['access_token'])
  const { id }                                                    = useParams()
  const [clientsGuestNamesInput, setClientsGuestsNamesInput]      = React.useState<string>('')
  const [clientsGuestCompanyInput, setClientsGuestCompanyInput]   = React.useState<string>('')
  const visitorsCount                                             = useAppSelector((state) => state.visit.visitor.length)
  const dispatch                                                  = useAppDispatch()
  const clientsGuests                                             = useAppSelector((state) => state.visit.guests)

  const removeListItem = async(index: number) => {
    const filtered = list?.filter((_item, i) => i !== index)
    if (filtered && setListItems) {
      setListItems(filtered)
    } else {
      dispatch(removeGuest(index))
      const filteredGuests = clientsGuests?.filter((_, i) => i !== index)
      await put('visit/visit', {id: id, guests: filteredGuests} ,cookies.access_token)
    }
  }

  const onCreate = async() => {
    const guests = {
      name:    clientsGuestNamesInput,
      company: clientsGuestCompanyInput,
    }

    if (clientsGuestNamesInput !== '') {
      if (setListItems) {
        setListItems((prev) => prev && [...prev, guests])
      } else {
        dispatch(addGuests(guests))
        if(clientsGuests){
          await put('visit/visit', {id: id, guests: [...clientsGuests, guests]}, cookies.access_token)
        }
      }
      setClientsGuestsNamesInput('')
      setClientsGuestCompanyInput('')
    }
  }

  return (
    <>
      {
        visitorsCount && visitorsCount > 0 ?
          <Card title={'Atvykstanty tretieji asmenys'} style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
            <Input addonBefore='Vardas/Pavardė' value={clientsGuestNamesInput} onChange={(e) => setClientsGuestsNamesInput(e.target.value)}/>
            <Input addonBefore='Įmonė' value={clientsGuestCompanyInput} onChange={(e) => setClientsGuestCompanyInput(e.target.value)}/>
            <div style={{width: '100%', textAlign: 'center'}}>
              <Button onClick={onCreate} >Pridėti</Button>
            </div>
            <List
              locale={{ emptyText: ' ' }}
              itemLayout='horizontal'
              dataSource={list ? list : clientsGuests}
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

      {/* {visitorsCount && visitorsCount > 0 && !canBringCompany ?
        <div style={{ textAlign: 'center', margin: '30px'}}>
          <Tag color='error'>Klientas negali turėti palydos</Tag>
        </div>
        : null
      } */}
    </>
  )
}

export default ClientsGuestsItemList