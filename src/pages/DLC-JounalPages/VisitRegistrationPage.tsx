/* eslint-disable max-len */
import React                  from 'react'
import { Card, theme }        from 'antd'
import VisitRegistrationForm  from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitRegistrationForm'
import useFetchVisitData      from '../../Plugins/useFethcVisitData'
import useFetchCompanyRacks   from '../../Plugins/useFetchCompanyRacks'

const VisitRegistrationPage= () => {
  const { token } = theme.useToken()

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
  useFetchCompanyRacks()
  return (
    <div style={contentStyle}>
      <Card style={{width: '100% '}}>
        <VisitRegistrationForm/>
      </Card>
    </div>
  )
}

export default VisitRegistrationPage