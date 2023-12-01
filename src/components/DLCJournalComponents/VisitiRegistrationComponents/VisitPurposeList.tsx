/* eslint-disable max-len */
import { Card } from 'antd'
import React from 'react'
import VisitPurposeButtons from './VisitPurposeButtons'

type VisitPurposeListProps = {
    uniquePermissions: string[]
}

const VisitPurposeList = ({uniquePermissions}: VisitPurposeListProps) => {
  return (
    <Card style={{margin: '10px', backgroundColor: '#f9f9f9'}} title={'Vizito Tikslas'}>
      <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        {uniquePermissions?.map((el, i) => <VisitPurposeButtons buttonText={el} key={i} buttonWidth={(100 / uniquePermissions.length) - 5}/>)}
      </div>
    </Card>
  )
}

export default VisitPurposeList