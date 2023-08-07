import React from 'react'
import { Link } from 'react-router-dom'

type VisitListItemTitleProps = {
    itemId: string;
    title: string;
    visitorsName: string;
}

const VisitListItemTitle = ({itemId, title, visitorsName}: VisitListItemTitleProps) => {
  return (
    <div style={{display: 'flex'}}>
      <Link to={`/SingleVisitPage/${itemId}`}>{title}</Link>
      <div>{visitorsName}</div>
    </div>
  )
}

export default VisitListItemTitle