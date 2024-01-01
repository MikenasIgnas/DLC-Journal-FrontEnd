/* eslint-disable max-len */
import React            from 'react'
import { Button, Card } from 'antd'
import { useNavigate }  from 'react-router-dom'

type JournalStartPageCardProps = {
    navigateLink: string;
    buttonText:   string;
    icon:         React.ReactNode
}

const JournalStartPageCard = ({navigateLink, buttonText, icon}:JournalStartPageCardProps) => {
  const navigate = useNavigate()
  return (
    <Card
      hoverable={true}
      onClick={()=> navigate(navigateLink)}
      style={{
        width:      '350px',
        height:     '150px',
        fontSize:   '25px',
        textAlign:  'center',
        display:    'flex',
        alignItems: 'center',
        margin:     '20px',
      }}>
      <Button type='link' style={{fontSize: '25px'}} onClick={() => navigate(navigateLink)} icon={icon}>{buttonText}</Button>
    </Card>
  )
}

export default JournalStartPageCard