/* eslint-disable max-len */
import { Card, Avatar } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { EmployeesType } from '../../../types/globalTypes'

type VisitorsSelectCardProps = {
    name:       string;
    lastName:   string;
    occupation: string;
    item:       EmployeesType
    setSelectedVisitors: React.Dispatch<React.SetStateAction<EmployeesType[] | undefined>>
}

const VisitorsSelectCard = ({name, lastName, occupation, item, setSelectedVisitors}:VisitorsSelectCardProps) => {
  const [isSelected, setIsSelected] = React.useState(false)

  const handleCardClick = () => {
    setSelectedVisitors((prevSelectedVisitors) => {
      if (isSelected) {
        return prevSelectedVisitors?.filter((selectedItem) => selectedItem !== item) || []
      } else {
        return [...(prevSelectedVisitors || []), item]
      }
    })
    setIsSelected((prev) => !prev)
  }

  return (
    <Card style={{ width: 300, marginTop: 16, border: isSelected ? '2px solid blue' : '1px solid #e8e8e8'}} onClick={handleCardClick}>
      <Meta
        avatar={<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' />}
        title= {`${name} ${lastName}`}
        description={occupation}
      />
    </Card>
  )
}

export default VisitorsSelectCard