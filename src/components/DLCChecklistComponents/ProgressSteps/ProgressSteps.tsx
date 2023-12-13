/* eslint-disable max-len */
import React                      from 'react'
import {  ConfigProvider, Steps } from 'antd'
import { useSearchParams }        from 'react-router-dom'
import { useAppSelector }         from '../../../store/hooks'
import { RouteType }              from '../../../types/globalTypes'

const ProgressSteps = () => {
  const [searchParams]          = useSearchParams()
  const defaultPageTheme        = useAppSelector((state) => state.theme.value)
  const routesNumber            = useAppSelector((state) => state.route.routeNumber)
  const totalRoomsInArea        = useAppSelector((state) => state.route.totalRoomsInArea[state.route.routeNumber - 1])
  const areas                   = useAppSelector((state) => state.fetchedData.areas)
  const routes                  = useAppSelector((state) => state.fetchedData.routes) as RouteType[]
  const currentProgressUrlParam = Number(searchParams.get('progress'))
  const currentRoute            = Number(searchParams.get('route'))
  const currentPageUrlParam     = Number(searchParams.get('page'))
  const percent                 = Number(currentProgressUrlParam) * (100 / totalRoomsInArea)
  const premiseNameItem         = areas?.find((area) => area.id === currentPageUrlParam)
  const defaultTheme            = useAppSelector((state) => state.theme.value)

  const addRouteDescription = (obj: {floor:string,id:number, routeNumber: number, title:string}) => ({
    title: <div style={{color: defaultPageTheme ? 'white': 'black'}}>{obj.title}</div>,
    ...(obj.id === Number(currentRoute) ? { description: <div style={{color: defaultPageTheme ? 'white': 'black'}}>{`Patalpa: ${premiseNameItem?.roomName}` }</div> } : {}),
  })
  const routeStepItem           = routes?.map(addRouteDescription)

  return (
    <ConfigProvider theme={{
      token: {
        colorTextLabel:   defaultTheme ? 'white' : 'black',
        colorFillContent: defaultTheme ? '#5e5e5e' : '#f0f0f0',
        colorSplit:       defaultTheme ? '#9b9b9b' : '#0505050f',
      },
    }}>
      <Steps
        size={'default'}
        current={routesNumber - 1}
        percent={percent}
        items={routeStepItem}
        labelPlacement='vertical'
      />
    </ConfigProvider>
  )
}

export default ProgressSteps