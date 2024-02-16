/* eslint-disable max-len */
import {
  useAppDispatch,
  useAppSelector,
}                             from '../../../../store/hooks'
import EditableCompaniesRacks from './EditableCompaniesRacks'
import {
  Tabs,
  TabsProps,
}                             from 'antd'
import CompaniesRacks         from './CompaniesRacks'
import { useSearchParams }    from 'react-router-dom'
import { setSiteId }          from '../../../../auth/SingleCompanyReducer/SingleCompanyReducer'

const ClientsCollocationsTab = () => {
  const [searchParams, setSearchParams]   = useSearchParams()
  const sites                             = useAppSelector((state) => state.singleCompany.fullSiteData)
  const editCompanyPage                   = useAppSelector((state) => state.singleCompanyEdits.editCompanyPage)
  const dispatch                          = useAppDispatch()
  const siteId                            = searchParams.get('siteId')

  const items: TabsProps['items'] = sites?.map((site) => ({
    key:      site._id,
    label:    site.name,
    children: !editCompanyPage ? <CompaniesRacks site={site}/> : <EditableCompaniesRacks site={site}/>,
  }))


  const changeTab = (key: string) => {
    setSearchParams(`?siteId=${key}`)
    dispatch(setSiteId(key))
  }

  return(
    <Tabs onTabClick={changeTab} activeKey={siteId ? siteId : undefined } items={items} />
  )
}

export default ClientsCollocationsTab