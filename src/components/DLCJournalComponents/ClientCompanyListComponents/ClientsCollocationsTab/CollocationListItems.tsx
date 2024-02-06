/* eslint-disable max-len */
import { List }             from 'antd'
import { Premises }         from '../../../../types/globalTypes'
import { useAppSelector }   from '../../../../store/hooks'

type CollocationListItemsProps = {
    premise:        Premises
    companyRacks:   string[] | undefined
}

const CollocationListItems = ({ premise, companyRacks }: CollocationListItemsProps) => {
  const racks           = useAppSelector((state) => state.sites.racks)?.filter((el) => el.premiseId === premise._id)
  const clientsRacks    = racks?.filter(item => item._id !== undefined && companyRacks?.includes(item._id))

  return (
    <>
      {
        clientsRacks && clientsRacks?.length > 0 ?
          <List
            key={premise._id}
            size='small'
            header={<strong>{premise.name}</strong>}
            footer={
              <div className='CollocationDisplayFooter'>
                {/* <strong>{`Spintos: ${el..length}`}</strong> */}
              </div>
            }
            bordered
            dataSource={clientsRacks}
            renderItem={(item) =>
              <List.Item>
                {item.name}
              </List.Item>
            }/>
          : null
      }
    </>
  )
}

export default CollocationListItems