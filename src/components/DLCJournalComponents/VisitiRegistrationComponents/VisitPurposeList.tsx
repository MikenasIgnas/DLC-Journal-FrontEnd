/* eslint-disable max-len */
import { Card }                                from 'antd'
import VisitPurposeButtons                     from './VisitPurposeButtons'
import { useAppSelector }                      from '../../../store/hooks'
import { selectAllSelectedVisitorPermissions } from '../../../auth/VisitorEmployeeReducer/selectors'

const VisitPurposeList = () => {
  const matchingPermissionsItems       =  useAppSelector(selectAllSelectedVisitorPermissions)

  return (
    <Card style={{margin: '10px', backgroundColor: '#f9f9f9'}} title={'Vizito Tikslas'}>
      <div className='VisitPurposeButtonContainer'>
        {matchingPermissionsItems?.map((item, i) => <VisitPurposeButtons item={item} key={i} buttonWidth={(100 / matchingPermissionsItems.length) - 5}/>)}
      </div>
    </Card>
  )
}

export default VisitPurposeList