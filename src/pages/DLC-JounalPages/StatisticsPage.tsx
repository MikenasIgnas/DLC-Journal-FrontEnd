/* eslint-disable max-len */
import React                    from 'react'
import { useCookies }           from 'react-cookie'
import { get }                  from '../../Plugins/helpers'
import { CompaniesType, VisitsType }           from '../../types/globalTypes'
import VisitsBarChart           from '../../components/DLCJournalComponents/StatisticsPageComponents/VisitsBarChart'
import CompaniesVIsitsBarChart  from '../../components/DLCJournalComponents/StatisticsPageComponents/CompaniesVisitsBarChart'
import { Tabs }                 from 'antd'
import useSetWindowsSize        from '../../Plugins/useSetWindowsSize'

const StatisticsPage = () => {
  const [cookies]                   = useCookies()
  const [visits, setVisits]         = React.useState<VisitsType[] | undefined>([])
  const [companies, setCompanies]   = React.useState<CompaniesType[] | undefined>([])
  const windowSize                  = useSetWindowsSize()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const allVisits     = await get('visit/visit', cookies.access_token)
        const allCompanies  = await get('company/company', cookies.access_token)
        setCompanies(allCompanies)
        setVisits(allVisits)
      } catch (err) {
        console.error(err)
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
    <Tabs
      tabPosition={windowSize > 600 ? 'left' : 'top'}
      items={tabItems}
    />
  )
}

export default StatisticsPage