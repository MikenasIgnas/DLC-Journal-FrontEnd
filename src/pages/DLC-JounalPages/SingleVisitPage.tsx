/* eslint-disable max-len */
import ClientsGuestsItemList  from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ClientsGuestsItemList'
import CarPlatesItemList      from '../../components/DLCJournalComponents/VisitiRegistrationComponents/CarPlatesItemList'
import SelectedVisitorsForm   from '../../components/DLCJournalComponents/SingleVisitPageComponents/SelectedVisitorsForm/SelectedVisitorsForm'
import CollocationsForm       from '../../components/DLCJournalComponents/SingleVisitPageComponents/CollocationsForm/CollocationsForm'
import VisitInformationForm   from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitInformationForm/VisitInformationForm'
import VisitStatusButton      from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitStatusButtons'
import useSetSingleVisitData  from '../../Plugins/useSetSingleVisitData'

const SingleVisitPage = () => {
  const { visitData, fetchData, setVisitData, setSelectedVisitors, clientsEmployees} = useSetSingleVisitData()
  return (
    <>
      <VisitInformationForm visitData={visitData} fetchData={fetchData}/>
      <SelectedVisitorsForm
        visitData={visitData}
        setVisitData={setVisitData}
        setSelectedVisitors={setSelectedVisitors}
        fetchData={fetchData}
        clientsEmployees={clientsEmployees}
      />
      <CollocationsForm/>
      <ClientsGuestsItemList removeUrl={'removeClientsGuest'} url={'updateClientsGests'}/>
      <CarPlatesItemList url={'updateCarPlates'} removeUrl={'removeCarPlates'}/>
      <VisitStatusButton visitData={visitData} fetchData={fetchData} setVisitData={setVisitData}/>
    </>
  )
}

export default SingleVisitPage