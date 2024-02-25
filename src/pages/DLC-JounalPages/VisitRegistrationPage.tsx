/* eslint-disable max-len */
import React                  from 'react'
import { Card, theme }        from 'antd'
import VisitRegistrationForm  from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitRegistrationForm'
import useFetchVisitData      from '../../Plugins/useFethcVisitData'
import useFetchSites          from '../../Plugins/useFetchSites'
import { useAppDispatch }     from '../../store/hooks'
import { resetFullSiteData }  from '../../auth/SitesReducer/SitesReducer'
import { resetRacksReducer }  from '../../auth/RacksReducer/RacksReducer'
import { resetVisitReducer }  from '../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'

const VisitRegistrationPage= () => {
  const { token } = theme.useToken()
  const dispatch  = useAppDispatch()
  const contentStyle: React.CSSProperties = {
    lineHeight:      '260px',
    color:           token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius:    token.borderRadiusLG,
    border:          `1px dashed ${token.colorBorder}`,
    marginTop:       16,
    width:           '100%',
  }

  useFetchVisitData()
  useFetchSites()

  React.useEffect(() => {
    dispatch(resetVisitReducer())
    dispatch(resetFullSiteData())
    dispatch(resetRacksReducer())
  },[])

  return (
    <div style={contentStyle}>
      <Card style={{width: '100%'}}>
        <VisitRegistrationForm/>
      </Card>
    </div>
  )
}

export default VisitRegistrationPage