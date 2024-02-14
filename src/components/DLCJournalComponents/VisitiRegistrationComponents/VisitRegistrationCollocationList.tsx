/* eslint-disable max-len */
import { Card }                           from 'antd'
// import RacksCheckboxGroup                 from './RacksCheckboxGroup'
import { useAppSelector }                 from '../../../store/hooks'
import { selectPremises }                 from '../../../auth/SitesReducer/selectors'
import { selectVisitingCompanyEmplyees }  from '../../../auth/VisitorEmployeeReducer/selectors'
import VisitRegistraTionRacksCheckboxGroup from './VisitRegistraTionRacksCheckboxGroup'

const VisitRegistrationCollocationList = () => {
  const companyPremise    = useAppSelector(selectPremises)
  const visitingEmployees = useAppSelector(selectVisitingCompanyEmplyees)
  return (
    <>
      { visitingEmployees.length > 0 &&
      <Card title='Kolokacijos' className='CollocationsListCard'>
        {companyPremise?.map((el) =>

          <VisitRegistraTionRacksCheckboxGroup premise={el} key={el._id}/>
          // <RacksCheckboxGroup key={el._id} premise={el}/>
        )}
      </Card>
      }
    </>
  )
}

export default VisitRegistrationCollocationList