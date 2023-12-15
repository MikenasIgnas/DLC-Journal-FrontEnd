/* eslint-disable max-len */
import React                 from 'react'
import {  Button, Divider, List }    from 'antd'
import { EmployeesType }     from '../../../../types/globalTypes'
import { get }               from '../../../../Plugins/helpers'
import { useCookies }        from 'react-cookie'
import ClientsEmployeeDrawer from './ClientsEmployeeDrawer'
import { useSearchParams }   from 'react-router-dom'
import ListItem              from '../SubClientsTab/ListItem'
import { useAppDispatch } from '../../../../store/hooks'
import { setOpenClientsEmployeesDrawer } from '../../../../auth/ModalStateReducer/ModalStateReducer'

type ClientsEmployeeListProps = {
  companyName:            string | undefined;
  list:                   EmployeesType[] | undefined
  employeeRemoved:        (id: number) => void
  setEditClientsEmployee: React.Dispatch<React.SetStateAction<boolean>>
  editClientsEmployee:    boolean
}

const ClientsEmployeeList = ({ list, companyName, employeeRemoved, setEditClientsEmployee, editClientsEmployee}: ClientsEmployeeListProps) => {
  const [cookies]           = useCookies(['access_token'])
  const [, setSearchParams] = useSearchParams()
  const dispatch            = useAppDispatch()
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

  return (
    <div className='EmployeeListContainer'>
      <Divider>Darbuotojai</Divider>
      <List
        dataSource={list}
        bordered
        renderItem={(item) => (
          <ListItem
            listItemId={item.employeeId}
            primaryKey={item.companyId}
            photo={item.employeePhoto}
            listButtons={listButtons}
            title={`${item.name} ${item.lastName}`}
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