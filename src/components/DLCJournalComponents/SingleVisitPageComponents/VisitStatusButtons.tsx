import { Button }          from 'antd'
import useVisitValidation  from './useVisitValidation'
import SuccessMessage      from '../../UniversalComponents/SuccessMessage'
import { useAppSelector }  from '../../../store/hooks'


const VisitStatusButton = () => {
  const { validate, contextHolder } = useVisitValidation()
  const visitData                   = useAppSelector((state) => state.visit.visit)
  const visitStatuses               = useAppSelector((state) => state.visit.visitStatus)

  const startVisit = async() => {
    validate('visit/start', 'Vizitas Pradėtas!', visitStatuses?.[0])
  }

  const endVisit = async() => {
    validate('visit/end', 'Vizitas Baigtas!', visitStatuses?.[2])
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <div style={{ width: '30%', display: 'flex', justifyContent: 'space-around'}}>
        {!visitData?.startDate && (
          <Button onClick={startVisit}>Pradėti Vizitą</Button>
        )}
        {visitData?.startDate && !visitData?.endDate && (
          <Button onClick={endVisit}>Baigti Vizitą</Button>
        )}
      </div>
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default VisitStatusButton