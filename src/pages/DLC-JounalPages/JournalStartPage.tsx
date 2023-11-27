/* eslint-disable max-len */
import React                  from 'react'
import JournalStartPageCard   from '../../components/DLCJournalComponents/JournalStartPageCard/JournalStartPageCard'

const DLCJournalStartPage = () => {
  return (
    <div style={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'center',
      alignItems:     'center',
      flexDirection:  'column',
    }}>
      <div style={{display: 'flex'}}>
        <JournalStartPageCard navigateLink={'/DLC Žurnalas/Vizito_Registracija'} buttonText={'Registruoti naują vizitą'}/>
        <JournalStartPageCard navigateLink={'/DLC Žurnalas/Vizitai?page=1&limit=10'} buttonText={'Aktyvūs vizitai'}/>
        <JournalStartPageCard navigateLink={'/DLC Žurnalas/Įmonių_Sąrašas'} buttonText={'Įmonių sąrašas'}/>
      </div>
      <div style={{display: 'flex'}}>
        <JournalStartPageCard navigateLink={'/DLC Žurnalas/Vizitai?page=1&limit=10'} buttonText={'Kolokacijos'}/>
        <JournalStartPageCard navigateLink={'/DLC Žurnalas/Statistika'} buttonText={'Statistika'}/>
      </div>
    </div>
  )
}

export default DLCJournalStartPage