/* eslint-disable max-len */
import { Button }             from 'antd'
import { get }                from '../../../Plugins/helpers'
import useVisitValidation     from './useVisitValidation'
import SuccessMessage         from '../../UniversalComponents/SuccessMessage'
import { useParams } from 'react-router'
import { useCookies } from 'react-cookie'
import { VisitsType } from '../../../types/globalTypes'

type VisitStatusButtonProps = {
  visitData: VisitsType[] | undefined
  fetchData: () => Promise<void>
  setVisitData: React.Dispatch<React.SetStateAction<VisitsType[] | undefined>>
}

const VisitStatusButton = ({visitData, setVisitData, fetchData}: VisitStatusButtonProps) => {
  const { validate, contextHolder }                         = useVisitValidation()
  const { id } = useParams()
  const [cookies] = useCookies(['access_token'])
  const startVisit = async() => {
    validate(visitData, fetchData, 'startVisit', 'Vizitas Pradėtas!')
  }
  const endVisit = async() => {
    validate(visitData, fetchData, 'endVisit', 'Vizitas Baigtas!')
  }

  const prepareVisit = async() => {
    try {
      const res = await get(`prepareVisit?visitId=${id}`, cookies.access_token)
      setVisitData(res.data)
      await fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <div style={{ width: '30%', display: 'flex', justifyContent: 'space-around'}}>
        {!visitData?.[0]?.startDate && !visitData?.[0]?.startTime && (
          <Button onClick={startVisit}>Pradėti Vizitą</Button>
        )}
        {visitData?.[0]?.startDate && visitData?.[0]?.startTime && (
          <Button onClick={prepareVisit}>Paruošti Vizitą</Button>
        )}
        {visitData?.[0]?.startDate && visitData?.[0]?.startTime && !visitData?.[0]?.endDate && !visitData?.[0]?.endTime && (
          <Button onClick={endVisit}>Baigti Vizitą</Button>
        )}
      </div>
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default VisitStatusButton