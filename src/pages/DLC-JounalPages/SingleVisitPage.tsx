/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
// /* eslint-disable max-len */
import React                                                  from 'react'
import { useParams }                                          from 'react-router-dom'
import { Avatar, Button, Card, Checkbox, Form, List, Select } from 'antd'
import { Badge, ConfigProvider, Descriptions }                from 'antd'
import type { DescriptionsProps }                             from 'antd'
import { useCookies }                                         from 'react-cookie'
import { get }                                                from '../../Plugins/helpers'
import { EmployeesType }                                      from '../../types/globalTypes'
import VisitorAdditionModal                                   from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitorAdditionModal'
import ItemList                                               from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ItemList'
import CollocationsList                                       from '../../components/DLCJournalComponents/VisitiRegistrationComponents/CollocationsList'

type CollocationType = {
  [key:string] :  string[]
}

type VisitStatusType = 'success' | 'processing' | 'error' | 'default' | 'warning' | undefined;

type VisitorsType = {
 idType: string;
 selectedVisitor:EmployeesType
}

type VisitsType = {
    id:               string;
    visitPurpose:     string[];
    visitStatus:      VisitStatusType;
    visitors:         VisitorsType[];
    dlcEmployees:     string;
    visitAddress:     string;
    visitingClient:   string;
    clientsGuests:    string[];
    carPlates:        string[];
    signature:        string;
    visitCollocation: CollocationType
    visitorsIdType:   string;
    creationDate:     string;
    creationTime:     string;
    startDate:        string;
    startTime:        string;
    endDate:          string;
    endTime:          string;
    companyId:        number;
}

const SingleVisitPage = () => {
  const [cookies]                                     = useCookies(['access_token'])
  const [visitData, setVisitData]                     = React.useState<VisitsType[]>()
  const [open, setOpen]                               = React.useState(false)
  const [clientsEmployees, setClientsEmployees]       = React.useState<EmployeesType[]>()
  const { id }                                        = useParams()
  const [selectedVisitors, setSelectedVisitors]       = React.useState<EmployeesType[]>()
  const [guestsImput, setGuestsInput]                 = React.useState<string>('')
  const [carPlatesInput, setCarPlatesInput]           = React.useState<string>('')
  const [form]                                        = Form.useForm()
  const [searchEmployeeValue, setSearchEmployeeValue] = React.useState<string | undefined>()
  const [clientsGuests, setClientsGuests]             = React.useState<string[]>([])
  const [carPlates, setCarPlates]                     = React.useState<string[]>([])

  const fetchData = async () => {
    try {
      const response = await get(`getSingleVisit/${id}`, cookies.access_token)
      setVisitData(response.data)
      setClientsGuests(response.data[0]?.clientsGuests)
      setCarPlates(response.data[0]?.carPlates)
      const companyId = response.data[0].companyId
      const companiesEmployees =  await get(`getAllClientsEmployees?companyId=${companyId}`, cookies.access_token)
      const filteredArray = companiesEmployees.data.filter((visitor: any) =>
        !response.data[0].visitors.some(
          (filterItem: any) =>
            filterItem.selectedVisitor.employeeId === visitor.employeeId
        )
      )
      setClientsEmployees(filteredArray)
    } catch (err) {
      console.log(err)
    }
  }

  const changeVisitsState = async (url: string) => {
    try {
      const res = await get(`${url}?visitId=${id}`, cookies.access_token)
      setVisitData(res.data)

    } catch (err) {
      console.error(err)
    }
  }


  React.useEffect(() => {
    fetchData()
  }, [id, selectedVisitors, open])


  const deleteVisitor = async(employeeId: string | undefined) => {
    if (visitData && visitData.length > 0) {
      const updatedVisitData = [...visitData]
      if (updatedVisitData[0]?.visitors) {
        updatedVisitData[0].visitors = updatedVisitData[0].visitors.filter(
          (el) => el.selectedVisitor.employeeId !== employeeId
        )
        setVisitData(updatedVisitData)
        await get(`deleteVisitor?visitId=${id}&employeeId=${employeeId}`, cookies.access_token)
      }
    }
  }

  const items: DescriptionsProps['items'] = [
    {
      key:      '1',
      label:    'Statusas',
      children: <ConfigProvider theme ={{
        components: {
          Badge: {
            statusSize: 12,
          },
        },
      }}>
        <Badge
          status={visitData?.[0]?.visitStatus}
          text={
            visitData?.[0]?.visitStatus === 'success' && 'Pradėtas' ||
            visitData?.[0]?.visitStatus === 'processing' && 'Paruoštas' ||
            visitData?.[0]?.visitStatus === 'error' && 'Baigtas'
          }/>
      </ConfigProvider>,
    },
    {
      key:      '2',
      label:    'Įmonė',
      children: visitData?.[0].visitingClient,
    },
    {
      key:      '3',
      label:    'Adresas',
      children: visitData?.[0].visitAddress,
    },
    {
      key:      '4',
      label:    'Sukūrimo data',
      children: `${visitData?.[0].creationDate} ${visitData?.[0].creationTime}`,
    },
    {
      key:      '5',
      label:    'Pradžios laikas',
      children: `${visitData?.[0].startDate || ''} ${visitData?.[0].startTime || ''}`,
    },
    {
      key:      '6',
      label:    'Pabaigos laikas',
      children: `${visitData?.[0]?.endDate || ''} ${visitData?.[0].endTime || ''}`,
    },
    {
      key:      '7',
      label:    'Lydintis asmuo',
      children: visitData?.[0].dlcEmployees,
    },
    {
      key:      '8',
      label:    'Vizito tikslas',
      children: <div>{visitData?.[0]?.visitPurpose?.map((el, i) => <p key={i}>{el}</p>)}</div>,
    },
  ]
  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchEmployeeValue(e.target.value.toLowerCase())
  }

  const identificationOptions = [
    {value: 'Pasas', label: 'Pasas'},
    {value: 'Tapatybės kortelė', label: 'Tapatybės kortelė'},
    {value: 'Darbuotojo pažymėjimas', label: 'Darbuotojo pažymėjimas'},
  ]

  const transformedArray = Object.entries(visitData?.[0]?.visitCollocation || {}).map(([key, value]) => ({
    [key]: value.map((el) => ({[el]: true})),
  }))
  return (
    <Form form={form} >
      <Descriptions style={{backgroundColor: '#f9f9f9', margin: '10px', padding: '10px'}} title='Vizito informacija' items={items} />
      <Card title={'Lankytojai'}style={{margin: '10px', backgroundColor: '#f9f9f9'}} extra={<Button onClick={() => setOpen(true)} type='link' >Pridėti Lankytoją</Button>}>
        <List
          dataSource={visitData?.[0].visitors}
          renderItem={(item) =>
            <List.Item
              actions={[
                <Select style={{width: '150px'}} defaultValue={item?.idType} options={identificationOptions}/>,
                <Button type='link' onClick={() => deleteVisitor(item.selectedVisitor.employeeId)}>Ištrinti</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={''} />}
                title={<p>{item.selectedVisitor.name} {item.selectedVisitor.lastName}</p>}
                description={item.selectedVisitor.occupation}
              />
              <div style={{width: '150px'}}>{item?.selectedVisitor?.permissions?.map((el, i) => <p key={i}>{el}</p>)}</div>
            </List.Item>
          }
        />
      </Card>
      <ItemList
        cardTitle={'Pridėti palydą'}
        inputValue={guestsImput}
        inputPlaceHolder={'Pridėti palydą'}
        setInputValue={setGuestsInput}
        list={clientsGuests}
        setListItems={setClientsGuests}
        url={'updateClientsGests'}
        removeUrl={'removeClientsGuest'}
      />
      <ItemList
        cardTitle={'Pridėti automobilį'}
        inputValue={carPlatesInput}
        inputPlaceHolder={'Pridėti automobilį'}
        setInputValue={setCarPlatesInput}
        list={carPlates}
        setListItems={setCarPlates}
        url={'updateCarPlates'}
        removeUrl={'removeCarPlates'}
      />

      <Form.List
        name='asd'
        initialValue={transformedArray}
      >
        {(fields) => {
          return fields?.map(({ key, name, ...restField }, index) => {
            const objEntries = Object.entries(transformedArray[index])
            return (
              <Card title={'Kolokacijos'} style={{margin: '10px', backgroundColor: '#f9f9f9'}} >
                <div style={{display: 'flex', justifyContent: 'space-around', height: '100%'}}>
                  {/* {transformedArray?.map((el, i) => {
                    const objEntries = Object.entries(el)
                    console.log(objEntries)
                    return(
                      <Card style={{margin: '10px'}} key={i} title={objEntries[0][0]}>
                        <Form.Item name={['visitCollocation', objEntries[0][0]]} >
                          <Checkbox.Group options={objEntries[0][1]} key={i}/>
                        </Form.Item>
                      </Card>
                    )})
                  } */}

                  <Card style={{margin: '10px'}} key={i} title={objEntries[0][0]}>
                    <Form.Item name={['visitCollocation', objEntries[0][0]]} >
                      <Checkbox.Group options={objEntries[0][1]} key={i}/>
                    </Form.Item>
                  </Card>
                </div>
              </Card>
            )
          })
        }}
      </Form.List>
      <VisitorAdditionModal
        open={open}
        clientsEmployees={clientsEmployees}
        form={form} setOpen={setOpen }
        searchEmployee={searchEmployee}
        setSelectedVisitors={setSelectedVisitors}
        searchEmployeeValue={searchEmployeeValue}
      />
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {!visitData?.[0]?.startDate && !visitData?.[0]?.startTime && (
          <Button onClick={async () => { await changeVisitsState('startVisit'); fetchData() }}>Pradėti vizitą</Button>
        )}
        {visitData?.[0]?.startDate && visitData?.[0]?.startTime && (
          <Button onClick={async () => { await changeVisitsState('prepareVisit'); fetchData() }}>Paruošti vizitą</Button>
        )}
        {visitData?.[0]?.startDate && visitData?.[0]?.startTime && !visitData?.[0]?.endDate && !visitData?.[0]?.endTime && (
          <Button onClick={async () => { await changeVisitsState('endVisit'); fetchData() }}>Baigti vizitą</Button>
        )}
      </div>
    </Form>
  )
}

export default SingleVisitPage