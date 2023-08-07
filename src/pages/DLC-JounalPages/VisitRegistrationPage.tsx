import React                        from 'react'
import VisitRegistrationForm        from '../../components/VisitRegistrationForm'
import JournalSteps                 from '../../components/JournalSteps'
import VisitPurposeForm             from '../../components/VisitPurposeForm'
import VisitingPersonsConfirmation  from '../../components/VisitingPersonsConfirmation'

const VisitRegistrationPage = () => {
  const [current, setCurrent] = React.useState(0)
  return (
    <div>
      <JournalSteps current={current} setCurrent={setCurrent}/>
      { current === 0 && <VisitRegistrationForm setCurrent={setCurrent}/> }
      { current === 1 && <VisitPurposeForm setCurrent={setCurrent}/> }
      { current === 2 && <VisitingPersonsConfirmation /> }
    </div>
  )
}

export default VisitRegistrationPage