/* eslint-disable max-len */
import React from 'react'
import { Card } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const DLCJournalStartPage = () => {
  const navigate = useNavigate()
  return (
    <div style={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'center',
      alignItems:     'center',
    }}>
      <div>
        <Card
          hoverable={true}
          onClick={()=> navigate('/VisitRegistration')}
          style={{
            width:      '400px',
            height:     '150px',
            fontSize:   '25px',
            textAlign:  'center',
            display:    'flex',
            alignItems: 'center',
            margin:     '20px',
          }}>
          <Link to={'/VisitRegistration'}>Registruoti naują vizitą</Link>
        </Card>
        <Card
          hoverable={true}
          style={{
            width:      '400px',
            height:     '150px',
            fontSize:   '25px',
            textAlign:  'center',
            display:    'flex',
            alignItems: 'center',
            margin:     '20px',
          }}>
          <Link to={'/VisitsPage'}>Aktyvūs vizitai</Link>
        </Card>
      </div>
      <div>
        <Card
          hoverable={true}
          onClick={()=> navigate('/CompaniesList')}
          style={{
            width:      '400px',
            height:     '150px',
            fontSize:   '25px',
            textAlign:  'center',
            display:    'flex',
            alignItems: 'center',
            margin:     '20px',
          }}>
            Įmonių sąrašas
        </Card>
        <Card
          hoverable={true}
          style={{
            width:      '400px',
            height:     '150px',
            fontSize:   '25px',
            textAlign:  'center',
            display:    'flex',
            alignItems: 'center',
            margin:     '20px',
          }}>
            Pastabos
        </Card>
      </div>
    </div>
  )
}

export default DLCJournalStartPage