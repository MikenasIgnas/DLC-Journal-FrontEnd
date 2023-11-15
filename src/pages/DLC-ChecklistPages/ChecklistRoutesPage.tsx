/* eslint-disable max-len */
import React                                                                                                    from 'react'
import { useSearchParams, useNavigate }                                                                         from 'react-router-dom'
import { Form, Card, message}                                                                                   from 'antd'
import { get, getCurrentDate, getCurrentTime, post }                                                            from '../../Plugins/helpers'
import { useAppDispatch, useAppSelector }                                                                       from '../../store/hooks'
import { setProgressTracker, setRouteNumber }                                                                   from '../../auth/RouteReducer/routeReducer'
import { resetReducer, setArea, setPossibleProblems, setRoute, setTodo, setLatestHistoryItem, setLatestPhotos } from '../../auth/FetchedDataReducer/fetchedDataReducer'
import CheckilistHeader                                                                                         from '../../components/DLCChecklistComponents/ChecklistHeader/ChecklistHeader'
import { onIncrementProgressTracker }                                                                           from '../../store/incremetnThunks/thunksIncrement'
import { onDecrementProgressTracker }                                                                           from '../../store/decrementThunks/thunksDecrement'
import FinishModal                                                                                              from '../../components/UniversalComponents/FinishModal/FinishModal'
import { useCookies }                                                                                           from 'react-cookie'
import {jwtDecode}                                                                                              from 'jwt-decode'
import { TokenType }                                                                                            from '../../types/globalTypes'
import PremiseName                                                                                              from '../../components/DLCChecklistComponents/PremiseName/PremiseName'
import ChecklistBody                                                                                            from '../../components/DLCChecklistComponents/ChhecklistBody/ChecklistBody'
import ChecklistNavigationButtons                                                                               from '../../components/DLCChecklistComponents/ChhecklistBody/ChecklistNavigationButtons'
import SuccessMessage                                                                                           from '../../components/UniversalComponents/SuccessMessage'

type ValuesType = {
  [key: number]: { [key: number]: null | boolean }[];
}

type FilledDataType = {
  pageID:       number,
  values:       ValuesType
  routeNumber:  number
}

const ChecklistRoutesPage = () => {
  const [form] =                          Form.useForm()
  const dispatch =                        useAppDispatch()
  const navigate =                        useNavigate()
  const [cookies] =                       useCookies(['access_token'])
  const decodedToken:TokenType =          jwtDecode(cookies.access_token)
  const [searchParams, setSearchParams] = useSearchParams()
  const [messageApi, contextHolder] =     message.useMessage()
  const [isModalOpen, setIsModalOpen] =   React.useState(false)
  const [loading, setLoading] =           React.useState(false)
  const [isDesktop, setDesktop] =         React.useState(window.innerWidth > 650)
  const currentPageUrlParam =             searchParams.get('page')
  const currentRouteUrlParam =            searchParams.get('route')
  const currentProgressUrlParam =         searchParams.get('progress')
  const areas =                           useAppSelector((state) => state.fetchedData.Areas)
  const userName =                        useAppSelector((state) => state.auth.username)
  const defaultTheme =                    useAppSelector((state)=> state.theme.value)
  const latestPhotos =                    useAppSelector((state)=> state.fetchedData.latestPhotos)

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650)
  }

  React.useEffect(() => {
    if (!areas) {
      (async () => {
        try{
          setLoading(true)
          const resRoutes =               await get('routeData', cookies.access_token)
          const resAreas =                await get('areasData',cookies.access_token)
          const resTodo =                 await get('todoData',cookies.access_token)
          const resProblems =             await get('problemsData',cookies.access_token)
          const reslatestHistoryItem =    await get('latestHistoryItem',cookies.access_token)
          const resLatestPhotos =         await get('latestPhotos',cookies.access_token)
          if(!resRoutes.error && !resAreas.error && !resTodo.error && !resProblems.error ){
            dispatch(setRoute(resRoutes.data))
            dispatch(setArea(resAreas.data))
            dispatch(setTodo(resTodo.data))
            dispatch(setPossibleProblems(resProblems.data))
            dispatch(setLatestHistoryItem(reslatestHistoryItem.data[0].filledData))
            dispatch(setLatestPhotos(resLatestPhotos.data))
            dispatch(setRouteNumber(Number(currentRouteUrlParam)))
            dispatch(setProgressTracker(Number(currentProgressUrlParam)))
            setLoading(false)
          }
        }catch(err){
          console.log(err)
        }
      })()
    }
    return () => {
      dispatch(resetReducer())
    }
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })

  const nextPage = (values: ValuesType) => {
    window.scrollTo(0,0)
    const dataObj = {
      pageID:      Number(currentPageUrlParam),
      values,
      routeNumber: Number(currentRouteUrlParam),

    }
    if (areas) {
      if (currentPageUrlParam) {
        localStorage.setItem(`data${currentPageUrlParam}`, JSON.stringify(dataObj))
      }

      if (Number(currentPageUrlParam) < areas.length) {
        const { newRouteNumber, newProgressTracker } = dispatch(onIncrementProgressTracker())
        setSearchParams(`route=${Number(newRouteNumber)}&page=${Number(currentPageUrlParam) + 1}&progress=${newProgressTracker}`, { replace: true })
      }

      if (Number(currentPageUrlParam) === areas.length) {
        setIsModalOpen(true)
      }
    }
  }

  const previousPage = () => {
    if (areas) {
      if (Number(currentPageUrlParam) !== 1) {
        const { newProgressTracker, newRouteNumber } = dispatch(onDecrementProgressTracker())
        setSearchParams(`route=${Number(newRouteNumber)}&page=${Number(currentPageUrlParam) - 1}&progress=${newProgressTracker}`, { replace: true })
      }
    }
  }

  const onFinish = async () => {
    if (areas) {
      const filledData:FilledDataType[] = []
      setIsModalOpen(false)
      for (let i = 1; i < areas.length + 1; i++) {
        const retrievedObject = localStorage.getItem(`data${i}`)
        if (retrievedObject) {
          const item = JSON.parse(retrievedObject)
          filledData.push(item)
        }
      }
      const filledDataValues = filledData.map((el)=> el.values)
      const problemCount = filledDataValues.flatMap(Object.values).flat().filter(item => Object.values(item)[0] === true).length
      messageApi.success({
        type:    'success',
        content: 'Išsaugota',
      })
      const startDate = String(localStorage.getItem('startDate'))
      const startTime = String(localStorage.getItem('startTime'))
      const endDate = getCurrentDate()
      const endTime = getCurrentTime()

      const checklistData = {
        userName,
        filledData,
        startDate,
        startTime,
        endDate,
        endTime,
        problemCount,
        secret:   decodedToken.id,
        userRole: decodedToken.userRole,
      }
      try{

        if (Number(currentPageUrlParam) === areas.length) {
          const localStoragePhotos = localStorage.getItem('photos')
          if (localStoragePhotos) {
            const currentPhotos = JSON.parse(localStoragePhotos)
            await post('postPhotos', currentPhotos, cookies.access_token)
          }else{
            await post('postLatestPhotos', latestPhotos, cookies.access_token)
          }

          await post('postChecklistData', checklistData, cookies.access_token)
          localStorage.clear()
          setTimeout(() => {
            navigate('/ChecklistPage')
          }, 1000)
        }
      }catch(err){
        console.log(err)
      }
    }
  }


  return (
    <>
      {isDesktop ?
        <Card loading={loading} style={{backgroundColor: defaultTheme ? '#191919' : ''}} className='ChecklistCard' >
          <Form form={form} onFinish={nextPage}>
            <CheckilistHeader/>
            <ChecklistBody/>
            <ChecklistNavigationButtons previousPage ={previousPage}/>
            <FinishModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onFinish={onFinish}/>
            <SuccessMessage contextHolder={contextHolder}/>
          </Form>
        </Card>
        :
        <Form className={isDesktop ? '' : 'ScreenWidth'} form={form} onFinish={nextPage}>
          <PremiseName/>
          <ChecklistBody/>
          <ChecklistNavigationButtons previousPage ={previousPage}/>
          <FinishModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onFinish={onFinish}/>
          <SuccessMessage contextHolder={contextHolder}/>
        </Form>
      }
    </>
  )
}

export default ChecklistRoutesPage
