/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { Button, Form, Input, List }       from 'antd'
import React                               from 'react'
import { deleteItem, get, post }           from '../../Plugins/helpers'
import { useCookies }                      from 'react-cookie'
import { CompaniesType }                   from '../../types/globalTypes'
import { Link }                            from 'react-router-dom'
import CompanyAddition                     from '../../components/DLCJournalComponents/ClientCompanyListComponents/CompanyAdditionComponent/CompanyAddition'
import ListItem                            from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClientsTab/ListItem'
import { useAppDispatch, useAppSelector }  from '../../store/hooks'
import ChildCompaniesTree                  from '../../components/DLCJournalComponents/ClientCompanyListComponents/ChildCompaniesTree'
import useDelay                            from '../../Plugins/useDelay'
import PermissionAdditionModal             from '../../components/DLCJournalComponents/ClientCompanyListComponents/PermissionAdditionModal'
import { Permissions }                     from '../../types/globalTypes'
import { setPremise, setRacks, setSite }   from '../../auth/SitesReducer/SitesReducer'

const CompaniesListPage = () => {
  const [loading, setLoading]           = React.useState(false)
  const [cookies]                       = useCookies(['access_token'])
  const [companies, setCompanies]       = React.useState<CompaniesType[]>([])
  const openCompaniesAdditionModal      = useAppSelector((state) => state.modals.openCompaniesAdditionModal)
  const [searchValue, setSearchValues]  = React.useState<string | null>(null)
  const delay                           = useDelay()
  const [isModalOpen, setIsModalOpen]   = React.useState(false)
  const [permissions, setPermissions]   = React.useState<Permissions[]>([])
  const [form]                          = Form.useForm()
  const dispatch                        = useAppDispatch()

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const res           = await get('company/permission', cookies.access_token)
        const allComapnies  = await get('company/company', cookies.access_token)
        const siteRes       = await get('site/site', cookies.access_token)
        const premiseRes    = await get('site/premise', cookies.access_token)
        const racksRes      = await get('site/rack', cookies.access_token)
        dispatch(setSite(siteRes))
        dispatch(setPremise(premiseRes))
        dispatch(setRacks(racksRes))
        const mainCompanies = allComapnies.filter((el: CompaniesType) => el.parentId !== null || el.parentId !== undefined )
        setPermissions(res)
        setCompanies(mainCompanies)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    })()
  },[openCompaniesAdditionModal, isModalOpen])

  const companyRemoved = (id: string | undefined) => {
    const newCompaniesList = companies.filter(x => x?._id !== id)
    setCompanies(newCompaniesList)
  }

  const deleteCompany = async(companyId: string | undefined) => {
    await deleteItem('company/company', {id: companyId}, cookies.access_token)
    companyRemoved(companyId)
  }

  const listButtons = (listItemId: string | undefined) => {
    const buttons = [
      <Link key={listItemId} to={`/DLC Žurnalas/Įmonių_Sąrašas/${listItemId}`}>Peržiūrėti</Link>,
      <Button type='link' onClick={() => deleteCompany(listItemId)} key={listItemId}>Ištrinti</Button>,
    ]
    return buttons
  }

  const searchForCompany = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    setSearchValues(searchTerm)
    delay( async() => {
      if (searchTerm === '') {
        const allCompanies = await get('company/company', cookies.access_token)
        setCompanies(allCompanies)
      } else {
        const allCompanies =  await get(`company/company?name=${e.target.value}&page=1&limit=10`, cookies.access_token)
        const foundCompany = companies.filter((elem) => elem.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCompanies(foundCompany)
        foundCompany.map((el) => {
          const childCompanies = allCompanies.data?.filter((ele: CompaniesType) => ele.parentId === el._id)
          if(childCompanies){
            setCompanies([...foundCompany, ...childCompanies])
          }
        })
      }
    })
  }
  const addPermission = async(values: Permissions) => {
    const res = await post('company/permission', values, cookies.access_token)
    if(!res.messsage){
      setPermissions([...permissions, res])
      form.resetFields(['name'])
    }
  }

  const permissionRemoved = (id:string | undefined) => {
    let newPermissionsList = [...permissions]
    newPermissionsList = newPermissionsList.filter(x => x?._id !== id)
    setPermissions(newPermissionsList)
  }

  const deletePermission = async(id: string) => {
    await deleteItem('company/permission',{id: id}, cookies.access_token)
    permissionRemoved(id)
  }

  return (
    <div className='CompaniesListPageContainer'>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <CompanyAddition
          postUrl={'company/company'}
          additionModalTitle={'Pridėkite įmonę'}
        />
        <PermissionAdditionModal
          setPermissions={setPermissions}
          setIsModalOpen={setIsModalOpen }
          isModalOpen={isModalOpen}
          form={form}
          permissions={permissions}
          addPermission={addPermission}
          deletePermission={deletePermission}
        />
      </div>
      <Input
        onChange={searchForCompany}
        style={{marginTop: '10px', marginBottom: '10px'}}
        placeholder='Ieškoti įmonės'
        allowClear
      />
      <List
        loading={loading}
        pagination={{ position: 'bottom', align: 'center'}}
        dataSource={companies}
        renderItem={(item: CompaniesType) => {
          return(
            <ListItem
              id={item._id}
              item={item}
              photosFolder={'CompanyLogos'}
              altImage={'noImage.jpg'}
              listButtons={listButtons}
              title={<ChildCompaniesTree searchValue={searchValue} companies={companies} item={item}/>}
            />
          )
        }}/>
    </div>
  )
}

export default CompaniesListPage