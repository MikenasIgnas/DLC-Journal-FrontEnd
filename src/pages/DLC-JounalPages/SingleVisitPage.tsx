/* eslint-disable max-len */
// import ClientsGuestsItemList    from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ClientsGuestsItemList'
import CollocationsForm       from '../../components/DLCJournalComponents/SingleVisitPageComponents/CollocationsForm/CollocationsForm'
import SelectedVisitorsForm   from '../../components/DLCJournalComponents/SingleVisitPageComponents/SelectedVisitorsForm/SelectedVisitorsForm'
import VisitInformationForm   from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitInformationForm/VisitInformationForm'
import CarPlatesItemList      from '../../components/DLCJournalComponents/VisitiRegistrationComponents/CarPlatesItemList'
import ClientsGuestsItemList  from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ClientsGuestsItemList'
import useFetchSites          from '../../Plugins/useFetchSites'
import useFetchVisitData      from '../../Plugins/useFethcVisitData'
import VisitStatusButton      from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitStatusButtons'

const SingleVisitPage = () => {
  useFetchVisitData()
  useFetchSites()

  return (
    <>
      <VisitInformationForm/>
      <SelectedVisitorsForm/>
      <CollocationsForm/>
      <ClientsGuestsItemList/>
      <CarPlatesItemList/>
      <VisitStatusButton/>
    </>
  )
}

export default SingleVisitPage