/* eslint-disable max-len */
import React                              from 'react'
import { Avatar, Button, Divider, List }  from 'antd'
import { EmployeesType }                  from '../../../types/globalTypes'
import { get }                            from '../../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'
import ClientsEmployeeDrawer              from './ClientsEmployeeDrawer'
import { useSearchParams } from 'react-router-dom'

type ClientsEmployeeListProps = {
  companyName:            string | undefined;
  list:                   EmployeesType[] | undefined
  employeeRemoved:         (id: string) => void
  setEditClientsEmployee: React.Dispatch<React.SetStateAction<boolean>>
  editClientsEmployee:    boolean
}

const ClientsEmployeeList = ({ list, companyName, employeeRemoved}: ClientsEmployeeListProps) => {
  const [cookies] =                           useCookies(['access_token'])
  const [open, setOpen] =                     React.useState(false)
  const [, setSearchParams] =     useSearchParams()
  const showDrawer = (employee: EmployeesType) => {
    setSearchParams(`&employeeId=${employee.employeeId}&companyId=${employee.companyId}`, { replace: true })
    setOpen(true)
  }

  const deleteEmployee = async(companyId: string | undefined, employeeId: string | undefined) => {
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
          <List.Item
            key={item.employeeId}
            actions={[
              <Button type='link' onClick={() => showDrawer(item)} key={item.employeeId}>
                Peržiūrėti
              </Button>,
              <Button type='link' onClick={() => deleteEmployee(item?.companyId, item?.employeeId)} key={item.employeeId}>
                    Ištrinti
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src={
                  <img
                    src={`../ClientsEmployeesPhotos/${item.employeePhoto ? item.employeePhoto : 'noUserImage.jpeg'}`}
                    alt='err' />}
                />}
              title={<p>{`${item.name} ${item.lastName}`}</p>}
              description={item.occupation}

            />
          </List.Item>
        )}
      />
      { open &&
        <ClientsEmployeeDrawer
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
