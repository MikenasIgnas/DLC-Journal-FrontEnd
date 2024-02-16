/* eslint-disable max-len */
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppSelector }             from '../../../../store/hooks'
import EditableCompaniesRacks         from './EditableCompaniesRacks'
import { Tabs, TabsProps }            from 'antd'
import CompaniesRacks                 from './CompaniesRacks'

const ClientsCollocationsTab = () => {
  const sites = useAppSelector((state) => state.singleCompany.fullSiteData)
  const [,setSearchParams] = useSearchParams()
  const editCompanyPage = useAppSelector((state) => state.singleCompanyEdits.editCompanyPage)
  const { id } = useParams()
  const items: TabsProps['items'] = sites?.map((site) => ({
    key:      site._id,
    label:    site.name,
    children: !editCompanyPage
      ? <EditableCompaniesRacks site={site}/> : <CompaniesRacks site={site}/>,
  }))

  const tabClick = (key: string) => {
    setSearchParams(`?siteId=${key}&companyId=${id}`)
  }
  return(
    <Tabs onTabClick={tabClick} defaultActiveKey='1'items={items} />
  )
}

export default ClientsCollocationsTab