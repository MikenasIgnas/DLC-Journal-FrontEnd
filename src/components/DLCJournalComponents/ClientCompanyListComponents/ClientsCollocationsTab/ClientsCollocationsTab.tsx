/* eslint-disable max-len */
import {
  useAppDispatch,
  useAppSelector,
}                             from '../../../../store/hooks'

import {
  Tabs,
  TabsProps,
}                             from 'antd'

import { setSiteId }          from '../../../../auth/SingleCompanyReducer/SingleCompanyReducer'
import CompaniesRacks         from './CompaniesRacks'
import { useSearchParams }    from 'react-router-dom'
import EditableCompaniesRacks from './EditableCompaniesRacks'

const ClientsCollocationsTab = () => {
  const [searchParams, setSearchParams]   = useSearchParams()
  const sites                             = useAppSelector((state) => state.singleCompany.fullSiteData)
  const editCompanyPage                   = useAppSelector((state) => state.singleCompanyEdits.editCompanyPage)
  const dispatch                          = useAppDispatch()
  const siteId                            = searchParams.get('siteId')
  const tabKey                            = searchParams.get('tabKey')

  const items: TabsProps['items'] = sites?.map((site) => ({
    key:      site._id,
    label:    site.name,
    children: !editCompanyPage ? <CompaniesRacks site={site}/> : <EditableCompaniesRacks site={site}/>,
  }))

  const changeTab = (key: string) => {
    setSearchParams(`?siteId=${key}&tabKey=${tabKey}`)
    dispatch(setSiteId(key))
  }

  return(
    <Tabs onTabClick={changeTab} activeKey={siteId ? siteId : undefined } items={items} />
  )
}

export default ClientsCollocationsTab