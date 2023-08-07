/* eslint-disable max-len */
import React              from 'react'
import ProgressSteps      from '../ProgressSteps/ProgressSteps'
import RouteMapPopover    from '../RouteMapPopover/RouteMapPopover'
import { useAppSelector } from '../../store/hooks'


const CheckilistHeader = () => {
  const defaultPageTheme = useAppSelector((state) => state.theme.value)

  return(
    <div style={{backgroundColor: defaultPageTheme ? '#1e1e1e' : 'white', paddingTop: '15px'}} className='ChecklistHeaderContainer'>
      <ProgressSteps />
      <RouteMapPopover />
    </div>
  )
}

export default CheckilistHeader
