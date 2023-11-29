/* eslint-disable max-len */
import React                          from 'react'
import { Card, Avatar, FormInstance } from 'antd'
import Meta                           from 'antd/es/card/Meta'
import { EmployeesType }              from '../../../types/globalTypes'

type VisitorsSelectCardProps = {
    name:                 string;
    lastName:             string;
    occupation:           string;
    item:                 EmployeesType
    setSelectedVisitors:  React.Dispatch<React.SetStateAction<EmployeesType[] | undefined>>
    form:                 FormInstance<any>
}

const VisitorsSelectCard = ({name, lastName, occupation, item, setSelectedVisitors, form}:VisitorsSelectCardProps) => {
  const [isSelected, setIsSelected] = React.useState(false)

  const handleCardClick = () => {
    setSelectedVisitors((prevSelectedVisitors) => {
      if (isSelected) {
        const updatedSelectedVisitors = prevSelectedVisitors?.filter(
          (selectedItem) => selectedItem !== item
        )

        form.setFieldsValue({
          visitors: updatedSelectedVisitors?.map((visitor) => ({ idType: null, selectedVisitor: visitor })),
        })
        return updatedSelectedVisitors || []
      } else {
        const updatedSelectedVisitors = [...(prevSelectedVisitors || []), item]
        form.setFieldsValue({
          visitors: updatedSelectedVisitors.map((visitor) => ({ idType: null, selectedVisitor: visitor })),
        })
        return updatedSelectedVisitors
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