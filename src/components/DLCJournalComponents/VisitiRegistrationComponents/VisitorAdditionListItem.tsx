/* eslint-disable max-len */
import React                          from 'react'
import { Avatar, Card, Form, List }   from 'antd'
import { EmployeesType, VisitsType }  from '../../../types/globalTypes'
import { useCookies }                 from 'react-cookie'
import { useParams }                  from 'react-router'
import Meta                           from 'antd/es/card/Meta'
import { UserAddOutlined }            from '@ant-design/icons'
import { post }                       from '../../../Plugins/helpers'
import useSetWindowsSize from '../../../Plugins/useSetWindowsSize'
import HighlightText from '../../UniversalComponents/HighlightText'

type VisitorAdditionListItemProps = {
    item:                 EmployeesType
    addVisitor:           (id:number) => void
    removeVisitor:        (id:number) => void
    photoFolder:          string;
    clientsEmployees?:    EmployeesType[] | undefined
    setClientsEmployees?: React.Dispatch<React.SetStateAction<EmployeesType[] | undefined>>
    searchEmployeeValue:  string | undefined
}

const VisitorAdditionListItem = ({item, addVisitor, photoFolder, clientsEmployees, setClientsEmployees, searchEmployeeValue}: VisitorAdditionListItemProps) => {
  const [cookies]   = useCookies(['access_token'])
  const {id}        = useParams()
  const form        = Form.useFormInstance<VisitsType>()
  const visitor     = Form.useWatch('visitors', form)
  const windowSize  = useSetWindowsSize()
  const addVisitingClient = async() => {
    const updatedVisitors = [...(visitor || []), { idType: undefined, selectedVisitor: item }]
    addVisitor(Number(item.employeeId))
    form.setFieldsValue({
      visitors: updatedVisitors,
    })

    const filter = clientsEmployees?.filter((el) => el.employeeId !== item.employeeId)

    if(setClientsEmployees){
      setClientsEmployees(filter)
    }

    if (id) {
      await post(`updateVisitorList?visitId=${id}`, item, cookies.access_token)
    }

  }

  return (
    <List.Item>
      <Card
        className='VisitorAdditionCard'
        style={{ margin: '10px', width: windowSize > 600 ? 450 : 220 }}
        actions={id ? [ <UserAddOutlined onClick={addVisitingClient} key='add' />] : [
          <UserAddOutlined onClick={addVisitingClient} key='add' />,
        ]}
      >
        <Meta
          avatar={<Avatar shape='square' size={windowSize > 600 ? 90 : 40} src={ item.employeePhoto ? `${photoFolder}${item.employeePhoto}` : `${photoFolder}noUserImage.jpeg`} />}
          title={<p style={{fontSize: windowSize > 600 ? '15px' : '12px'}}>{HighlightText(searchEmployeeValue, item.name)} {HighlightText(searchEmployeeValue, item.lastName)}</p>}
          description={<p style={{fontSize: windowSize > 600 ? '12px' : '10px'}}>{item.occupation}</p>}
        />
      </Card>
    </List.Item>
  )
}

export default VisitorAdditionListItem