/* eslint-disable max-len */
import { Button }                       from 'antd'
import { useAppSelector }               from '../../../store/hooks'
import { useSearchParams }              from 'react-router-dom'
import { LeftOutlined, RightOutlined }  from '@ant-design/icons'

type ChecklistNavigationButtonsProps = {
    previousPage: () => void;
}

const ChecklistNavigationButtons = ({previousPage}:ChecklistNavigationButtonsProps) => {
  const totalRoomsInArea        = useAppSelector((state) => state.route.totalRoomsInArea[state.route.routeNumber - 1])
  const [searchParams]          = useSearchParams()
  const currentProgressUrlParam = searchParams.get('progress')
  return (
    <div className='ButtonConainer'>
      <Button icon={<LeftOutlined rev=''/>} type='link' onClick={previousPage}>Back</Button>
      <div>{currentProgressUrlParam}</div>
      <div>/</div>
      <div>{totalRoomsInArea}</div>
      <Button style={{display: 'flex', alignItems: 'center' }} icon={<RightOutlined rev='' style={{marginLeft: '8px',order: '1'}}/>} type='link' htmlType='submit'>Next</Button>
    </div>
  )
}

export default ChecklistNavigationButtons