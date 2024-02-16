/* eslint-disable max-len */
import { Input }                from 'antd'
import ClientsGuestsItemList    from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ClientsGuestsItemList'
import CarPlatesItemList        from '../../components/DLCJournalComponents/VisitiRegistrationComponents/CarPlatesItemList'
import SelectedVisitorsForm     from '../../components/DLCJournalComponents/SingleVisitPageComponents/SelectedVisitorsForm/SelectedVisitorsForm'
import CollocationsForm         from '../../components/DLCJournalComponents/SingleVisitPageComponents/CollocationsForm/CollocationsForm'
import VisitInformationForm     from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitInformationForm/VisitInformationForm'
import VisitStatusButton        from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitStatusButtons'
import useSetSingleVisitData    from '../../Plugins/useSetSingleVisitData'

const SingleVisitPage = () => {
  const {
    visitData,
    fetchData,
    setVisitData,
    setSelectedVisitors,
    clientsEmployees,
    setClientsGuests,
    carPlates,
    setCarPlates,
    clientsGuests,
  } = useSetSingleVisitData()

  return (
    <>
      <VisitInformationForm
        visitData={visitData}
        fetchData={fetchData}
      />
      <SelectedVisitorsForm
        visitData={visitData}
        setVisitData={setVisitData}
        setSelectedVisitors={setSelectedVisitors}
        fetchData={fetchData}
        clientsEmployees={clientsEmployees}
      />
      <CollocationsForm/>
      <ClientsGuestsItemList
        selectedVisitors={visitData?.[0].visitors.length}
        visitors={visitData?.[0].visitors}
        list={clientsGuests}
        fetchData={fetchData}
        setListItems={setClientsGuests}
        removeUrl={'removeClientsGuest'}
        url={'updateClientsGests'}
        companyNameInput={<Input placeholder='Imonė'/>}
      />
      <CarPlatesItemList
        selectedVisitors={visitData?.[0].visitors.length}
        visitAddress={visitData?.[0]?.visitAddress as string | null}
        url={'updateCarPlates'}
        removeUrl={'removeCarPlates'}
        list={carPlates}
        setList={setCarPlates}
      />
      <VisitStatusButton
        visitData={visitData}
        fetchData={fetchData}
        setVisitData={setVisitData}
      />
    </>
  )
}

export default SingleVisitPage