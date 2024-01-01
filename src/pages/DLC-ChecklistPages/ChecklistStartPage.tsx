/* eslint-disable max-len */
import React                                                            from 'react'
import { Button, Card }                                                 from 'antd'
import { useNavigate }                                                  from 'react-router-dom'
import { clearFilleChecklistdData, get,getCurrentDate,getCurrentTime }  from '../../Plugins/helpers'
import { useCookies }                                                   from 'react-cookie'

const ChecklistStartPage = () => {
  const navigate                              = useNavigate()
  const [totalAreasCount, setTotalAreasCount] = React.useState(0)
  const [cookies, ,removeCookie]              = useCookies(['access_token'])

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
      navigate('/DLC Checklistas/Checklistas?route=1&page=1&progress=1')
    }else{
      localStorage.clear()
      removeCookie('access_token')
      navigate('/')
    }
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px'}}>
      <Card className='StartPageCard'>
        <div className='CardTitle'>Pradėti Pildymą</div>
        <div className='CardButton'>
          <Button onClick={startChecklist} type='primary'>Pradėti</Button>
        </div>
      </Card>
    </div>
  )
}

export default ChecklistStartPage