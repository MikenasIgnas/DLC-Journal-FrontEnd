/* eslint-disable max-len */
import React                from 'react'

import {
  useAppDispatch,
  useAppSelector,
}                           from '../../../../store/hooks'

import { useSearchParams }  from 'react-router-dom'
import { selectPremises }   from '../../../../auth/SingleCompanyReducer/selector'
import { FullSiteData }     from '../../../../types/globalTypes'

import { Empty}             from 'antd'

import SubClientsRacksList  from './SubClientsRacksList'
import { setSiteId }        from '../../../../auth/SingleCompanyReducer/SingleCompanyReducer'
import { resetRacksReducer } from '../../../../auth/RacksReducer/RacksReducer'

type SublientsRacksProps = {
  site: FullSiteData
}

const SublientsRacks = ({site}: SublientsRacksProps) => {
  const companyPremise                  = useAppSelector(selectPremises)
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch                        = useAppDispatch()
  const tabKey                          = searchParams.get('tabKey')

  React.useEffect(() => {
    setSearchParams(`siteId=${site._id}&tabKey=${tabKey}`)
    dispatch(setSiteId(site._id))
    return () => {
      dispatch(resetRacksReducer())
    }
  },[])

  return (
    <div>
      <>
        {companyPremise && companyPremise?.length > 0 ?
          <>
            {companyPremise?.map((premise) =>
              <SubClientsRacksList key={premise._id} premise={premise}/>
            )}
          </>
          : <Empty description='Įmonė spintų neturi' image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </>
    </div>
  )
}

export default SublientsRacks