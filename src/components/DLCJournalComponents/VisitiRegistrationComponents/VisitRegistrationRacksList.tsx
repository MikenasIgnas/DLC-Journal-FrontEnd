/* eslint-disable max-len */
import { Card }                           from 'antd'
import { useAppSelector }                 from '../../../store/hooks'
import { selectPremises }                 from '../../../auth/SitesReducer/selectors'
import { selectVisitingCompanyEmplyees }  from '../../../auth/VisitorEmployeeReducer/selectors'
import VisitRegistrationRacks             from './VisitRegistrationRacksCheckboxGroup'

const VisitRegistrationRacksList = () => {
  const companyPremise    = useAppSelector(selectPremises)
  const visitingEmployees = useAppSelector(selectVisitingCompanyEmplyees)
  console.log(companyPremise)
  return (
    <>
      { visitingEmployees.length > 0 &&
      <Card title='Kolokacijos' className='CollocationsListCard'>
        {companyPremise?.map((el) =>
          <VisitRegistrationRacks premise={el} key={el._id}/>
        )}
      </Card>
      }
    </>
  )
}

export default VisitRegistrationRacksList