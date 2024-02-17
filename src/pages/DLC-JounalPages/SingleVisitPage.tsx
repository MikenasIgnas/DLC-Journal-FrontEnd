/* eslint-disable max-len */
// import ClientsGuestsItemList    from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ClientsGuestsItemList'
import React                  from 'react'
import CollocationsForm       from '../../components/DLCJournalComponents/SingleVisitPageComponents/CollocationsForm/CollocationsForm'
import SelectedVisitorsForm   from '../../components/DLCJournalComponents/SingleVisitPageComponents/SelectedVisitorsForm/SelectedVisitorsForm'
import VisitInformationForm   from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitInformationForm/VisitInformationForm'
import CarPlatesItemList      from '../../components/DLCJournalComponents/VisitiRegistrationComponents/CarPlatesItemList'
import ClientsGuestsItemList  from '../../components/DLCJournalComponents/VisitiRegistrationComponents/ClientsGuestsItemList'
import useFetchSites          from '../../Plugins/useFetchSites'
import useFetchVisitData      from '../../Plugins/useFethcVisitData'
import { Guest }              from '../../types/globalTypes'
import { useAppSelector }     from '../../store/hooks'
import VisitStatusButton      from '../../components/DLCJournalComponents/SingleVisitPageComponents/VisitStatusButtons'

const SingleVisitPage = () => {
  useFetchVisitData()
  useFetchSites()
  const visitData                         = useAppSelector((state) => state.visit.visit)
  const [clientsGuests, setClientsGuests] = React.useState<Guest[] | undefined>([])
  const [carPlates, setCarPlates]         = React.useState<string[] | undefined>([])

  React.useEffect(() => {
    setClientsGuests(visitData?.guests)
    setCarPlates(visitData?.carPlates)
  }, [visitData])

  return (
    <>
      <VisitInformationForm/>
      <SelectedVisitorsForm/>
      <CollocationsForm/>
      <ClientsGuestsItemList
        list={clientsGuests}
        setListItems={setClientsGuests}
        url={'visit/visit'}
      />
      <CarPlatesItemList
        url={'visit/visit'}
        removeUrl={'visit/carPlate'}
        list={carPlates}
        setList={setCarPlates}
      />
      <VisitStatusButton/>
    </>
  )
}

export default SingleVisitPage