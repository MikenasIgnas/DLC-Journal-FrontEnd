import React                 from 'react'
import { Card }              from 'antd'
import { Link, useNavigate } from 'react-router-dom'

type JournalStartPageCardProps = {
    navigateLink: string;
    buttonText:   string;
}

const JournalStartPageCard = ({navigateLink, buttonText}:JournalStartPageCardProps) => {
  const navigate = useNavigate()
  return (
    <Card
      hoverable={true}
      onClick={()=> navigate(navigateLink)}
      style={{
        width:      '400px',
        height:     '150px',
        fontSize:   '25px',
        textAlign:  'center',
        display:    'flex',
        alignItems: 'center',
        margin:     '20px',
      }}>
      <Link to={navigateLink}>{buttonText}</Link>
    </Card>
  )
}

export default JournalStartPageCard