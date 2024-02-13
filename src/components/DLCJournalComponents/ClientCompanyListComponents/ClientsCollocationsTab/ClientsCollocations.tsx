/* eslint-disable max-len */
import { useAppSelector }         from '../../../../store/hooks'
import ColocationDisplay          from './ColocationDisplay'
import { Empty, Tabs, TabsProps } from 'antd'

type ClientsCollocations = {
  companyRacks: string[] | undefined
}

const ClientsCollocations = ({ companyRacks }: ClientsCollocations) => {
  const sites = useAppSelector((state) => state.sites.fullSiteData)

  const items: TabsProps['items'] = sites?.map((site) => ({
    key:      site._id,
    label:    site.name,
    children: companyRacks && companyRacks.length >= 1
      ? <ColocationDisplay companyRacks={companyRacks} site={site}/>
      : <Empty description='Klientas kolokacijų J13 neturi' image={Empty.PRESENTED_IMAGE_SIMPLE} />,
  }))

  return(
    <>
      { companyRacks && companyRacks?.length >= 1 || companyRacks && companyRacks?.length >= 1 ?
        <Tabs defaultActiveKey='1' items={items} />
        : <Empty description='Klientui nėra priskirtų kolokacijų' image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </>
  )
}

export default ClientsCollocations