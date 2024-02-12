/* eslint-disable max-len */
import { Button }                 from 'antd'
import useVisitValidation         from './useVisitValidation'
import SuccessMessage             from '../../UniversalComponents/SuccessMessage'
import { VisitStatus, Visitors }  from '../../../types/globalTypes'
import { useAppSelector }         from '../../../store/hooks'

type VisitStatusButtonProps = {
  visitors:       Visitors[]
  visitStatuses:  VisitStatus[] | undefined
  fetchData:      () => Promise<void>
}

const VisitStatusButton = ({ visitors, visitStatuses, fetchData }: VisitStatusButtonProps) => {
  const { validate, contextHolder } = useVisitValidation()
  const visitData                   = useAppSelector((state) => state.visit.visit)
  const startVisit = async() => {
    validate(visitData, visitors, 'visit/start', 'Vizitas Pradėtas!', visitStatuses?.[0], fetchData)
  }

  const endVisit = async() => {
    validate(visitData, visitors, 'visit/end', 'Vizitas Baigtas!', visitStatuses?.[2], fetchData)
  }


  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <div style={{ width: '30%', display: 'flex', justifyContent: 'space-around'}}>
        {!visitData?.startDate && (
          <Button onClick={startVisit}>Pradėti Vizitą</Button>
        )}
        {visitData?.startDate && visitData?.endDate && (
          <Button onClick={endVisit}>Baigti Vizitą</Button>
        )}
      </div>
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default VisitStatusButton