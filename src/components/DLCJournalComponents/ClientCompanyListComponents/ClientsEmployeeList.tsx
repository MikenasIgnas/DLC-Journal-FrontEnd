/* eslint-disable max-len */
import React                  from 'react'
import {  Divider, List }     from 'antd'
import { EmployeesType }      from '../../../types/globalTypes'
import { get }                from '../../../Plugins/helpers'
import { useCookies }         from 'react-cookie'
import ClientsEmployeeDrawer  from './ClientsEmployeeDrawer'
import { useSearchParams }    from 'react-router-dom'
import ListItem               from './ListItem'

type ClientsEmployeeListProps = {
  companyName:            string | undefined;
  list:                   EmployeesType[] | undefined
  employeeRemoved:        (id: string) => void
  setEditClientsEmployee: React.Dispatch<React.SetStateAction<boolean>>
  editClientsEmployee: boolean

}

const ClientsEmployeeList = ({ list, companyName, employeeRemoved, setEditClientsEmployee, editClientsEmployee}: ClientsEmployeeListProps) => {
  const [cookies] =                           useCookies(['access_token'])
  const [open, setOpen] =                     React.useState(false)
  const [, setSearchParams] =     useSearchParams()
  const showDrawer = ( employeeId: string | undefined, companyId: string | undefined) => {
    setSearchParams(`&employeeId=${employeeId}&companyId=${companyId}`, { replace: true })
    setOpen(true)
  }

  const deleteEmployee = async(employeeId: string | undefined, companyId: string | undefined) => {
    if(companyId && employeeId){
      await get(`deleteClientsEmployee?companyName=${companyName}&companyId=${companyId}&employeeId=${employeeId}`, cookies.access_token)
      employeeRemoved(employeeId)
    }
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div style={{width: '49%'}}>
      <Divider>Darbuotojai</Divider>
      <List
        dataSource={list}
        bordered
        renderItem={(item) => (
          <ListItem
            showDrawer={showDrawer}
            deleteListItem={deleteEmployee}
            listItemId={item.employeeId}
            employeeId={item.companyId}
            photo={item.employeePhoto}
            title={`${item.name} ${item.lastName}`}
            description={item.occupation}
            photosFolder={'ClientsEmployeesPhotos'}
            altImage={'noUserImage.jpeg'}
          />
        )}
      />
      { open &&
        <ClientsEmployeeDrawer
          setEditClientsEmployee={setEditClientsEmployee}
          editClientsEmployee={editClientsEmployee}
          companyName={companyName}
          onClose={onClose}
          open={open}
          setOpen={setOpen}
        />
      }
    </div>
  )
}

export default ClientsEmployeeList
