/* eslint-disable max-len */
import { Card }               from 'antd'
import RacksCheckboxGroup     from './RacksCheckboxGroup'
import { useAppSelector }     from '../../../store/hooks'
import { useSearchParams }    from 'react-router-dom'



const VisitRegistrationCollocationList = () => {
  const companyPremise = useAppSelector((state) => state.racks.premise)
  const [searchParams] = useSearchParams()
  const addressId = searchParams.get('addressId')
  return (
    <>
      {
        addressId &&
      <Card
        title='Kolokacijos'
        className='CollocationsListCard'
      >
        {companyPremise.map((el) =>
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