/* eslint-disable max-len */
import React                    from 'react'
import VisitsBarChart           from '../../components/DLCJournalComponents/StatisticsPageComponents/VisitsBarChart'
import CompaniesVIsitsBarChart  from '../../components/DLCJournalComponents/StatisticsPageComponents/CompaniesVisitsBarChart'
import useSetWindowsSize        from '../../Plugins/useSetWindowsSize'
import { useCookies }           from 'react-cookie'
import { get }                  from '../../Plugins/helpers'

import {
  CompaniesType,
  VisitsType,
}                               from '../../types/globalTypes'

import {
  Tabs,
  message,
}                               from 'antd'
import SuccessMessage from '../../components/UniversalComponents/SuccessMessage'

const StatisticsPage = () => {
  const [cookies]                   = useCookies()
  const [visits, setVisits]         = React.useState<VisitsType[] | undefined>([])
  const [companies, setCompanies]   = React.useState<CompaniesType[] | undefined>([])
  const windowSize                  = useSetWindowsSize()
  const [messageApi, contextHolder] = message.useMessage()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const allVisits     = await get('visit/visit', cookies.access_token)
        const allCompanies  = await get('company/company', cookies.access_token)
        setCompanies(allCompanies)
        setVisits(allVisits)
      } catch (error) {
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    }
    fetchData()
  }, [cookies.access_token])

  const tabItems = [
    {
      label:    <div style={{marginRight: '10px'}}>Vizitai</div>,
      key:      '1',
      children: <VisitsBarChart visits={visits}/>,
    },
    {
      label:    <div style={{marginRight: '10px'}}>Vizitai pagal įmonęs</div>,
      key:      '2',
      children: <CompaniesVIsitsBarChart visits={visits} companies={companies}/>,
    },
  ]

  return (
    <>
      <Tabs
        tabPosition={windowSize > 600 ? 'left' : 'top'}
        items={tabItems}
      />
      <SuccessMessage contextHolder={contextHolder}/>
    </>
  )
}

export default StatisticsPage