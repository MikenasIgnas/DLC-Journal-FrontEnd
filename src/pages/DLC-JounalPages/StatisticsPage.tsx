/* eslint-disable max-len */
import React                    from 'react'
import { useCookies }           from 'react-cookie'
import { get }                  from '../../Plugins/helpers'
import { VisitsType }           from '../../types/globalTypes'
import VisitsBarChart           from '../../components/DLCJournalComponents/StatisticsPageComponents/VisitsBarChart'
import CompaniesVIsitsBarChart  from '../../components/DLCJournalComponents/StatisticsPageComponents/CompaniesVisitsBarChart'
import { Tabs }                 from 'antd'

const StatisticsPage = () => {
  const [cookies]               = useCookies()
  const [visits, setVisits]     = React.useState<VisitsType[] | undefined>()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const allVisits = await get('getVisits', cookies.access_token)
        setVisits(allVisits.data)
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
      children: <CompaniesVIsitsBarChart visits={visits}/>,
    },
  ]

  return (
    <Tabs
      tabPosition='left'
      items={tabItems}
    />
  )
}

export default StatisticsPage