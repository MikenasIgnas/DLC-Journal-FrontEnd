/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React               from 'react'
import {
  CompaniesType,
  Racks,
}                          from '../../../types/globalTypes'
import { useCookies }      from 'react-cookie'
import { useAppSelector }  from '../../../store/hooks'
import { get }             from '../../../Plugins/helpers'
import { List, message }            from 'antd'
import RacksListItem       from './RacksListItem'
import SuccessMessage from '../../UniversalComponents/SuccessMessage'

type RacksListItemProps = {
  premiseId: string
}

const RacksList = ({ premiseId }: RacksListItemProps) => {
  const [cookies]                   = useCookies(['access_token'])
  const openRacksAdditionModal      = useAppSelector((state) => state.modals.openRacksAdditionModal)
  const [racks, setRacks]           = React.useState<Racks[]>([])
  const [companies, setCompanies]   = React.useState<CompaniesType[]>()
  const [messageApi, contextHolder] = message.useMessage()

  React.useEffect(() => {
    (async () => {
      try {
        const rackRes       = await get(`site/rack?premiseId=${premiseId}`, cookies.access_token)
        const companiesRes  = await get('company/company', cookies.access_token)
        setCompanies(companiesRes)
        setRacks(rackRes)
      } catch (error) {
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
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
      <List loading={racks.length > 0 ? false : true} style={{overflow: 'auto', maxHeight: '350px'}} dataSource={racks} renderItem={(item) =>
        <RacksListItem
          companies={companies}
          item={item}
          premiseId={premiseId}
          racks={racks}
          setRacks={setRacks}
          updateRacksList={updateRacksList}
        />
      }/>
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default RacksList