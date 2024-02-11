/* eslint-disable max-len */
import React                          from 'react'
import { Avatar, Card, Form, List }   from 'antd'
import { EmployeesType, VisitsType }  from '../../../types/globalTypes'
import { useCookies }                 from 'react-cookie'
import { useParams }                  from 'react-router'
import Meta                           from 'antd/es/card/Meta'
import { post }                       from '../../../Plugins/helpers'
import useSetWindowsSize              from '../../../Plugins/useSetWindowsSize'
import HighlightText                  from '../../UniversalComponents/HighlightText'

type VisitorAdditionListItemProps = {
    item:                 EmployeesType
    addVisitor:           (item: string | undefined) => void
    removeVisitor:        (id: string | undefined) => void
    photoFolder:          string;
    clientsEmployees:    EmployeesType[]
    setCompanyEmployees: React.Dispatch<React.SetStateAction<EmployeesType[]>>
    searchEmployeeValue:  string | undefined
}

const VisitorAdditionListItem = ({item, addVisitor, photoFolder, clientsEmployees, setCompanyEmployees, searchEmployeeValue}: VisitorAdditionListItemProps) => {
  const [cookies]   = useCookies(['access_token'])
  const {id}        = useParams()
  const form        = Form.useFormInstance<VisitsType>()
  const visitor     = Form.useWatch('visitors', form)
  const windowSize  = useSetWindowsSize()

  const addVisitingClient = async() => {
    try{

      const res = await post('visit/visitor', {visitId: id, employeeId: item._id}, cookies.access_token)
      addVisitor(res._id)

      if(!id){
        const updatedVisitors = [...(visitor || []), { idType: undefined, selectedVisitor: item }]
        form.setFieldsValue({
          visitors: updatedVisitors,
        })
      }

      const filter = clientsEmployees?.filter((el) => el._id !== item._id)

      if(setCompanyEmployees){
        setCompanyEmployees(filter)
      }
    }catch(err){
      console.log(err)
    }
  }


  return (
    <List.Item>
      <Card
        onClick={addVisitingClient}
        className='VisitorAdditionCard'
        style={{ margin: '10px', width: windowSize > 600 ? 300 : 220, cursor: 'pointer' }}
      >
        <Meta
          avatar={<Avatar shape='square' size={windowSize > 600 ? 90 : 40} src={ item.photo ? item.photo : `${photoFolder}noUserImage.jpeg`} />}
          title={<div style={{fontSize: windowSize > 600 ? '15px' : '12px'}}>{HighlightText(searchEmployeeValue, item.name)} {HighlightText(searchEmployeeValue, item.lastname)}</div>}
          description={<p style={{fontSize: windowSize > 600 ? '12px' : '10px'}}>{item.occupation}</p>}
        />
      </Card>
    </List.Item>
  )
}

export default VisitorAdditionListItem