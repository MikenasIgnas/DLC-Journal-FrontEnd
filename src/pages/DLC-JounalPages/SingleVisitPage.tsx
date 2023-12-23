/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
// /* eslint-disable max-len */
import React                                                    from 'react'
import { useParams, useSearchParams }                           from 'react-router-dom'
import { Button, Card, Form, List }                             from 'antd'
import { Descriptions }                                         from 'antd'
import { useCookies }                                           from 'react-cookie'
import { convertUTCtoLocalTime, get, post }                     from '../../Plugins/helpers'
import { CollocationType, EmployeesType, UserType, VisitsType } from '../../types/globalTypes'
import ItemList                                                 from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ItemList'
import CollocationsList                                         from '../../components/DLCJournalComponents/VisitiRegistrationComponents/CollocationsList'
import SelectedCollocationList                                  from '../../components/DLCJournalComponents/SingleVisitPageComponents/SelectedCollocationList'
import RegisteredVisitorsListItem                               from '../../components/DLCJournalComponents/SingleVisitPageComponents/RegisteredVisitorsListItem'
import VisitorAdditionList                                      from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitorAdditionList'
import filterPermisions                                         from '../../components/DLCJournalComponents/VisitiRegistrationComponents/filterPermisions'
import VisitInformationItems                                    from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitInformationItems'
import VisitDescriptionTitle                                    from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitDescriptionTitle'
import SuccessMessage                                           from '../../components/UniversalComponents/SuccessMessage'
import useVisitValidation                                       from '../../components/DLCJournalComponents/SingleVisitPageComponents/useVisitValidation'

const SingleVisitPage = () => {
  const [cookies]                                             = useCookies(['access_token'])
  const [visitData, setVisitData]                             = React.useState<VisitsType[]>()
  const [openVisitorAddition, setOpenVisitorAddition]         = React.useState(false)
  const [clientsEmployees, setClientsEmployees]               = React.useState<EmployeesType[]>()
  const { id }                                                = useParams()
  const [selectedVisitors, setSelectedVisitors]               = React.useState<number[]>([])
  const [guestsImput, setGuestsInput]                         = React.useState<string>('')
  const [carPlatesInput, setCarPlatesInput]                   = React.useState<string>('')
  const [form]                                                = Form.useForm()
  const [searchEmployeeValue, setSearchEmployeeValue]         = React.useState<string | undefined>()
  const [clientsGuests, setClientsGuests]                     = React.useState<string[]>([])
  const [carPlates, setCarPlates]                             = React.useState<string[]>([])
  const [edit, setEdit]                                       = React.useState(false)
  const [companiesColocations, setCompaniesCollocations]      = React.useState<CollocationType[]>()
  const [updatedTransformedArray, setUpdatedTransformedArray] = React.useState<CollocationType[]>()
  const [dlcEmployees, setDlcEmployees]                       = React.useState<UserType[]>()
  const [searchParams]                                        = useSearchParams()
  const visitAddress                                          = searchParams.get('visitAddress')
  const canBringCompany                                       = filterPermisions(visitData?.[0].visitors).includes('Įleisti Trečius asmenis')
  const items                                                 = VisitInformationItems(visitData, edit, dlcEmployees)
  const {validate, contextHolder}                             = useVisitValidation()
  const [checkedList, setCheckedList]                         = React.useState<{ [key: string]: string[] }>({})
  const fetchData = async () => {
    try {
      const singleVisit   = await get(`getSingleVisit?visitId=${id}`, cookies.access_token)
      const dlcEmployees  = await get('getAllUsers', cookies.access_token)
      setVisitData(singleVisit.data)
      setCarPlates(singleVisit.data[0]?.carPlates)
      setClientsGuests(singleVisit.data[0]?.clientsGuests)
      setDlcEmployees(dlcEmployees.data)
      const companyId = singleVisit.data[0]?.companyId
      const singleCompany = await get(`getSingleCompany?companyId=${companyId}`, cookies.access_token)
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

  React.useEffect(() => {
    fetchData()
  }, [open, selectedVisitors, edit, visitAddress])

  const removeVisitor = (id: number) => {
    setSelectedVisitors((prev) => prev.filter((el) => el !== id))
  }

  const deleteVisitor = async(employeeId: number | undefined) => {
    if (visitData) {
      const updatedVisitData = [...visitData]
      if (updatedVisitData[0]?.visitors) {
        updatedVisitData[0].visitors = updatedVisitData[0].visitors.filter(
          (el) => el.selectedVisitor.employeeId !== employeeId
        )
        setVisitData(updatedVisitData)
        removeVisitor(Number(employeeId))
        await get(`deleteVisitor?visitId=${id}&employeeId=${employeeId}`, cookies.access_token)
      }
    }
  }

  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchEmployeeValue(e.target.value.toLowerCase())
  }

  const saveChanges = async (values: any) => {
    setEdit(!edit)
    if(edit){
      const updateIdTypes = visitData?.[0].visitors.map((el, i) => ({
        idType:          values.visitors[i].idType,
        selectedVisitor: el.selectedVisitor,
      }))
      values.visitors = updateIdTypes

      values.visitCollocation = checkedList
      values.startDate = values?.startDate?.format('YYYY-MM-DD')
      values.endDate = values?.endDate?.format('YYYY-MM-DD')
      const localStartTime = convertUTCtoLocalTime(values?.startTime)
      const localEndTime = convertUTCtoLocalTime(values?.endTime)
      values.startTime = localStartTime
      values.endTime = localEndTime
      await post(`updateVisitInformation?visitId=${id}`, values, cookies.access_token)
      await fetchData()
    }
  }

  const filteredArray = updatedTransformedArray?.filter(obj => {
    return Object.values(obj).some(value => Array.isArray(value) && value.length > 0)
  })

  const addVisitor = (id: number) => {
    setSelectedVisitors((prev) => prev.includes(id) ? prev : [...prev, id])
  }

  const startVisit = async() => {
    validate(visitData, edit, fetchData, 'startVisit', 'Vizitas Pradėtas!')
  }
  const endVisit = async() => {
    validate(visitData, edit, fetchData, 'endVisit', 'Vizitas Baigtas!')
  }

  const prepareVisit = async() => {
    try {
      const res = await get(`prepareVisit?visitId=${id}`, cookies.access_token)
      setVisitData(res.data)
      await fetchData()
    } catch (err) {
      console.error(err)
    }
  }
  const onkeydown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }
  return (
    <Form form={form} onFinish={saveChanges} onKeyDown={onkeydown}>
      <Descriptions
        style={{backgroundColor: '#f9f9f9', margin: '10px', padding: '10px'}}
        title={<VisitDescriptionTitle edit={edit}/>}
        items={items}
      />
      {openVisitorAddition && clientsEmployees && clientsEmployees?.length > 0 &&
      <VisitorAdditionList
        setOpenVisitorAddition={setOpenVisitorAddition}
        clientsEmployees={clientsEmployees}
        searchEmployee={searchEmployee}
        searchEmployeeValue={searchEmployeeValue}
        addVisitor={addVisitor}
        removeVisitor={removeVisitor}
      />
      }
      <Card
        title={'Lankytojai'}style={{margin: '10px', backgroundColor: '#f9f9f9'}}
        extra={<Button onClick={() => setOpenVisitorAddition(true)} type='link' >Pridėti Lankytoją</Button>}>
        <List
          dataSource={visitData?.[0].visitors}
          renderItem={(item, i) =>
            <RegisteredVisitorsListItem
              signature={item.signature}
              edit={edit}
              idType={item.idType}
              employeeId={item.selectedVisitor.employeeId}
              name={item.selectedVisitor.name}
              lastName={item.selectedVisitor.lastName}
              occupation={item.selectedVisitor.occupation}
              permissions={item.selectedVisitor.permissions}
              deleteVisitor={deleteVisitor}
              employeePhoto={item.selectedVisitor.employeePhoto}
              index={i}
            />
          }
        />
      </Card>
      {!edit ?
        <SelectedCollocationList
          selectedCollocations={filteredArray}
          edit={edit}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
        /> :
        <CollocationsList companiesColocations={companiesColocations} setCheckedList={setCheckedList} checkedList={checkedList} />

      }
      {canBringCompany ?
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
        : <div className='ErrorText'>Negali būti palydos</div>
      }
      {
        visitData?.[0].visitAddress === 'T72' &&
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
      }
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: '30%', display: 'flex', justifyContent: 'space-around'}}>
          {!visitData?.[0]?.startDate && !visitData?.[0]?.startTime && (
            <Button onClick={startVisit}>Pradėti Vizitą</Button>
          )}
          {visitData?.[0]?.startDate && visitData?.[0]?.startTime && (
            <Button onClick={prepareVisit}>Paruošti Vizitą</Button>
          )}
          {visitData?.[0]?.startDate && visitData?.[0]?.startTime && !visitData?.[0]?.endDate && !visitData?.[0]?.endTime && (
            <Button onClick={endVisit}>Baigti Vizitą</Button>
          )}
        </div>
      </div>
      <SuccessMessage contextHolder={contextHolder}/>
    </Form>
  )
}

export default SingleVisitPage