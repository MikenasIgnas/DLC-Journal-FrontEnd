/* eslint-disable max-len */
import { useAppSelector } from '../../../../store/hooks'
import RacksCheckboxGroup from '../../VisitiRegistrationComponents/RacksCheckboxGroup'


const EditableVisitPremises = () => {
  const premise = useAppSelector((state) => state.racks.premise)
  return (
    <div className='EditableCollocationContainer'>
      {premise.map((el) =>
        <RacksCheckboxGroup key={el._id}premise={el}/>
      )}
    </div>
  )
}

export default EditableVisitPremises