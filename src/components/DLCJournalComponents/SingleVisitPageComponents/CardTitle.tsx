/* eslint-disable max-len */
import { Button }         from 'antd'
import { useAppSelector } from '../../../store/hooks'

const CardTitle = () => {
  const editCollocations    = useAppSelector((state) => state.visitPageEdits.editCollocations)

  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
      <div>Kolokacijos</div>
      <Button htmlType='submit' type='link'>{!editCollocations ? 'Edit' : 'Save'}</Button>
    </div>
  )
}

export default CardTitle