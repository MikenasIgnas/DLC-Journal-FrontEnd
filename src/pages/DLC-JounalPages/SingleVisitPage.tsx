/* eslint-disable max-len */
// import ClientsGuestsItemList    from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ClientsGuestsItemList'
import CollocationsForm         from '../../components/DLCJournalComponents/SingleVisitPageComponents/CollocationsForm/CollocationsForm'
import SelectedVisitorsForm     from '../../components/DLCJournalComponents/SingleVisitPageComponents/SelectedVisitorsForm/SelectedVisitorsForm'
import VisitInformationForm     from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitInformationForm/VisitInformationForm'
// import { Input }                from 'antd'
// import CarPlatesItemList        from '../../components/DLCJournalComponents/VisitiRegistrationComponents/CarPlatesItemList'
// import VisitStatusButton        from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitStatusButtons'
import useFetchVisitData        from '../../Plugins/useFethcVisitData'
import useFetchCompanyRacks     from '../../Plugins/useFetchCompanyRacks'

const SingleVisitPage = () => {
  useFetchVisitData()
  useFetchCompanyRacks()

  return (
    <>
      <VisitInformationForm/>
      <SelectedVisitorsForm/>
      <CollocationsForm/>
      {/* <ClientsGuestsItemList
        visitors={visitors}
        list={guests}
        setListItems={setGuests}
        removeUrl={'removeClientsGuest'}
        url={'visit/visit'}
        companyNameInput={<Input placeholder='Imonė'/>}
      />
      <CarPlatesItemList
        visitAddress={site?.[0]?.name}
        url={'visit/visit'}
        list={carPlates}
        setList={setCarPlates}
      />
      <VisitStatusButton
        fetchData={fetchData}
        visitStatuses={visitStatuses}
        visitors={visitors}
      /> */}
    </>
  )
}

export default SingleVisitPage