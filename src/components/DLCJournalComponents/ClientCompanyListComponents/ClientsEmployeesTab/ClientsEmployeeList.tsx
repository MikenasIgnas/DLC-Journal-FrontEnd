/* eslint-disable max-len */
import React                              from 'react'
import {  Button, Divider, Input, List }  from 'antd'
import { get }                            from '../../../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'
import ClientsEmployeeDrawer              from './ClientsEmployeeDrawer'
import { useParams, useSearchParams }                from 'react-router-dom'
import ListItem                           from '../SubClientsTab/ListItem'
import { useAppDispatch }                 from '../../../../store/hooks'
import { setOpenClientsEmployeesDrawer }  from '../../../../auth/ModalStateReducer/ModalStateReducer'
import HighlightText                      from '../../../UniversalComponents/HighlightText'

type EmployeesType = {
  _id:            string;
  companyId:      number;
  name:           string;
  lastName:       string;
  occupation:     string;
  employeeId:     number;
  permissions:    string[];
  employeePhoto:  string
}

type ClientsEmployeeListProps = {
  companyName:            string | undefined;
  list:                   EmployeesType[]
  employeeRemoved:        (id: number) => void
  setEditClientsEmployee: React.Dispatch<React.SetStateAction<boolean>>
  editClientsEmployee:    boolean
  setEmployeesList:       React.Dispatch<React.SetStateAction<EmployeesType[]>>
}

const ClientsEmployeeList = ({ list, companyName, employeeRemoved, setEditClientsEmployee, editClientsEmployee, setEmployeesList}: ClientsEmployeeListProps) => {
  const [cookies]           = useCookies(['access_token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch            = useAppDispatch()
  const employeeFilter = searchParams.get('employeeFilter')
  const {id} = useParams()
  const showDrawer = ( employeeId: number | undefined, companyId: number | undefined) => {
    setSearchParams(`&employeeId=${employeeId}&companyId=${companyId}`, { replace: true })
    dispatch(setOpenClientsEmployeesDrawer(true))
  }

  const deleteEmployee = async(employeeId: number | undefined, companyId: number | undefined) => {
    if(companyId && employeeId){
      await get(`deleteClientsEmployee?companyName=${companyName}&companyId=${companyId}&employeeId=${employeeId}`, cookies.access_token)
      employeeRemoved(employeeId)
    }
  }
  const listButtons = (listItemId: number | undefined, primaryKey: number | undefined) => {
    const buttons = [
      <Button type='link' onClick={() => showDrawer(listItemId, primaryKey)} key={primaryKey}>Peržiūrėti</Button>,
      <Button type='link' onClick={() => deleteEmployee(listItemId, primaryKey)} key={primaryKey}>Ištrinti</Button>,
    ]
    return buttons
  }

  const onChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const filtered = list?.filter((el) => el.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()) )
    setSearchParams(`employeeFilter=${e.target.value.toLowerCase()}`)
    setEmployeesList(filtered)
    if(e.target.value === ''){
      setSearchParams('')
      const companyEmployees  = await get(`getSingleCompaniesEmployees?companyId=${id}`, cookies.access_token)
      setEmployeesList(companyEmployees.data)
    }
  }


  return (
    <div className='EmployeeListContainer'>
      <Divider>Darbuotojai</Divider>
      <Input onChange={onChange} placeholder='Ieškoti darubotojo'/>
      <List
        dataSource={list}
        bordered
        pagination={{
          pageSize: 10,
        }}
        renderItem={(item) => (
          <ListItem
            listItemId={item.employeeId}
            primaryKey={item.companyId}
            photo={item.employeePhoto}
            listButtons={listButtons}
            title={HighlightText(employeeFilter, `${item.name}`)}
            description={item.occupation}
            photosFolder={'../ClientsEmployeesPhotos'}
            altImage={'noUserImage.jpeg'}
          />
        )}
      />
      <ClientsEmployeeDrawer
        setEditClientsEmployee={setEditClientsEmployee}
        editClientsEmployee={editClientsEmployee}
        companyName={companyName}
      />
    </div>
  )
}

export default ClientsEmployeeList