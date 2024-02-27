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
}                                         from '../../../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'
import {
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
import useDelay from '../../../../Plugins/useDelay'


const ClientsEmployeeList = () => {
  const [cookies]                       = useCookies(['access_token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch                        = useAppDispatch()
  const search                            = searchParams.get('search')
  const companiesEmployees              = useAppSelector((state) => state.singleCompany.companiesEmployees)
  const siteId                          = searchParams.get('siteId')
  const tabKey                          = searchParams.get('tabKey')
  const loading                         = useAppSelector((state) => state.singleCompany.loading)
  const [messageApi, contextHolder]     = message.useMessage()
  const page                            = searchParams.get('page')
  const companyEmployeeCount            = useAppSelector((state) => state.singleCompany.companyEmployeesCount)
  const limit                           = searchParams.get('limit')
  const delay                           = useDelay()

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

    const searchTerm = e.target.value.toLowerCase()
    delay( async() => {
      if (searchTerm === '') {
        setSearchParams(`?page=${page}&limit=${limit}&tabKey=${tabKey}`)
      } else {
        setSearchParams(`page=${page}&limit=${limit}&tabKey=${tabKey}&search=${e.target.value.toLowerCase()}`)
      }
    })
  }

  const changePage = async(page: number, limit: number) => {
    if(search){
      setSearchParams(`page=${page}&limit=${limit}&tabKey=${tabKey}&search=${search}`)
    }else{
      setSearchParams(`page=${page}&limit=${limit}&tabKey=${tabKey}`)
    }
  }

  return (
    <div className='EmployeeListContainer'>
      <Divider>Darbuotojai</Divider>
      <Input style={{marginBottom: '15px'}} onChange={onChange} placeholder='Ieškoti darubotojo'/>
      <List
        pagination={{
          defaultCurrent:  Number(page),
          total:           companyEmployeeCount,
          onChange:        changePage,
          showSizeChanger: true,
          align:           'center',
        }}
        loading={loading}
        locale={{emptyText: 'Nėra pridėtų darbuotojų'}}
        dataSource={companiesEmployees}
        bordered
        renderItem={(item) => (
          <EmployeesListItem id={item._id}
            description={HighlightText(search, `${item.occupation}`)}
            listButtons={() => listButtons(item._id, item.companyId)}
            title={HighlightText(search, `${item.name} ${item.lastname}`)}
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