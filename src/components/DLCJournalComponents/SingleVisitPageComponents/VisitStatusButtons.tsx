/* eslint-disable max-len */
import { Button }                            from 'antd'
import useVisitValidation                    from './useVisitValidation'
import SuccessMessage                        from '../../UniversalComponents/SuccessMessage'
import { VisitStatus, Visitors, VisitsType } from '../../../types/globalTypes'

type VisitStatusButtonProps = {
  visitors:       Visitors[]
  visitData:      VisitsType | undefined
  visitStatuses:  VisitStatus[] | undefined
  fetchData:      () => Promise<void>
}

const VisitStatusButton = ({ visitData, visitors, visitStatuses, fetchData }: VisitStatusButtonProps) => {
  const { validate, contextHolder } = useVisitValidation()

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