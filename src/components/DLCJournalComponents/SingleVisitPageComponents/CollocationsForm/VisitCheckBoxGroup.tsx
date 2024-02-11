import { Racks } from '../../../../types/globalTypes'

type VisitCheckBoxGroupProps = {
    rack: Racks
}

const VisitCheckBoxGroup = ({ rack }: VisitCheckBoxGroupProps) => {
  return (
    <div>{rack.name}</div>
  )
}

export default VisitCheckBoxGroup