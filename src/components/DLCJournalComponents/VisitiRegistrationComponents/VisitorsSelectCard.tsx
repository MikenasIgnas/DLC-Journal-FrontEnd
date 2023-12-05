/* eslint-disable max-len */
import React                          from 'react'
import { Card, Avatar, FormInstance } from 'antd'
import Meta                           from 'antd/es/card/Meta'
import { EmployeesType }              from '../../../types/globalTypes'
import { useParams }                  from 'react-router-dom'
import { post }                       from '../../../Plugins/helpers'
import { useCookies }                 from 'react-cookie'

type VisitorsSelectCardProps = {
    name:                 string;
    lastName:             string;
    occupation:           string;
    item:                 EmployeesType
    setSelectedVisitors:  React.Dispatch<React.SetStateAction<any[] | undefined>>
    form:                 FormInstance<any>
}

const VisitorsSelectCard = ({name, lastName, occupation, item, setSelectedVisitors, form}:VisitorsSelectCardProps) => {
  const [isSelected, setIsSelected] = React.useState(false)
  const [cookies]                   = useCookies(['access_token'])
  const { id }                      = useParams()

  const handleCardClick = async () => {
    if (!id) {
      setSelectedVisitors((prevSelectedVisitors) => {
        const updatedSelectedVisitors = isSelected
          ? prevSelectedVisitors?.filter((selectedItem) => selectedItem !== item)
          : [...(prevSelectedVisitors || []), item]

        form.setFieldsValue({
          visitors: updatedSelectedVisitors?.map((visitor) => ({ idType: null, selectedVisitor: visitor })),
        })

        return updatedSelectedVisitors || []
      })
    }

    if (id) {
      await post(`updateVisitorList?visitId=${id}`, item, cookies.access_token)
      setSelectedVisitors((prevSelectedVisitors) => {
        const updatedSelectedVisitors = isSelected
          ? prevSelectedVisitors?.filter((selectedItem) => selectedItem !== item)
          : [...(prevSelectedVisitors || []), item]

        return updatedSelectedVisitors
      })
    }
    setIsSelected((prev) => !prev)
  }
  return (
    <Card style={{ width: 300, marginTop: 16, border: isSelected ? '2px solid blue' : '1px solid #e8e8e8'}} onClick={() => handleCardClick()}>
      <Meta
        avatar={<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' />}
        title= {`${name} ${lastName}`}
        description={occupation}
      />
    </Card>
  )
}

export default VisitorsSelectCard