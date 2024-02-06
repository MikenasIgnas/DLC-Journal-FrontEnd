/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React               from 'react'
import { CompaniesType, Racks }           from '../../../types/globalTypes'
import { useCookies }      from 'react-cookie'
import { useAppSelector }  from '../../../store/hooks'
import { get }             from '../../../Plugins/helpers'
import { List }            from 'antd'
import RacksAdditionModal  from './RacksAdditionModal'
import RacksListItem       from './RacksListItem'

type RacksListItemProps = {
  premiseId: string
}

const RacksList = ({ premiseId }: RacksListItemProps) => {
  const [cookies]               = useCookies(['access_token'])
  const openRacksAdditionModal  = useAppSelector((state) => state.modals.openRacksAdditionModal)
  const [racks, setRacks]       = React.useState<Racks[]>([])
  const [companies, setCompanies] = React.useState<CompaniesType[]>()

  React.useEffect(() => {
    (async () => {
      try {
        const rackRes       = await get(`site/rack?premiseId=${premiseId}&page=1&limit=10`, cookies.access_token)
        const companiesRes  = await get('company/company', cookies.access_token)
        setCompanies(companiesRes)
        setRacks(rackRes)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [openRacksAdditionModal])

  const updateRacksList = (updatedRack: Racks) => {
    setRacks(prevRacks => {
      const updatedRacks = prevRacks.map(rack => rack._id === updatedRack._id ? updatedRack : rack)
      return updatedRacks
    })
  }

  return (
    <div>
      <List dataSource={racks} renderItem={(item) =>
        <RacksListItem
          companies={companies}
          item={item}
          premiseId={premiseId}
          racks={racks}
          setRacks={setRacks}
          updateRacksList={updateRacksList}
        />
      }/>
      <RacksAdditionModal/>
    </div>
  )
}

export default RacksList