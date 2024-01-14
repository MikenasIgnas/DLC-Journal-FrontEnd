/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Button, Card, Form, Input, List, Tag } from 'antd'
import { get, post }                            from '../../../Plugins/helpers'
import { useCookies }                           from 'react-cookie'
import filterPermisions                         from './filterPermisions'
import useSetSingleVisitData                    from '../../../Plugins/useSetSingleVisitData'

type ItemListProps = {
    url?:       string;
    removeUrl?: string;
    cardTitle?:          string;
    inputPlaceHolder?:   string;
    list?:               any[]
    setListItems?:       React.Dispatch<React.SetStateAction<any[]>>
    companyNameInput?:  React.ReactNode
}

const ClientsGuestsItemList = ({ url, removeUrl }: ItemListProps) => {
  const [cookies]       = useCookies(['access_token'])
  const [form]            = Form.useForm()
  const {
    visitData,
    id,
    clientsGuests,
    setClientsGuests,
  }                     = useSetSingleVisitData()
  const canBringCompany = filterPermisions(visitData?.[0].visitors).includes('Įleisti Trečius asmenis')

  const removeListItem = async(index: number) => {
    const filtered = clientsGuests.filter((_item, i) => i !== index && _item !== null)
    setClientsGuests(filtered)
    if (removeUrl) {
      await get(`${removeUrl}?visitId=${id}&index=${index}`, cookies.access_token)
    }
  }

  const onCreate = async(values: any) => {
    setClientsGuests([...clientsGuests, values])
    if(url){
      await post(`${url}?visitId=${id}`, values, cookies.access_token)
      form.resetFields(['guestName', 'companyName'])
    }
  }

  return (
    <>
      { canBringCompany ?
        <Form form={form} onFinish={onCreate}>
          <Card title={'Pridėti Palydą'} style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
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
              <Button htmlType='submit'>Pridėti</Button>
            </div>
            <List
              locale={{ emptyText: ' ' }}
              itemLayout='horizontal'
              dataSource={clientsGuests}
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
        </Form>
        :
        <div style={{ textAlign: 'center', margin: '30px'}}>
          <Tag color='error'>Klientas negali turėti palydos</Tag>
        </div>
      }
    </>
  )
}

export default ClientsGuestsItemList