/* eslint-disable max-len */
import { List }           from 'antd'
import { PremiseRacks }   from '../../../../types/globalTypes'
import { useAppSelector } from '../../../../store/hooks'
import { selectRacks }    from '../../../../auth/SingleCompanyReducer/selector'

type CollocationListItemsProps = {
  premise:        PremiseRacks
}

const RacksList = ({ premise }: CollocationListItemsProps) => {
  const premiseRacks = useAppSelector((state) => selectRacks(state, premise._id))
  return (
    <List
      key={premise._id}
      size='small'
      header={
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>{premise.name}</div>
          <div>Spintos: {premiseRacks.length}</div>
        </div>
      }
      bordered
      dataSource={premiseRacks}
      renderItem={(item) =>
        <List.Item>
          {item.name}
        </List.Item>
      }/>
  )
}

export default RacksList