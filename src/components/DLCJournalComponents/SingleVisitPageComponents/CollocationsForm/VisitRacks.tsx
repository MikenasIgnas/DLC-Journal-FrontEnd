/* eslint-disable max-len */
import { useAppSelector } from '../../../../store/hooks'
import VisitCheckBoxGroup from './VisitCheckBoxGroup'

type VisitRacksProps = {
    premiseId: string;
    companyRacks: string[] | undefined
}

const VisitRacks = ({ companyRacks } : VisitRacksProps) => {
  const racks = useAppSelector((state) => state.sites.racks)?.filter((el) => companyRacks?.includes(el._id))
  return (
    <div>{racks?.map((rack) => <VisitCheckBoxGroup key={rack._id} rack={rack}/>)}</div>
  )
}

export default VisitRacks