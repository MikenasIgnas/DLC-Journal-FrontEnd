/* eslint-disable max-len */
import { Button } from 'antd'
import { useAppSelector } from '../../../store/hooks'

const RegisteredVisitorsListItemCardTitle = () => {
  const editVisitors    = useAppSelector((state) => state.visitPageEdits.editVisitors)

  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
      <div>Lankytojai</div>
      <Button htmlType='submit' type='link'>{!editVisitors ? 'Edit': 'Save'}</Button>
    </div>
  )
}

export default RegisteredVisitorsListItemCardTitle