/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { Button, Form, Input, List } from 'antd'
import React                         from 'react'
import { deleteItem, get, post }     from '../../Plugins/helpers'
import { useCookies }                from 'react-cookie'
import { CompaniesType }             from '../../types/globalTypes'
import { Link, useSearchParams }     from 'react-router-dom'
import CompanyAddition               from '../../components/DLCJournalComponents/ClientCompanyListComponents/CompanyAdditionComponent/CompanyAddition'
import ListItem                      from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClientsTab/ListItem'
import { useAppSelector }            from '../../store/hooks'
import useDelay                      from '../../Plugins/useDelay'
import PermissionAdditionModal       from '../../components/DLCJournalComponents/ClientCompanyListComponents/PermissionAdditionModal'
import { Permissions }               from '../../types/globalTypes'
import CompaniesPagination           from '../../components/DLCJournalComponents/ClientCompanyListComponents/CompaniesPagination'
import ChildCompaniesTree            from '../../components/DLCJournalComponents/ClientCompanyListComponents/ChildCompaniesTree'

const CompaniesListPage = () => {
  const [loading, setLoading]                 = React.useState(false)
  const [cookies]                             = useCookies(['access_token'])
  const [companies, setCompanies]             = React.useState<CompaniesType[]>([])
  const openCompaniesAdditionModal            = useAppSelector((state) => state.modals.openCompaniesAdditionModal)
  const [searchValue, setSearchValues]        = React.useState<string | null>(null)
  const delay                                 = useDelay()
  const [isModalOpen, setIsModalOpen]         = React.useState(false)
  const [permissions, setPermissions]         = React.useState<Permissions[]>([])
  const [companiesCount, setCompaniesCount]   = React.useState<number | undefined>()
  const [form]                                = Form.useForm()
  const [searchParams, setSearchParams]       = useSearchParams()
  const page                                  = searchParams.get('page')
  const limit                                 = searchParams.get('limit')
  const name                                  = searchParams.get('name')

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        let fetchCompaniesUrl = `company/company?page=${page}&limit=${limit}`

        if(name){
          fetchCompaniesUrl += `company/company?page=${page}&limit=${limit}&name=${name}`
        }

        const permissionsRes  = await get('company/permission', cookies.access_token)
        const allComapnies    = await get(fetchCompaniesUrl, cookies.access_token)
        const countCompanies  = await get('company/company/count', cookies.access_token)
        setCompaniesCount(countCompanies)
        const mainCompanies = allComapnies.filter((el: CompaniesType) => el.parentId !== null || el.parentId !== undefined )
        setPermissions(permissionsRes)
        setCompanies(mainCompanies)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    })()
  },[openCompaniesAdditionModal, isModalOpen, page, limit, name])

  const companyRemoved = (id: string | undefined) => {
    const newCompaniesList = companies.filter(x => x?._id !== id)
    setCompanies(newCompaniesList)
  }

  const deleteCompany = async(companyId: string | undefined) => {
    await deleteItem('company/company', {id: companyId, parentId: 'null'}, cookies.access_token)
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
        setSearchParams(`company/company?page=${page}&limit=${limit}`)
      } else {
        setSearchParams(`?page=${page}&limit=${limit}&name=${e.target.value}`)
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
        defaultValue={name ? name : ''}
        allowClear
      />
      <List
        loading={loading}
        dataSource={companies}
        renderItem={(item: CompaniesType) => {
          return(
            <ListItem
              id={item._id}
              item={item}
              photosFolder={'CompanyLogos'}
              altImage={'noImage.jpg'}
              listButtons={listButtons}
              title={<ChildCompaniesTree searchValue={searchValue} companies={companies} item={item} />}
            />
          )
        }}/>
      <CompaniesPagination companiesCount={companiesCount}/>
    </div>
  )
}

export default CompaniesListPage