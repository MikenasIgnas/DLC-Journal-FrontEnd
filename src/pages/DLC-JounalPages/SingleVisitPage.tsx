/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
// /* eslint-disable max-len */
import React                                   from 'react'
import { useParams, useSearchParams }          from 'react-router-dom'
import { Button, Card, Form, List, Select }    from 'antd'
import { Badge, ConfigProvider, Descriptions } from 'antd'
import type { DescriptionsProps }              from 'antd'
import { useCookies }                          from 'react-cookie'
import { get, post }                           from '../../Plugins/helpers'
import { EmployeesType, UserType }             from '../../types/globalTypes'
import VisitorAdditionModal                    from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitorAdditionModal'
import ItemList                                from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ItemList'
import CollocationsList                        from '../../components/DLCJournalComponents/VisitiRegistrationComponents/CollocationsList'
import VisitDateItem                           from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitDateItem'
import SelectedCollocationList                 from '../../components/DLCJournalComponents/VisitiRegistrationComponents/SelectedCollocationList'
import RegisteredVisitorsListItem              from '../../components/DLCJournalComponents/VisitiRegistrationComponents/RegisteredVisitorsListItem'

type CollocationType = {
  [key:string] :  string[]
}

type VisitStatusType = 'success' | 'processing' | 'error' | 'default' | 'warning' | undefined;

type VisitorsType = {
  idType:          string;
  signature:       string;
  selectedVisitor: EmployeesType
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

type CollocationsType = {
  [key: string]: string[];
}

const SingleVisitPage = () => {
  const [cookies]                                             = useCookies(['access_token'])
  const [visitData, setVisitData]                             = React.useState<VisitsType[]>()
  const [open, setOpen]                                       = React.useState(false)
  const [clientsEmployees, setClientsEmployees]               = React.useState<EmployeesType[]>()
  const { id }                                                = useParams()
  const [selectedVisitors, setSelectedVisitors]               = React.useState<EmployeesType[]>()
  const [guestsImput, setGuestsInput]                         = React.useState<string>('')
  const [carPlatesInput, setCarPlatesInput]                   = React.useState<string>('')
  const [form]                                                = Form.useForm()
  const [searchEmployeeValue, setSearchEmployeeValue]         = React.useState<string | undefined>()
  const [clientsGuests, setClientsGuests]                     = React.useState<string[]>([])
  const [carPlates, setCarPlates]                             = React.useState<string[]>([])
  const [edit, setEdit]                                       = React.useState(false)
  const [companiesColocations, setCompaniesCollocations]      = React.useState<CollocationsType[]>()
  const [updatedTransformedArray, setUpdatedTransformedArray] = React.useState<CollocationType[]>()
  const [dlcEmployees, setDlcEmployees]                       = React.useState<UserType[]>()
  const [searchParams, setSearchParams]                       = useSearchParams()
  const visitAddress                                          = searchParams.get('visitAddress')

  const addresses = [
    {
      value: 'J13',
      label: 'J13',
    },
    {
      value: 'T72',
      label: 'T72',
    },
  ]

  const fetchData = async () => {
    try {
      const singleVisit = await get(`getSingleVisit/${id}`, cookies.access_token)
      const dlcEmployees  = await get('getAllUsers', cookies.access_token)
      setVisitData(singleVisit.data)
      setCarPlates(singleVisit.data[0]?.carPlates)
      setDlcEmployees(dlcEmployees.data)
      const companyId = singleVisit.data[0]?.companyId
      const singleCompany = await get(`SingleCompanyPage/${companyId}`, cookies.access_token)
      const updatedArray: CollocationType[] = (Object.entries(singleVisit.data?.[0]?.visitCollocation || {}) as [string, string[]][])
        .map(([key, value]) => ({
          [key]: value,
        }))
      setUpdatedTransformedArray(updatedArray)
      if(visitAddress === 'J13'){
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.J13)
      }else{
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.T72)
      }
      const companiesEmployees =  await get(`getAllClientsEmployees?companyId=${companyId}`, cookies.access_token)
      const filteredArray = companiesEmployees.data.filter((visitor: any) =>
        !singleVisit.data[0].visitors.some(
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
  }, [open, selectedVisitors, edit, visitAddress])

  const permissions = visitData?.[0].visitors?.flatMap((el) => el.selectedVisitor.permissions)
  const uniquePermissions = permissions?.filter((permission, index, arr) => arr.indexOf(permission) === index)
    .map((permission) => ({ label: permission, value: permission }))

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

  const DLCEmployees = dlcEmployees?.map((el) => {
    return {...el, value: el.username, label: el.username}
  })

  const changeAddress = async(value:string) => {
    setSearchParams(`visitAddress=${value}`)
    await fetchData()
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
      children: visitData?.[0]?.visitingClient,
    },
    {
      key:      '3',
      label:    'Adresas',
      children: <div>
        {!edit ?
          <div>{visitData?.[0].visitAddress}</div> :
          <Form.Item name='visitAddress' initialValue={visitData?.[0].visitAddress}>
            <Select onChange={changeAddress} value={visitData?.[0].visitAddress} style={{width: '150px'}} options={addresses}/>
          </Form.Item>
        }
      </div>,
    },
    {
      key:      '4',
      label:    'Sukūrimo data',
      children: `${visitData?.[0].creationDate} ${visitData?.[0].creationTime}`,
    },
    {
      key:      '5',
      label:    'Pradžios laikas',
      children: <VisitDateItem dateFormItemName='startDate' timeFormItemName='startTime' edit={edit} date={visitData?.[0].startDate} time={visitData?.[0].startTime}/>,

    },
    {
      key:      '6',
      label:    'Pabaigos laikas',
      children: <VisitDateItem dateFormItemName='endDate' timeFormItemName='endTime' edit={edit} date={visitData?.[0]?.endDate} time={visitData?.[0].endTime}/>,
    },
    {
      key:   '7',
      label: 'Lydintis asmuo',
      children:
      <div>
        {!edit ?
          <div>{visitData?.[0].dlcEmployees}</div> :
          <Form.Item name='dlcEmployees' initialValue={visitData?.[0].dlcEmployees}>
            <Select
              value={visitData?.[0].dlcEmployees}
              style={{width: '200px'}}
              options={DLCEmployees}/>
          </Form.Item>
        }
      </div>,
    },
    {
      key:      '8',
      label:    'Vizito tikslas',
      children: <div>
        {!edit ?
          <div>{visitData?.[0]?.visitPurpose?.map((el, i) => <p key={i}>{el}</p>)}</div> :
          <Form.Item name='visitPurpose' initialValue={visitData?.[0]?.visitPurpose}>
            <Select
              mode='multiple'
              style={{width: '250px'}}
              value={visitData?.[0]?.visitPurpose}
              options={uniquePermissions}/>
          </Form.Item>
        }
      </div>,
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

  const saveChanges = async (values: any) => {
    setEdit(!edit)
    if(edit){
      const updateIdTypes = visitData?.[0].visitors.map((el, i) => ({
        idType:          values.visitors[i].idType,
        selectedVisitor: el.selectedVisitor,
      }))
      values.startDate = values?.startDate?.format('YYYY/MM/DD')
      values.startTime = values?.startTime?.format('HH:mm')
      values.visitors = updateIdTypes
      await post(`updateVisitInformation?visitId=${id}`, values, cookies.access_token)
      await fetchData()
    }
  }

  const filteredArray = updatedTransformedArray?.filter(obj => {
    return Object.values(obj).some(value => Array.isArray(value) && value.length > 0)
  })

  return (
    <Form form={form} onFinish={saveChanges}>
      <Descriptions
        style={{backgroundColor: '#f9f9f9', margin: '10px', padding: '10px'}}
        title={
          <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <div>Vizito informacija</div>
            <Button htmlType='submit'>{!edit ? 'Edit' : 'Save'}</Button>
          </div>} items={items}
      />
      <Card
        title={'Lankytojai'}style={{margin: '10px', backgroundColor: '#f9f9f9'}}
        extra={<Button onClick={() => setOpen(true)} type='link' >Pridėti Lankytoją</Button>}>
        <List
          dataSource={visitData?.[0].visitors}
          renderItem={(item, i) =>
            <RegisteredVisitorsListItem
              signature={item.signature}
              edit={edit}
              idType={item.idType}
              identificationOptions={identificationOptions}
              employeeId={item.selectedVisitor.employeeId}
              name={item.selectedVisitor.name}
              lastName={item.selectedVisitor.lastName}
              occupation={item.selectedVisitor.occupation}
              permissions={item.selectedVisitor.permissions}
              deleteVisitor={deleteVisitor}
              index={i}
            />
          }
        />
      </Card>
      {!edit ?
        <SelectedCollocationList
          selectedCollocations={filteredArray}
          edit={edit}
        /> :
        <CollocationsList companiesColocations={companiesColocations}
        />
      }
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