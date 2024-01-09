/* eslint-disable max-len */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Popover, Space } from 'antd'
import { useAppSelector }         from '../../../store/hooks'

const content = () => {
  const routeNumber = useAppSelector((state) => state.route.routeNumber)
  return (
    <img style={{width: '1000px'}} src={`Images/RouteMap${routeNumber}.png`} alt='err' />
  )
}

const RouteMapPopover = () => {
  const routeNumber = useAppSelector((state) => state.route.routeNumber)
  return (
    <Space className='RouteMapContainer' wrap>
      <Popover content={content} title={`Maršrutas: ${routeNumber}`} trigger='click'>
        <Button style={{margin: '20px'}}>Žemėlapis</Button>
      </Popover>
    </Space>
  )
}

export default RouteMapPopover