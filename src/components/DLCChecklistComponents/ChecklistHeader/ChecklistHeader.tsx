/* eslint-disable max-len */
import ProgressSteps      from '../ProgressSteps/ProgressSteps'
import RouteMapPopover    from '../RouteMapPopover/RouteMapPopover'

const CheckilistHeader = () => {
  return(
    <div style={{paddingTop: '15px'}} className='ChecklistHeaderContainer'>
      <ProgressSteps />
      <RouteMapPopover />
    </div>
  )
}

export default CheckilistHeader