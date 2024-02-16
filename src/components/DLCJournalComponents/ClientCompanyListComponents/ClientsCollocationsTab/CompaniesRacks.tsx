import { Card, Divider }   from 'antd'
import { FullSiteData }    from '../../../../types/globalTypes'
import { useAppSelector }  from '../../../../store/hooks'
import { selectPremises }  from '../../../../auth/SingleCompanyReducer/selector'
import EditableRacksList   from './EditableRacksList'

type ColocationViewProps = {
  site: FullSiteData
}

const CompaniesRacks = ({ site }:ColocationViewProps) => {
  const companyPremise    = useAppSelector(selectPremises)
  return (
    <div>
      <Divider>{site.name}</Divider>
      <Card className='CollocationDisplayCard' >
        {companyPremise?.map((premise, i) =>
          <div key={i}>
            <EditableRacksList premise={premise}/>
          </div>
        )}
      </Card>
    </div>
  )
}

export default CompaniesRacks