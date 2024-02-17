/* eslint-disable max-len */
import { useAppSelector } from '../../../../store/hooks'
import RacksCheckboxGroup from '../../VisitiRegistrationComponents/RacksCheckboxGroup'

const VisitsPremises = () => {
  const visitData       = useAppSelector((state) => state.visit.visit)
  const racks           = useAppSelector((state) => state.sites.racks)?.filter((el) => el?._id !== undefined && visitData?.racks?.includes(el._id))
  const racksPremiseIds = racks?.map((el) => el.premiseId)
  const premise         = useAppSelector((state) => state.sites.premise)?.filter((el) => racksPremiseIds?.includes(el._id))

  return (
    <div>{ premise?.map((el) => <RacksCheckboxGroup key={el._id} premise={el} />)
    }</div>
  )
}

export default VisitsPremises