/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import { useAppSelector }             from '../../../../store/hooks'
import { Empty, Tabs, TabsProps }     from 'antd'
import { useParams, useSearchParams } from 'react-router-dom'
import CompanySite                    from './CompaniesRacks'



const EditableCollocationFormList = () => {
  const sites = useAppSelector((state) => state.singleCompany.fullSiteData)
  const { id } = useParams()
  const [,setSearchParams] = useSearchParams()
  const items: TabsProps['items'] = sites?.map((site) => ({
    key:      site._id,
    label:    site.name,
    children: site.premises.length >= 1
      ? <CompanySite site={site}/>
      : <Empty description='Klientas kolokacijų J13 neturi' image={Empty.PRESENTED_IMAGE_SIMPLE} />,
  }))
  const tabClick = (key: string) => {
    setSearchParams(`?siteId=${key}&companyId=${id}`)
  }
  return (
    <Tabs onTabClick={tabClick} defaultActiveKey='1'items={items} />
  )
}

export default EditableCollocationFormList