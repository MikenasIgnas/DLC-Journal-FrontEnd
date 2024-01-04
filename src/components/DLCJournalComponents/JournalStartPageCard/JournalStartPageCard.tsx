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
      className='JournalStartPageCard'
    >
      <Button type='link' className='JournalStartPageCardButton' onClick={() => navigate(navigateLink)} icon={icon}>{buttonText}</Button>
    </Card>
  )
}

export default JournalStartPageCard