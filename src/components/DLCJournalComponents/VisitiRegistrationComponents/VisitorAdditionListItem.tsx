/* eslint-disable max-len */
import {
  Avatar,
  Card,
  List,
  message,
}                             from 'antd'
import { EmployeesType }      from '../../../types/globalTypes'
import { useCookies }         from 'react-cookie'
import Meta                   from 'antd/es/card/Meta'
import { post }               from '../../../Plugins/helpers'
import useSetWindowsSize      from '../../../Plugins/useSetWindowsSize'
import HighlightText          from '../../UniversalComponents/HighlightText'
import { useAppDispatch }     from '../../../store/hooks'
import { addVisitor}          from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'
import { useSearchParams }    from 'react-router-dom'
import SuccessMessage from '../../UniversalComponents/SuccessMessage'

type VisitorAdditionListItemProps = {
    item:                 EmployeesType
    photoFolder:          string;
    searchEmployeeValue:  string | undefined
}

const VisitorAdditionListItem = ({item, photoFolder, searchEmployeeValue}: VisitorAdditionListItemProps) => {
  const [cookies]                   = useCookies(['access_token'])
  const windowSize                  = useSetWindowsSize()
  const dispatch                    = useAppDispatch()
  const [searchParams]              = useSearchParams()
  const visitId                     = searchParams.get('_id')
  const [messageApi, contextHolder] = message.useMessage()
  const addVisitingClient = async() => {
    try{
      const res = await post('visit/visitor', {visitId: visitId, employeeId: item._id}, cookies.access_token)
      dispatch(addVisitor(res))
      messageApi.success({
        type:    'success',
        content: 'Lankytojas pridėtas',
      })
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  return (
    <List.Item>
      <Card
        onClick={addVisitingClient}
        className='VisitorAdditionCard'
        style={{ margin: '10px', width: windowSize > 600 ? 300 : 220, cursor: 'pointer' }}
      >
        <Meta
          avatar={<Avatar shape='square' size={windowSize > 600 ? 90 : 40} src={ item?.photo ? item?.photo : `${photoFolder}noUserImage.jpeg`} />}
          title={<div style={{fontSize: windowSize > 600 ? '15px' : '12px'}}>{HighlightText(searchEmployeeValue, item.name)} {HighlightText(searchEmployeeValue, item?.lastname)}</div>}
          description={<p style={{fontSize: windowSize > 600 ? '12px' : '10px'}}>{item.occupation}</p>}
        />
      </Card>
      <SuccessMessage contextHolder={contextHolder}/>
    </List.Item>
  )
}

export default VisitorAdditionListItem