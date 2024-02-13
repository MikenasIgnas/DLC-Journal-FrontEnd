/* eslint-disable max-len */
import { Card }            from 'antd'
import RacksCheckboxGroup  from './RacksCheckboxGroup'
import { useAppSelector }  from '../../../store/hooks'
import { useSearchParams } from 'react-router-dom'
import { selectPremises } from '../../../auth/SitesReducer/selectors'

const VisitRegistrationCollocationList = () => {
  const [searchParams]  = useSearchParams()
  const siteId          = searchParams.get('addressId')
  const companyPremise  = useAppSelector(selectPremises)



  return (
    <>
      { siteId &&
      <Card
        title='Kolokacijos'
        className='CollocationsListCard'
      >
        {companyPremise?.map((el) =>
          <RacksCheckboxGroup
            key={el._id}
            premise={el}
          />
        )}
      </Card>
      }
    </>
  )
}

export default VisitRegistrationCollocationList