/* eslint-disable max-len */
import { Card, Divider }    from 'antd'
import RacksList            from './RacksList'
import { FullSiteData }     from '../../../../types/globalTypes'
import { useAppSelector }   from '../../../../store/hooks'
import { selectPremises }   from '../../../../auth/SingleCompanyReducer/selector'

type ColocationViewProps = {
  site: FullSiteData
}

const EditableCompaniesRacks = ({ site }:ColocationViewProps) => {
  const companyPremise    = useAppSelector(selectPremises)
  return (
    <div>
      <Divider>{site.name}</Divider>
      <Card className='CollocationDisplayCard' >
        {companyPremise?.map((premise, i) =>
          <div key={i}>
            <RacksList premise={premise}/>
          </div>
        )}
      </Card>
    </div>
  )
}

export default EditableCompaniesRacks