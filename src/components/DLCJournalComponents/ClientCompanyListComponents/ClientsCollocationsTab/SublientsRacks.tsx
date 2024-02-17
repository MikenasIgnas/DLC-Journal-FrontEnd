/* eslint-disable max-len */
import React                    from 'react'

import {
  useAppDispatch,
  useAppSelector,
}                               from '../../../../store/hooks'

import { useSearchParams }      from 'react-router-dom'
import { selectPremises }       from '../../../../auth/SingleCompanyReducer/selector'
import { setSiteId }            from '../../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'
import { FullSiteData }         from '../../../../types/globalTypes'

import {
  Card,
  Divider,
  Empty,
}                               from 'antd'

import SubClientsRacksList      from './SubClientsRacksList'

type SublientsRacksProps = {
  site: FullSiteData
}

const SublientsRacks = ({site}: SublientsRacksProps) => {
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
                <SubClientsRacksList premise={premise}/>
              </div>
            )}
          </Card>
          : <Empty description='Įmonė spintų neturi' image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </>
      }
    </div>
  )
}

export default SublientsRacks