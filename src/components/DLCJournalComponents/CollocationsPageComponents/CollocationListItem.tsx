/* eslint-disable max-len */
import { DeleteOutlined }                 from '@ant-design/icons'
import { Collapse, List, Tag, message }   from 'antd'
import { useAppDispatch }                 from '../../../store/hooks'
import { setOpenCollocationRemovalModal } from '../../../auth/ModalStateReducer/ModalStateReducer'
import { useSearchParams }                from 'react-router-dom'
import SuccessMessage                     from '../../UniversalComponents/SuccessMessage'
import { setCollocationItem }             from '../../../auth/CollocationItemReducer/collocationItemReducer'

type MatchingCompaniesType = {
  companyName:  string;
  premiseName:  string;
  racks:        string[]
}

type CollocationListItemProps = {
  item : {
    premiseName:  string;
    racks:        string[];
    addressId?:   string | null
  }
  index: number
  companyCollocation: MatchingCompaniesType[] | undefined
}

const CollocationListItem = ({item, index, companyCollocation}: CollocationListItemProps) => {
  const [searchParams]              = useSearchParams()
  const tabKey                      = searchParams.get('tabKey')
  const dispatch                    = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const genExtra = (premiseName: string) => (
    <div>
      <DeleteOutlined
        style={{color: 'red'}}
        onClick={ async (event) => {
          const find = companyCollocation?.find((el) => el.premiseName === premiseName)
          if( find && find?.racks.length > 0){
            messageApi.error({
              type:    'error',
              content: 'Kolokacijoje negali būti klientų',
            })
          }else{
            item.addressId = tabKey
            dispatch(setOpenCollocationRemovalModal(true))
            if(item.addressId && item){
              dispatch(setCollocationItem(item))
              event.stopPropagation()
            }
          }
        }}
      />
    </div>
  )

  return(
    <div>
      <Collapse
        items={[
          {
            key:      index,
            label:    item.premiseName,
            extra:    genExtra(item.premiseName),
            children: (
              <List
                style={{overflow: 'auto', maxHeight: '300px'}}
                dataSource={item.racks}
                renderItem={(rackItem) => (
                  <List.Item>
                    <div>
                      {rackItem}
                    </div>
                    <div>
                      {companyCollocation?.map(
                        (match) =>
                          match.racks.includes(rackItem) &&
                              match.premiseName === item.premiseName && (
                            <Tag key={match.companyName} color='blue'>
                              {match.companyName}
                            </Tag>
                          )
                      )}
                    </div>
                  </List.Item>
                )}
              />
            ),
          },
        ]}
      />
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default CollocationListItem