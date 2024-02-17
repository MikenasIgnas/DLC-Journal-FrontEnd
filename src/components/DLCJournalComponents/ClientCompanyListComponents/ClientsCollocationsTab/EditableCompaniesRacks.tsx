/* eslint-disable max-len */
import {
  Card,
  Divider,
}                           from 'antd'

import { FullSiteData }     from '../../../../types/globalTypes'
import EditableRacksList    from './EditableRacksList'

type ColocationViewProps = {
  site: FullSiteData
}

const EditableCompaniesRacks = ({ site }:ColocationViewProps) => {
  return (
    <div>
      <Divider>{site.name}</Divider>
      <Card className='CollocationDisplayCard' >
        {site.premises?.map((premise, i) =>
          <div key={i}>
            <EditableRacksList premise={premise}/>
          </div>
        )}
      </Card>
    </div>
  )
}

export default EditableCompaniesRacks