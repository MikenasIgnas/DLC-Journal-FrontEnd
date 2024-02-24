/* eslint-disable max-len */
import { Card, Checkbox }   from 'antd'
import { useAppSelector }   from '../../../../store/hooks'
import { selectRacks }      from '../../../../auth/SitesReducer/selectors'
import { Premises }         from '../../../../types/globalTypes'
import CollocationCardTitle from '../../VisitiRegistrationComponents/CollocationCardTitle'

type VisitRacksProps = {
  premise: Premises
}

const VisitRacks = ({ premise } : VisitRacksProps) => {
  const companies = useAppSelector((state) => state.visit.companies)
  const selectPremiseRacks  = useAppSelector((state) => selectRacks(state, premise._id))
  const racksIds            = selectPremiseRacks.map((el) => el._id)
  const visitingRacks       = useAppSelector((state) => state.visit.visit?.racks)?.filter((el) => racksIds.includes(el))
  const editCollocations    = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const filledRacks         = selectPremiseRacks.filter((el) => visitingRacks?.includes(el._id))
  const checkboxOptions     =  filledRacks.map((el) => ({value: el._id || 'error', label: el.name || 'error'}))
  const filteredDLC         = companies.filter((el) => el.name !== 'Duomenų logistikos centras')
  const hasMatchingRacks    = filteredDLC.filter(company => company.racks.some(rack => visitingRacks?.includes(rack))).length > 1

  return (
    <>
      {
        filledRacks.length > 0 &&
        <Card className='CollocationItemCard' key={premise._id} title={<CollocationCardTitle hasMatchingRacks={hasMatchingRacks} premise={premise.name}/>}>
          <div>
            <Checkbox.Group
              disabled={!editCollocations}
              value={visitingRacks}
              options={checkboxOptions}
            />
          </div>
        </Card>
      }
    </>
  )
}

export default VisitRacks