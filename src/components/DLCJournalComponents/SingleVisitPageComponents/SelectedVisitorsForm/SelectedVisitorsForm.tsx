/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                        from 'react'
import RegisteredVisitorsListItemCardTitle          from '../RegisteredVisitorsListItemCardTitle'
import RegisteredVisitorsListItem                   from '../RegisteredVisitorsListItem'
import { Button, Card, Form, List }                 from 'antd'
import { useParams }                                from 'react-router'
import { useAppDispatch, useAppSelector }           from '../../../../store/hooks'
import { get, post }                                from '../../../../Plugins/helpers'
import { setEditVisitors, setOpenVisitorAddition }  from '../../../../auth/SingleVisitPageEditsReducer/SingleVisitPageEditsReducer'
import VisitorAdditionList                          from '../../VisitiRegistrationComponents/VisitorAdditionList'
import { useCookies }                               from 'react-cookie'
import { EmployeesType, VisitsType }                from '../../../../types/globalTypes'


type SelectedVisitorsFormProps = {
  visitData:            VisitsType[] | undefined
  setVisitData:         React.Dispatch<React.SetStateAction<VisitsType[] | undefined>>
  setSelectedVisitors:  React.Dispatch<React.SetStateAction<number[]>>
  fetchData:            () => Promise<void>
  clientsEmployees:     EmployeesType[] | undefined
}

const SelectedVisitorsForm = ({ visitData, setVisitData, setSelectedVisitors, fetchData, clientsEmployees }: SelectedVisitorsFormProps) => {
  const [form]                                          = Form.useForm()
  const {id}                                            = useParams()
  const [cookies]                                       = useCookies(['access_token'])
  const editVisitors                                    = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const dispatch                                        = useAppDispatch()
  const [searchEmployeeValue, setSearchEmployeeValue]   = React.useState<string | undefined>()

  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchEmployeeValue(e.target.value.toLowerCase())
  }

  const addVisitor = (id: number) => {
    setSelectedVisitors((prev) => prev.includes(id) ? prev : [...prev, id])
  }

  const saveChanges = async(values: any) => {
    dispatch(setEditVisitors(!editVisitors))
    if(editVisitors){
      const updateIdTypes = visitData?.[0].visitors.map((el, i) => ({
        idType:          values?.visitors[i]?.idType,
        selectedVisitor: el.selectedVisitor,
      }))
      values.visitors = updateIdTypes
      await post(`updateVisitInformation?visitId=${id}`, values, cookies.access_token)
      await fetchData()
    }
  }

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

  const onkeydown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  const openVisitorAddition = useAppSelector((state) => state.visitPageEdits.openVisitorAddition)
  return (
    <Form form={form} onFinish={saveChanges} onKeyDown={onkeydown}>
      { openVisitorAddition &&
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
        title={<RegisteredVisitorsListItemCardTitle/>} style={{margin: '10px', backgroundColor: '#f9f9f9'}}
        extra={<Button onClick={() => dispatch(setOpenVisitorAddition(true))} type='link' >Pridėti Lankytoją</Button>}>
        <List
          dataSource={visitData?.[0].visitors}
          renderItem={(item, i) =>
            <RegisteredVisitorsListItem
              signature={item.signature}
              idType={item.idType}
              employeeId={item.selectedVisitor.employeeId}
              name={item.selectedVisitor.name}
              lastName={item.selectedVisitor.lastname}
              occupation={item.selectedVisitor.occupation}
              permissions={item.selectedVisitor.permissions}
              deleteVisitor={deleteVisitor}
              employeePhoto={item.selectedVisitor.photo}
              index={i}
            />
          }
        />
      </Card>
    </Form>
  )
}

export default SelectedVisitorsForm