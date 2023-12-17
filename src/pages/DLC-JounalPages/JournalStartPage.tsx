/* eslint-disable max-len */
import React                                                                                        from 'react'
import JournalStartPageCard                                                                         from '../../components/DLCJournalComponents/JournalStartPageCard/JournalStartPageCard'
import { BarChartOutlined, DatabaseOutlined, FileAddOutlined, ReadOutlined, UnorderedListOutlined } from '@ant-design/icons'

const DLCJournalStartPage = () => {
  return (
    <div className='DLCJournalStartPageContainer'>
      <div className='DisplayFlex'>
        <JournalStartPageCard icon={<FileAddOutlined/>} navigateLink={'/DLC Žurnalas/Vizito_Registracija'} buttonText={'Registruoti naują vizitą'}/>
        <JournalStartPageCard icon={<ReadOutlined />} navigateLink={'/DLC Žurnalas/Vizitai?page=1&limit=10'} buttonText={'Vizitai'}/>
        <JournalStartPageCard icon={<UnorderedListOutlined/>} navigateLink={'/DLC Žurnalas/Įmonių_Sąrašas'} buttonText={'Įmonių sąrašas'}/>
      </div>
      <div className='DisplayFlex'>
        <JournalStartPageCard icon={<DatabaseOutlined />} navigateLink={'/DLC Žurnalas/Kolokacijos?tabKey=1'} buttonText={'Kolokacijos'}/>
        <JournalStartPageCard icon={<BarChartOutlined />} navigateLink={'/DLC Žurnalas/Statistika'} buttonText={'Statistika'}/>
      </div>
    </div>
  )
}

export default DLCJournalStartPage