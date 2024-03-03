/* eslint-disable max-len */
import CarPlatesItemList      from '../../components/DLCJournalComponents/VisitiRegistrationComponents/CarPlatesItemList'
import ClientsGuestsItemList  from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ClientsGuestsItemList'
import CollocationsForm       from '../../components/DLCJournalComponents/SingleVisitPageComponents/CollocationsForm/CollocationsForm'
import SelectedVisitorsForm   from '../../components/DLCJournalComponents/SingleVisitPageComponents/SelectedVisitorsForm/SelectedVisitorsForm'
import VisitInformationForm   from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitInformationForm/VisitInformationForm'
import VisitStatusButton      from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitStatusButtons'
import useFetchSites          from '../../Plugins/useFetchSites'
import useFetchVisitData      from '../../Plugins/useFethcVisitData'

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