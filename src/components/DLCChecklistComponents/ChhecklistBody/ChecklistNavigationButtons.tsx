/* eslint-disable max-len */
import React                            from 'react'
import { Button }                       from 'antd'
import { useAppSelector }               from '../../../store/hooks'
import { useSearchParams }              from 'react-router-dom'
import { LeftOutlined, RightOutlined }  from '@ant-design/icons'

type ChecklistNavigationButtonsProps = {
    previousPage: () => void;
}

const ChecklistNavigationButtons = ({previousPage}:ChecklistNavigationButtonsProps) => {
  const totalRoomsInArea =        useAppSelector((state) => state.route.totalRoomsInArea[state.route.routeNumber - 1])
  const [searchParams] =          useSearchParams()
  const defaultTheme =            useAppSelector((state) => state.theme.value)
  const currentProgressUrlParam = searchParams.get('progress')
  return (
    <div style={{backgroundColor: defaultTheme ? '#1e1e1e' : 'white'}} className='ButtonConainer'>
      <Button icon={<LeftOutlined rev=''/>} type='link' onClick={previousPage}>Back</Button>
      <div style={{color: defaultTheme ? 'white' : 'black'}}>{currentProgressUrlParam}</div>
      <div style={{color: defaultTheme ? 'white' : 'black'}}>/</div>
      <div style={{color: defaultTheme ? 'white' : 'black'}}>{totalRoomsInArea}</div>
      <Button style={{display: 'flex', alignItems: 'center' }} icon={<RightOutlined rev='' style={{marginLeft: '8px',order: '1'}}/>} type='link' htmlType='submit'>Next</Button>
    </div>
  )
}

export default ChecklistNavigationButtons