/* eslint-disable max-len */
import React              from 'react'
import { useAppSelector } from '../../store/hooks'

type CollapsePannelHeaderProps = {
  duty:         string,
  problemCount: number | undefined,
}

const CollapsePannelHeader = ({problemCount, duty}:CollapsePannelHeaderProps) => {
  const defaultPageTheme =        useAppSelector((state) => state.theme.value)

  return (
    <div style={{color: defaultPageTheme ? 'white': 'black'}} className='CollapsePannelHeader'>
      <div>{duty}</div>
      <div style={{display: 'flex'}}>
        <div>Problemos:</div>
        <div style={{color: problemCount && problemCount > 0 ? 'red' : '' }}>{problemCount}</div>
      </div>
    </div>
  )
}

export default CollapsePannelHeader