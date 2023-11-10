/* eslint-disable max-len */
import React                                                            from 'react'
import { Button, Card, ConfigProvider }                                 from 'antd'
import { useNavigate }                                                  from 'react-router-dom'
import { clearFilleChecklistdData, get,getCurrentDate,getCurrentTime }  from '../../Plugins/helpers'
import { useAppSelector }                                               from '../../store/hooks'
import { useCookies }                                                   from 'react-cookie'

const ChecklistStartPage = () => {
  const navigate =                                useNavigate()
  const defaultPageTheme =                        useAppSelector((state) => state.theme.value)
  const [totalAreasCount, setTotalAreasCount] =   React.useState(0)
  const [cookies, ,removeCookie] =                useCookies(['access_token'])
  React.useEffect(() => {
    (async () => {
      try{
        const totalHistoryData = await get('getTotalAreasCount',cookies.access_token)
        if(!totalHistoryData.error){
          setTotalAreasCount(totalHistoryData.data)
        }
      }catch(err){
        console.log(err)
      }
    })()
  }, [])

  const startChecklist = () => {
    if(totalAreasCount) {
      clearFilleChecklistdData(totalAreasCount)
      localStorage.removeItem('photos')
      localStorage.setItem('startDate', getCurrentDate())
      localStorage.setItem('startTime', getCurrentTime())
      navigate('/ChecklistRoutes?route=1&page=1&progress=1')
    }else{
      localStorage.clear()
      removeCookie('access_token')
      navigate('/')
    }
  }

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Card style={{backgroundColor: defaultPageTheme ? '#191919' : 'white'}} className='StartPageCard'>
        <div style={{color: defaultPageTheme? 'white': 'black'}} className='CardTitle'>Begin Checklist</div>
        <div className='CardButton'>
          <ConfigProvider theme={{
            token: {
              colorPrimary: defaultPageTheme? '#2a2a2a': 'primary',
            },
          }}>
            <Button onClick={startChecklist} type='primary'>Start</Button>
          </ConfigProvider>
        </div>
      </Card>
    </div>
  )
}

export default ChecklistStartPage
