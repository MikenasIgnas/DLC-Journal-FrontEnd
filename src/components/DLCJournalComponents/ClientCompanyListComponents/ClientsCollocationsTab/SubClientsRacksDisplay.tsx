import { List }             from 'antd'
import { PremiseRacks }     from '../../../../types/globalTypes'
import { useAppSelector }   from '../../../../store/hooks'
import { selectRacks }      from '../../../../auth/SingleCompanyReducer/subClientsSitesSelector'

type CollocationListItemsProps = {
  premise: PremiseRacks
}

const SubClientsRacksDisplay = ({ premise }: CollocationListItemsProps) => {
  const premiseRacks = useAppSelector((state) => selectRacks(state, premise._id))
  return (
    <List
      key={premise._id}
      size='small'
      header={<strong>{premise.name}</strong>}
      bordered
      dataSource={premiseRacks}
      renderItem={(item) =>
        <List.Item>
          {item.name}
        </List.Item>
      }/>
  )
}

export default SubClientsRacksDisplay