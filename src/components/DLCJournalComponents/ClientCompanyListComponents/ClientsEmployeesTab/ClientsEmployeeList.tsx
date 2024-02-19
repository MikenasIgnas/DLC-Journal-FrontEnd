/* eslint-disable max-len */
import React                              from 'react'
import {
  Button,
  Divider,
  Input,
  List,
  message,
}                                         from 'antd'
import {
  deleteItem,
  get,
}                                         from '../../../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'
import {
  useParams,
  useSearchParams,
}                                         from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
}                                         from '../../../../store/hooks'
import { setOpenClientsEmployeesDrawer }  from '../../../../auth/ModalStateReducer/ModalStateReducer'
import { setCompaniesEmployees }          from '../../../../auth/SingleCompanyReducer/SingleCompanyReducer'
import ClientsEmployeeDrawer              from './ClientsEmployeeDrawer'
import HighlightText                      from '../../../UniversalComponents/HighlightText'
import EmployeesListItem                  from './EmployeesListItem'
import SuccessMessage                     from '../../../UniversalComponents/SuccessMessage'


const ClientsEmployeeList = () => {
  const [cookies]                       = useCookies(['access_token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch                        = useAppDispatch()
  const employeeFilter                  = searchParams.get('employeeFilter')
  const {id}                            = useParams()
  const companiesEmployees              = useAppSelector((state) => state.singleCompany.companiesEmployees)
  const siteId                          = searchParams.get('siteId')
  const tabKey                          = searchParams.get('tabKey')
  const loading                         = useAppSelector((state) => state.singleCompany.loading)
  const [messageApi, contextHolder]     = message.useMessage()

  const showDrawer = ( employeeId: string | undefined, companyId: number | undefined) => {
    setSearchParams(`&employeeId=${employeeId}&companyId=${companyId}&siteId=${siteId}&tabKey=${tabKey}`)
    dispatch(setOpenClientsEmployeesDrawer(true))
  }

  const employeeRemoved = (id: string) => {
    let newEmployeesList = [...companiesEmployees]
    newEmployeesList = newEmployeesList.filter(x => x?._id !== id)
    dispatch(setCompaniesEmployees(newEmployeesList))
  }

  const deleteEmployee = async(employeeId: string | undefined) => {
    if(employeeId){
      try{
        await deleteItem('company/CompanyEmployee', {id: employeeId},cookies.access_token)
        employeeRemoved(employeeId)
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
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
    if(e.target.value === ''){
      try{
        const companyEmployees  = await get(`company/CompanyEmployee?id=${id}`, cookies.access_token)
        dispatch(setCompaniesEmployees(companyEmployees))
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    }
  }

  return (
    <div className='EmployeeListContainer'>
      <Divider>Darbuotojai</Divider>
      <Input style={{marginBottom: '15px'}} onChange={onChange} placeholder='Ieškoti darubotojo'/>
      <List
        loading={loading}
        locale={{emptyText: 'Nėra pridėtų darbuotojų'}}
        dataSource={companiesEmployees}
        bordered
        pagination={{
          pageSize: 10,
          position: 'bottom',
          align:    'center',
        }}
        renderItem={(item) => (
          <EmployeesListItem id={item._id}
            listButtons={() => listButtons(item._id, item.companyId)}
            title={HighlightText(employeeFilter, `${item.name} ${item.lastname}`)}
            photosFolder={'../ClientsEmployeesPhotos'}
            altImage={'noUserImage.jpeg'}
            item={item}
          />
        )}
      />
      <ClientsEmployeeDrawer/>
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default ClientsEmployeeList