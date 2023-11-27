/* eslint-disable max-len */
import React                        from 'react'
import { Card, Steps }                    from 'antd'
import VisitRegistrationForm        from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitRegistrationForm'
import VisitPurposeForm             from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitPurposeForm'
import VisitingPersonsConfirmation  from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitingPersonsConfirmation'


const VisitRegistrationPage= () => {
  const [current, setCurrent] = React.useState(0)

  const steps = [
    {
      title:   ' Įmonės Registracija',
      content: <VisitRegistrationForm setCurrent={setCurrent} />,
    },
    {
      title:   'Vizito Tikslas',
      content: <VisitPurposeForm setCurrent={setCurrent}/> ,
    },
    {
      title:   'Identifikacija',
      content: <VisitingPersonsConfirmation setCurrent={setCurrent} />,
    },
  ]

  const items = steps.map((item) => ({ key: item.title, title: item.title }))
  return (
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
      <Card style={{width: '100% '}}>
        <Steps current={current} items={items} />
        <div>{steps[current].content}</div>
      </Card>
    </div>
  )
}

export default VisitRegistrationPage