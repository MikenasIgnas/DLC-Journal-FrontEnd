/* eslint-disable max-len */
import React                        from 'react'
import VisitRegistrationForm        from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitRegistrationForm'
import JournalSteps                 from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitRegistrationSteps'
import VisitPurposeForm             from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitPurposeForm'
import VisitingPersonsConfirmation  from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitingPersonsConfirmation'

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