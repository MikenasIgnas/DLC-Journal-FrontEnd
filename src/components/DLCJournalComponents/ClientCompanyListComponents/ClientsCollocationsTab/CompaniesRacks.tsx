import React                from 'react'
import RacksList            from './RacksList'
import {
  Card,
  Divider,
  Empty,
}                           from 'antd'
import { FullSiteData }     from '../../../../types/globalTypes'

import {
  useAppDispatch,
  useAppSelector,
}                           from '../../../../store/hooks'

import { selectPremises }   from '../../../../auth/SingleCompanyReducer/selector'
import { useSearchParams }  from 'react-router-dom'
import { setSiteId }        from '../../../../auth/SingleCompanyReducer/SingleCompanyReducer'

type ColocationViewProps = {
  site: FullSiteData
}

const CompaniesRacks = ({ site }:ColocationViewProps) => {
  const companyPremise                  = useAppSelector(selectPremises)
  const [searchParams, setSearchParams] = useSearchParams()
  const tabKey                          = searchParams.get('tabKey')
  const dispatch                        = useAppDispatch()

  React.useEffect(() => {
    setSearchParams(`siteId=${site._id}&tabKey=${tabKey}`)
    dispatch(setSiteId(site._id))
  },[])

  return (
    <div>
      { companyPremise &&
      <>
        <Divider>{site.name}</Divider>
        {companyPremise && companyPremise?.length > 0 ?
          <Card className='CollocationDisplayCard' >
            {companyPremise?.map((premise, i) =>
              <div key={i}>
                <RacksList premise={premise}/>
              </div>
            )}
            <div>Kolokacijos J13 {companyPremise.length}</div>
          </Card>
          : <Empty description='Įmonė spintų neturi' image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </>
      }
    </div>
  )
}

export default CompaniesRacks