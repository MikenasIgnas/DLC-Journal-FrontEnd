/* eslint-disable max-len */
import React              from 'react'

type CollapsePannelHeaderProps = {
  duty:         string,
  problemCount: number | undefined,
}

const CollapsePannelHeader = ({problemCount, duty}:CollapsePannelHeaderProps) => {
  return (
    <div className='CollapsePannelHeader'>
      <div>{duty}</div>
      <div style={{display: 'flex'}}>
        <div>Problemos:</div>
        <div style={{color: problemCount && problemCount > 0 ? 'red' : '' }}>{problemCount}</div>
      </div>
    </div>
  )
}

export default CollapsePannelHeader