/* eslint-disable max-len */
import React                              from 'react'
import {  Button, Divider, Input, List }  from 'antd'
import { deleteItem, get }                from '../../../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'
import ClientsEmployeeDrawer              from './ClientsEmployeeDrawer'
import { useParams, useSearchParams }     from 'react-router-dom'
import ListItem                           from '../SubClientsTab/ListItem'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setOpenClientsEmployeesDrawer }  from '../../../../auth/ModalStateReducer/ModalStateReducer'
import HighlightText                      from '../../../UniversalComponents/HighlightText'
import { setCompaniesEmployees }          from '../../../../auth/SingleCompanyReducer/SingleCompanyReducer'


const ClientsEmployeeList = () => {
  const [cookies]                       = useCookies(['access_token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch                        = useAppDispatch()
  const employeeFilter                  = searchParams.get('employeeFilter')
  const {id}                            = useParams()
  const companiesEmployees              = useAppSelector((state) => state.singleCompany.companiesEmployees)
  const showDrawer = ( employeeId: string | undefined, companyId: number | undefined) => {
    setSearchParams(`&employeeId=${employeeId}&companyId=${companyId}`, { replace: true })
    dispatch(setOpenClientsEmployeesDrawer(true))
  }
  const employeeRemoved = (id: string) => {
    let newEmployeesList = [...companiesEmployees]
    newEmployeesList = newEmployeesList.filter(x => x?._id !== id)
    dispatch(setCompaniesEmployees(newEmployeesList))
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
    const filtered = companiesEmployees?.filter((el) => `${el.name} ${el.lastname}`.toLowerCase().includes(e.target.value.toLocaleLowerCase()))
    setSearchParams(`employeeFilter=${e.target.value.toLowerCase()}`)
    dispatch(setCompaniesEmployees(filtered))
    //todo fix old route
    if(e.target.value === ''){
      const companyEmployees  = await get(`getSingleCompaniesEmployees?companyId=${id}`, cookies.access_token)
      dispatch(setCompaniesEmployees(companyEmployees.data))
    }
  }


  return (
    <div className='EmployeeListContainer'>
      <Divider>Darbuotojai</Divider>
      <Input style={{marginBottom: '15px'}} onChange={onChange} placeholder='Ieškoti darubotojo'/>
      <List
        locale={{emptyText: 'Nėra pridėtų darbuotojų'}}
        dataSource={companiesEmployees}
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
      <ClientsEmployeeDrawer/>
    </div>
  )
}

export default ClientsEmployeeList