/* eslint-disable max-len */
import React                from 'react'
import { useSearchParams }  from 'react-router-dom'
import { useAppSelector }   from '../../../store/hooks'

const PremiseName = () => {
  const [searchParams]      = useSearchParams()
  const currentPageUrlParam = Number(searchParams.get('page'))
  const areas               = useAppSelector((state) => state.fetchedData.areas)
  const premiseNameItem     = areas?.find((area) => area.id === currentPageUrlParam)

  return (
    <div className='PremiseNameContainer'>Patalpa: {premiseNameItem?.roomName}</div>
  )
}

export default PremiseName