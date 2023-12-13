/* eslint-disable max-len */
import React                from 'react'
import JournalStartPageCard from '../../components/DLCJournalComponents/JournalStartPageCard/JournalStartPageCard'

const DLCJournalStartPage = () => {
  return (
    <div className='DLCJournalStartPageContainer'>
      <div className='DisplayFlex'>
        <JournalStartPageCard navigateLink={'/DLC Žurnalas/Vizito_Registracija'} buttonText={'Registruoti naują vizitą'}/>
        <JournalStartPageCard navigateLink={'/DLC Žurnalas/Vizitai?page=1&limit=10'} buttonText={'Aktyvūs vizitai'}/>
        <JournalStartPageCard navigateLink={'/DLC Žurnalas/Įmonių_Sąrašas'} buttonText={'Įmonių sąrašas'}/>
      </div>
      <div className='DisplayFlex'>
        <JournalStartPageCard navigateLink={'/DLC Žurnalas/Kolokacijos'} buttonText={'Kolokacijos'}/>
        <JournalStartPageCard navigateLink={'/DLC Žurnalas/Statistika'} buttonText={'Statistika'}/>
      </div>
    </div>
  )
}

export default DLCJournalStartPage