/* eslint-disable max-len */
import React                          from 'react'
import { Card, Avatar, Form }         from 'antd'
import Meta                           from 'antd/es/card/Meta'
import { EmployeesType, VisitsType }  from '../../../types/globalTypes'
import { useParams }                  from 'react-router-dom'
import { post }                       from '../../../Plugins/helpers'
import { useCookies }                 from 'react-cookie'

type VisitorsSelectCardProps = {
    name:           string;
    lastName:       string;
    occupation:     string;
    item:           EmployeesType
    setPermissions: React.Dispatch<React.SetStateAction<string[]>> | undefined
    addVisitor:     (id:number) => void
    removeVisitor:  (id:number) => void

}

const VisitorsSelectCard = ({name, lastName, occupation, item, addVisitor, removeVisitor}:VisitorsSelectCardProps) => {
  const [isSelected, setIsSelected] = React.useState(false)
  const [cookies]                   = useCookies(['access_token'])
  const { id }                      = useParams()
  const form                        = Form.useFormInstance<VisitsType>()
  const visitor                     = Form.useWatch('visitors', form)
  const handleCardClick = async () => {
    if (!isSelected) {
      const updatedVisitors = [...(visitor || []), { idType: undefined, selectedVisitor: item }]
      addVisitor(Number(item.employeeId))
      form.setFieldsValue({
        visitors: updatedVisitors,
      })
    } else {
      removeVisitor(Number(item.employeeId))
      const updatedVisitors = (visitor || []).filter(obj => obj.selectedVisitor.employeeId !== item.employeeId)
      form.setFieldsValue({
        visitors: updatedVisitors,
      })
    }

    if (id) await post(`updateVisitorList?visitId=${id}`, item, cookies.access_token)
    setIsSelected((prev) => !prev)
  }

  return (
    <Card className={isSelected ? 'VisitorsCardSelected' : 'VisitorsCardDeselected' } onClick={() => handleCardClick()}>
      <Meta
        avatar={<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' />}
        title= {`${name} ${lastName}`}
        description={occupation}
      />
    </Card>
  )
}

export default VisitorsSelectCard