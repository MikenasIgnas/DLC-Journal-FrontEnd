/* eslint-disable max-len */
import { useSearchParams }  from 'react-router-dom'
import JournalStartPageCard from '../../components/DLCJournalComponents/JournalStartPageCard/JournalStartPageCard'
import { useAppSelector }   from '../../store/hooks'
import {
  BarChartOutlined,
  DatabaseOutlined,
  FileAddOutlined,
  ReadOutlined,
  UnorderedListOutlined,
}                           from '@ant-design/icons'

const DLCJournalStartPage = () => {
  const isSecurity      = useAppSelector((state) => state.auth.isSecurity)
  const [searchParams]  = useSearchParams()
  const siteId          = searchParams.get('siteId')

  return (
    <div className='DLCJournalStartPageContainer'>
      <div className='DisplayFlex'>
        {!isSecurity ? <JournalStartPageCard icon={<FileAddOutlined/>} navigateLink={'/DLC Žurnalas/Vizito_Registracija'} buttonText={'Registruoti naują vizitą'}/> : null}
        { <JournalStartPageCard icon={<ReadOutlined />} navigateLink={!isSecurity ? '/DLC Žurnalas/Vizitai?page=1&limit=10&descending=true': `/DLC Žurnalas/Vizitai?page=1&limit=10&descending=true&siteId=${siteId}`} buttonText={'Vizitai'}/>}
        {!isSecurity ? <JournalStartPageCard icon={<UnorderedListOutlined/>} navigateLink={'/DLC Žurnalas/Įmonių_Sąrašas?page=1&limit=10&descending=true'} buttonText={'Įmonių sąrašas'}/> : null}
      </div>
      {
        !isSecurity ?
          <div className='DisplayFlex'>
            <JournalStartPageCard icon={<DatabaseOutlined />} navigateLink={'/DLC Žurnalas/Kolokacijos?tabKey=1'} buttonText={'Kolokacijos'}/>
            <JournalStartPageCard icon={<BarChartOutlined />} navigateLink={'/DLC Žurnalas/Statistika'} buttonText={'Statistika'}/>
          </div>
          : null
      }
    </div>
  )
}

export default DLCJournalStartPage