/* eslint-disable max-len */
import React                              from 'react'
import {  Button, Divider, Input, List }  from 'antd'
import { deleteItem, get }                from '../../../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'
import ClientsEmployeeDrawer              from './ClientsEmployeeDrawer'
import { useParams, useSearchParams }     from 'react-router-dom'
import ListItem                           from '../SubClientsTab/ListItem'
import { useAppDispatch }                 from '../../../../store/hooks'
import { setOpenClientsEmployeesDrawer }  from '../../../../auth/ModalStateReducer/ModalStateReducer'
import HighlightText                      from '../../../UniversalComponents/HighlightText'
import { EmployeesType } from '../../../../types/globalTypes'


type ClientsEmployeeListProps = {
  companyName:            string | undefined;
  list:                   EmployeesType[]
  employeeRemoved:        (id: string) => void
  setEditClientsEmployee: React.Dispatch<React.SetStateAction<boolean>>
  editClientsEmployee:    boolean
  setEmployeesList:       React.Dispatch<React.SetStateAction<EmployeesType[]>>
}

const ClientsEmployeeList = ({ list, companyName, employeeRemoved, setEditClientsEmployee, editClientsEmployee, setEmployeesList}: ClientsEmployeeListProps) => {
  const [cookies]                       = useCookies(['access_token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch                        = useAppDispatch()
  const employeeFilter                  = searchParams.get('employeeFilter')
  const {id}                            = useParams()

  const showDrawer = ( employeeId: string | undefined, companyId: number | undefined) => {
    setSearchParams(`&employeeId=${employeeId}&companyId=${companyId}`, { replace: true })
    dispatch(setOpenClientsEmployeesDrawer(true))
  }

  const deleteEmployee = async(employeeId: string | undefined) => {
    if(employeeId){
      await deleteItem('company/CompanyEmployee', {id: employeeId},cookies.access_token)
      employeeRemoved(employeeId)
    }
  }

  const listButtons = (listItemId: string | undefined, companyId: string | undefined) => {
    const buttons = [
      <div key={listItemId} className='ListItemButtons'>
        <Button type='link' onClick={() => showDrawer(listItemId, Number(companyId))} >Peržiūrėti</Button>
        <Button type='link' onClick={() => deleteEmployee(listItemId)} >Ištrinti</Button>
      </div>,
    ]
    return buttons
  }

  const onChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const filtered = list?.filter((el) => `${el.name} ${el.lastname}`.toLowerCase().includes(e.target.value.toLocaleLowerCase()))
    setSearchParams(`employeeFilter=${e.target.value.toLowerCase()}`)
    setEmployeesList(filtered)
    if(e.target.value === ''){
      const companyEmployees  = await get(`getSingleCompaniesEmployees?companyId=${id}`, cookies.access_token)
      setEmployeesList(companyEmployees.data)
    }
  }


  return (
    <div className='EmployeeListContainer'>
      <Divider>Darbuotojai</Divider>
      <Input style={{marginBottom: '15px'}} onChange={onChange} placeholder='Ieškoti darubotojo'/>
      <List
        locale={{emptyText: 'Nėra pridėtų darbuotojų'}}
        dataSource={list}
        bordered
        pagination={{
          pageSize: 10,
          position: 'bottom',
          align:    'center',
        }}
        renderItem={(item) => (
          <ListItem
            id={item._id}
            listButtons={() => listButtons(item._id, item.companyId)}
            title={HighlightText(employeeFilter, `${item.name} ${item.lastname}`)}
            photosFolder={'../ClientsEmployeesPhotos'}
            altImage={'noUserImage.jpeg'} item={item}
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