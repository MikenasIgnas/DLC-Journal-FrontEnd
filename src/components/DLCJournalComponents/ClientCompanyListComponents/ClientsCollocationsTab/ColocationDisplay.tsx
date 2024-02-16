/* eslint-disable max-len */
import { Card, Divider }    from 'antd'
import { Sites }            from '../../../../types/globalTypes'
import { useAppSelector }   from '../../../../store/hooks'
import CollocationListItems from './CollocationListItems'

type ColocationViewProps = {
  site: Sites
  companyRacks: string[] | undefined
}

const ColocationDisplay = ({ site, companyRacks }:ColocationViewProps) => {
  const premises = useAppSelector((state) => state.sites.premise)?.filter((el) => el.siteId === site._id )
  return (
    <div>
      {site && <Divider>{site.name}</Divider>}
      <Card className='CollocationDisplayCard' >
        {premises?.map((premise, i) =>
          <div key={i}>
            <CollocationListItems companyRacks={companyRacks} premise={premise}/>
          </div>
        )}
        {/* <div className='CollocationDisplayCounter'>
          <strong>{`Kolokacijos ${locationName}: ${locationData?.length}`}</strong>
          <strong>{`Spintos: ${totalItemCount}`}</strong>
        </div> */}
      </Card>
    </div>
  )
}

export default ColocationDisplay