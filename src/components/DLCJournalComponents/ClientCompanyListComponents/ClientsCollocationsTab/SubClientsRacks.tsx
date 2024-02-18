import React                    from 'react'
import {
  Card,
  Divider,
  Empty,
}                               from 'antd'
import { FullSiteData }         from '../../../../types/globalTypes'

import {
  useAppDispatch,
  useAppSelector,
}                               from '../../../../store/hooks'

import { selectPremises }       from '../../../../auth/SingleCompanyReducer/subClientsSitesSelector'
import { useSearchParams }      from 'react-router-dom'

import {
  setCompanyId,
  setSiteId,
}                               from '../../../../auth/SingleCompanyReducer/subClientsReducer'
import SubClientsRacksDisplay   from './SubClientsRacksDisplay'

type ColocationViewProps = {
  site: FullSiteData
}

const SubClientsRacks = ({ site }:ColocationViewProps) => {
  const companyPremise                  = useAppSelector(selectPremises)
  const [searchParams, setSearchParams] = useSearchParams()
  const tabKey                          = searchParams.get('tabKey')
  const dispatch                        = useAppDispatch()
  const subClientId                     = searchParams.get('subClientId')

  React.useEffect(() => {
    if(subClientId){
      setSearchParams(`&subClientId=${subClientId}&siteId=${site._id}&tabKey=${tabKey}`)
      dispatch(setCompanyId(subClientId))
    }
    dispatch(setSiteId(site._id))
  },[site._id])

  return (
    <div>
      { companyPremise &&
      <>
        <Divider>{site.name}</Divider>
        {companyPremise && companyPremise?.length > 0 ?
          <Card className='CollocationDisplayCard' >
            {companyPremise?.map((premise, i) =>
              <div key={i}>
                <SubClientsRacksDisplay premise={premise}/>
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

export default SubClientsRacks