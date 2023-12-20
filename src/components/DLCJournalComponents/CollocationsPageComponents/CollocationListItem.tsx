/* eslint-disable max-len */
import { DeleteOutlined, FileExcelOutlined }  from '@ant-design/icons'
import { Collapse, List, Tag, message }       from 'antd'
import { useAppDispatch }                     from '../../../store/hooks'
import { setOpenCollocationRemovalModal }     from '../../../auth/ModalStateReducer/ModalStateReducer'
import { useSearchParams }                    from 'react-router-dom'
import SuccessMessage                         from '../../UniversalComponents/SuccessMessage'
import { setCollocationItem }                 from '../../../auth/CollocationItemReducer/collocationItemReducer'
import { generateCsv }                        from '../../../Plugins/helpers'
import { useCookies } from 'react-cookie'

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
  const [cookies]                   = useCookies(['access_token'])

  const data = [
    {
      'Column 1': '1-1',
      'Column 2': '1-2',
      'Column 3': '1-3',
      'Column 4': '1-4',
    },
    {
      'Column 1': '2-1',
      'Column 2': '2-2',
      'Column 3': '2-3',
      'Column 4': '2-4',
    },
    {
      'Column 1': '3-1',
      'Column 2': '3-2',
      'Column 3': '3-3',
      'Column 4': '3-4',
    },
    {
      'Column 1': 4,
      'Column 2': 5,
      'Column 3': 6,
      'Column 4': 7,
    },
  ]

  const genExtra = (premiseName: string) => (
    <div>
      <FileExcelOutlined onClick={() => generateCsv('generateSingleCollocationCSV', data, cookies.access_token)}/>
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