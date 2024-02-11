/* eslint-disable max-len */
import ClientsGuestsItemList    from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ClientsGuestsItemList'
import CollocationsForm         from '../../components/DLCJournalComponents/SingleVisitPageComponents/CollocationsForm/CollocationsForm'
import SelectedVisitorsForm     from '../../components/DLCJournalComponents/SingleVisitPageComponents/SelectedVisitorsForm/SelectedVisitorsForm'
import VisitInformationForm     from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitInformationForm/VisitInformationForm'
import useSetSingleVisitData    from '../../Plugins/useSetSingleVisitData'
import { Input }                from 'antd'
import CarPlatesItemList        from '../../components/DLCJournalComponents/VisitiRegistrationComponents/CarPlatesItemList'
import VisitStatusButton        from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitStatusButtons'

const SingleVisitPage = () => {
  const {
    visitData,
    company,
    companies,
    visitPurpose,
    visitors,
    companyEmployees,
    sites,
    setCompanyEmployees,
    permissions,
    visitorIdTypes,
    visitAddress,
    setGuests,
    guests,
    companyPremise,
    companyRacks,
    carPlates,
    setCarPlates,
    visitStatus,
    visitStatuses,
    setVisitors,
    setSelectedVisitors,
    fetchData,
  } = useSetSingleVisitData()

  const site = sites?.filter(el => el._id === visitAddress)

  return (
    <>
      <VisitInformationForm
        permissions={permissions}
        sites={sites}
        visitPurpose={visitPurpose}
        company={company}
        visitData={visitData}
        visitors={visitors}
        visitStatus={visitStatus}
      />
      <SelectedVisitorsForm
        setSelectedVisitors={setSelectedVisitors}
        setVisitors={setVisitors}
        permissions={permissions}
        visitData={visitData}
        visitors={visitors}
        setCompanyEmployees={setCompanyEmployees}
        companyEmployees={companyEmployees}
        visitorIdTypes={visitorIdTypes}
      />
      <CollocationsForm
        companyRacks={companyRacks}
        visitData={visitData}
        siteId={visitAddress}
        companies={companies}
        companyPremise={companyPremise}
      />
      <ClientsGuestsItemList
        selectedVisitors={visitors.length}
        visitors={visitors}
        list={guests}
        setListItems={setGuests}
        removeUrl={'removeClientsGuest'}
        url={'visit/visit'}
        companyNameInput={<Input placeholder='Imonė'/>}
      />
      <CarPlatesItemList
        selectedVisitors={visitors.length}
        visitAddress={site?.[0]?.name}
        url={'visit/visit'}
        list={carPlates}
        setList={setCarPlates}
      />
      <VisitStatusButton
        fetchData={fetchData}
        visitStatuses={visitStatuses}
        visitors={visitors}
        visitData={visitData}
      />
    </>
  )
}

export default SingleVisitPage