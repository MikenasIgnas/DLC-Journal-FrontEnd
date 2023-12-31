/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React                                                                                                               from 'react'
import { useParams, useSearchParams }                                                                                      from 'react-router-dom'
import { Tabs }                                                                                                            from 'antd'
import { get }                                                                                                             from '../../Plugins/helpers'
import { useAppDispatch, useAppSelector }                                                                                  from '../../store/hooks'
import {resetReducer, setArea, setPossibleProblems, setRoute, setTodo,setFilledData, setProblemCount, setChecklistPhotos}  from '../../auth/FetchedDataReducer/fetchedDataReducer'
import { useCookies }                                                                                                      from 'react-cookie'
import Loader                                                                                                              from '../../components/UniversalComponents/Loader/Loader'
import HistoryRouteTab                                                                                                     from '../../components/DLCChecklistComponents/HisotryPageElements/HistoryRouteTab'
import UserWhoFilled                                                                                                       from '../../components/DLCChecklistComponents/HisotryPageElements/UserWhoFilled'
import TabName                                                                                                             from '../../components/DLCChecklistComponents/HisotryPageElements/TabName'

const SingleHistoryPage = () => {
  const { id }                          = useParams()
  const dispatch                        = useAppDispatch()
  const [cookies]                       = useCookies(['access_token'])
  const [loading, setLoading]           = React.useState(false)
  const [isUpdated, setIsUpdated]       = React.useState(false)
  const [filledUser, setFilledUser]     = React.useState()
  const routes                          = useAppSelector((state) => state.fetchedData.routes)
  const [searchParams, setSearchParams] = useSearchParams()
  const tabUrlParam                     = searchParams.get('tab')

  React.useEffect(() => {
    if (id) {
      (async () => {
        try{
          setLoading(true)
          const filledChecklistData = await get(`getSingleHistoryELementData/${id}`, cookies.access_token)
          const checklistPhotos     = await get(`getPhotos/${id}`, cookies.access_token)
          const resRoutes           = await get('routeData', cookies.access_token)
          const resAreas            = await get('areasData', cookies.access_token)
          const resProblems         = await get('problemsData', cookies.access_token)
          const resTodo             = await get('todoData', cookies.access_token)
          if(!filledChecklistData.error && !resRoutes.error && !resAreas.error && !resProblems.error && !resTodo.error && !checklistPhotos.error){
            dispatch(setRoute(resRoutes.data))
            dispatch(setPossibleProblems(resProblems.data))
            dispatch(setArea(resAreas.data))
            dispatch(setTodo(resTodo.data))
            dispatch(setProblemCount(filledChecklistData.data.problemCount))
            dispatch(setFilledData(filledChecklistData.data.filledData))
            dispatch(setChecklistPhotos(checklistPhotos.data))
            setFilledUser(filledChecklistData.data)
          }
          setLoading(false)
          setIsUpdated(false)

        }catch(err){
          console.log(err)
        }
      })()
    }
    return () => {
      dispatch(resetReducer())
    }
  }, [isUpdated])

  if (loading) {
    return <Loader />
  }

  const tabItems = routes ? [filledUser, ...routes] : []
  return (
    <div className='SingleHistoryPageContainer'>
      {id &&
        <Tabs
          tabPosition={'top'}
          onChange={(key) => setSearchParams(`tab=${key}`) }
          defaultActiveKey={tabUrlParam as string}
          type='line'
          className='Tab'
          items={tabItems?.map((item, i) => {
            const tabId = String(i + 1)
            return {
              label:
              <div
                style={{padding: ' 12px 10px' }}
              >
                {item && typeof item?.id !== 'string' ? <TabName itemId={item?.id}/> : `Darbuotojas${window.innerWidth > 650 ? ':' : ''} ${window.innerWidth > 650 ? item?.userName : ''}` }
              </div>,
              key:      tabId,
              children: item && typeof item?.id !== 'string'
                ? <HistoryRouteTab setIsUpdated={setIsUpdated} itemId={tabItems && String(tabItems[0]?.id)} routeID={item?.id}/>
                : <UserWhoFilled item={item && item}/>,
            }
          })}
        />
      }
    </div>
  )
}

export default SingleHistoryPage