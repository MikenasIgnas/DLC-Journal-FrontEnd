/* eslint-disable max-len */
import React                                    from 'react'

import {
  Button,
  Card,
  Input,
  List,
  Tag,
  message,
}                                               from 'antd'

import { deleteItem, post }                     from '../../../Plugins/helpers'
import { useCookies }                           from 'react-cookie'

import {
  useAppDispatch,
  useAppSelector,
}                                               from '../../../store/hooks'

import {
  addGuests,
  removeGuest,
}                                               from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'
import SuccessMessage                           from '../../UniversalComponents/SuccessMessage'
import { selectAllSelectedVisitorPermissions }  from '../../../auth/VisitorEmployeeReducer/selectors'
import { useSearchParams } from 'react-router-dom'

const ClientsGuestsItemList = () => {
  const [cookies]                                                 = useCookies(['access_token'])
  const [clientsGuestNamesInput, setClientsGuestsNamesInput]      = React.useState<string>('')
  const [clientsGuestCompanyInput, setClientsGuestCompanyInput]   = React.useState<string>('')
  const visitorsCount                                             = useAppSelector((state) => state.visit.visitor.length)
  const dispatch                                                  = useAppDispatch()
  const clientsGuests                                             = useAppSelector((state) => state.visit.guests)
  const [messageApi, contextHolder]                               = message.useMessage()
  const isSecurity                                                = useAppSelector((state) => state.auth.isSecurity)
  const matchingPermissionsItems                                  = useAppSelector(selectAllSelectedVisitorPermissions)
  const canBringCompany                                           = matchingPermissionsItems.some((el) => el.name === 'Įleisti trečius asmenis')
  const [searchParams]                                            = useSearchParams()
  const visitId                                                   = searchParams.get('_id')

  const removeListItem = async(id: string | undefined) => {
    try{
      dispatch(removeGuest(id))
      await deleteItem('visit/guests', {id: id} ,cookies.access_token)
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

  const onCreate = async() => {
    const guests = {
      name:    clientsGuestNamesInput,
      company: clientsGuestCompanyInput,
    }
    if (clientsGuestNamesInput !== '') {
      try{
        dispatch(addGuests(guests))
        await post('visit/guests', {visitId: visitId, name: clientsGuestNamesInput, company: clientsGuestCompanyInput}, cookies.access_token)
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
      setClientsGuestsNamesInput('')
      setClientsGuestCompanyInput('')
    }
  }

  return (
    <>
      {
        visitorsCount && visitorsCount > 0 ?
          <Card title={'Atvykstanty tretieji asmenys'} style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
            <Input
              disabled={isSecurity as boolean}
              addonBefore='Vardas/Pavardė'
              value={clientsGuestNamesInput}
              onChange={(e) => setClientsGuestsNamesInput(e.target.value)}
            />
            <Input
              disabled={isSecurity as boolean}
              addonBefore='Įmonė'
              value={clientsGuestCompanyInput}
              onChange={(e) => setClientsGuestCompanyInput(e.target.value)}
            />
            <div style={{width: '100%', textAlign: 'center'}}>
              {!isSecurity && <Button onClick={onCreate} >Pridėti</Button>}
            </div>
            <List
              locale={{ emptyText: ' ' }}
              itemLayout='horizontal'
              dataSource={clientsGuests}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  actions={[
                    <Button key={index} onClick={() => removeListItem(item?._id)} type='link'>
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

      {visitorsCount && visitorsCount > 0 ? !canBringCompany && <div style={{ textAlign: 'center', margin: '30px'}}>
        <Tag color='error'>Klientas negali turėti palydos</Tag>
      </div> : null}
      <SuccessMessage contextHolder={contextHolder}/>
    </>
  )
}

export default ClientsGuestsItemList