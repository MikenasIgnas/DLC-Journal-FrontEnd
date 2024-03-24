/* eslint-disable max-len */
import React                                    from 'react'

import {
  Button,
  Card,
  Form,
  Input,
  List,
  Tag,
  message,
}                                               from 'antd'

import { post, put }                            from '../../../Plugins/helpers'
import { useCookies }                           from 'react-cookie'
import {
  useAppDispatch,
  useAppSelector,
}                                               from '../../../store/hooks'
import { addGuests, setClientsGuests }                            from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'
import SuccessMessage                           from '../../UniversalComponents/SuccessMessage'
import { selectAllSelectedVisitorPermissions }  from '../../../auth/VisitorEmployeeReducer/selectors'
import { setEditClientsGuests }                 from '../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'
import { useSearchParams }                      from 'react-router-dom'
import GuestsListItem                           from './GuestsListItem'
import { Guest } from '../../../types/globalTypes'

type VisitorInfo = {
  idType:       string;
  signatures:   string
};

type Visitors = {
  [key: string]: VisitorInfo;
};

type GuestRecord = {
  guests: Visitors;
};

const SingleVisitClientsGuests = () => {
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
  const [form]                                                    = Form.useForm()
  const editClientsGuests                                         = useAppSelector((state) => state.visitPageEdits.editClientsGuests)
  const [searchParams]                                            = useSearchParams()
  const visitId                                                   = searchParams.get('_id')

  const onCreate = async() => {
    if (clientsGuestNamesInput !== '') {
      try{
        if(clientsGuests){
          const res =await post('visit/guests', { visitId: visitId, name: clientsGuestNamesInput, company: clientsGuestCompanyInput }, cookies.access_token)
          dispatch(addGuests(res))
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
      setClientsGuestsNamesInput('')
      setClientsGuestCompanyInput('')
    }
  }


  const saveChanges = async (values: GuestRecord) => {
    dispatch(setEditClientsGuests(!editClientsGuests))
    if (editClientsGuests) {
      try {
        const updatedGuests:Guest[] = []
        for (const guest of clientsGuests) {
          const updatedGuest = {
            ...guest,
            idType:     values.guests[guest._id].idType,
            signatures: values.guests[guest._id].signatures,
          }

          const updateValues = {
            id:      updatedGuest._id,
            visitId: visitId,
            idType:  updatedGuest.idType,
          }
          updatedGuests.push(updatedGuest)
          await put('visit/guests', updateValues, cookies.access_token)
        }
        dispatch(setClientsGuests(updatedGuests))
        messageApi.success({
          type:    'success',
          content: 'Išsaugota',
        })
      } catch (error) {
        if (error instanceof Error) {
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    }
  }
  return (
    <>
      {
        visitorsCount && visitorsCount > 0 ?
          <Form form={form} onFinish={saveChanges}>
            <Card
              title={'Atvykstanty tretieji asmenys'}
              style={{margin: '10px', backgroundColor: '#f9f9f9'}}
              extra={!isSecurity && <Button htmlType='submit' type='link'>{!editClientsGuests ? 'Edit': 'Save'}</Button>}
            >
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
              <div style={{width: '100%',marginTop: '10px', textAlign: 'center'}}>
                {!isSecurity && <Button onClick={onCreate} >Pridėti</Button>}
              </div>
              <List
                locale={{ emptyText: ' ' }}
                itemLayout='horizontal'
                dataSource={clientsGuests}
                renderItem={(item, index) => <GuestsListItem item={item} index={index}/>}
              />
            </Card>
          </Form>
          : null
      }

      {visitorsCount && visitorsCount > 0 ? !canBringCompany && <div style={{ textAlign: 'center', margin: '30px'}}>
        <Tag color='error'>Klientas negali turėti palydos</Tag>
      </div> : null}
      <SuccessMessage contextHolder={contextHolder}/>
    </>
  )
}

export default SingleVisitClientsGuests