/* eslint-disable max-len */
import { Avatar, Button, Divider, List }  from 'antd'
import { Link, useNavigate, useParams }   from 'react-router-dom'
import { get }                            from '../../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'

type EmployeesType = {
    _id:            string;
    companyId:      string;
    name:           string;
    lastName:       string;
    occupation:     string;
    employeeId:     string;
    permissions:    string[];
    employeePhoto?:  string
}

type ClientsEmployeeListProps = {
    list: EmployeesType[] | undefined
    companyName: string | undefined;
    companyRemoved: (id: string) => void
}

const ClientsEmployeeList = ({list, companyName, companyRemoved}: ClientsEmployeeListProps) => {
  const [cookies] = useCookies(['access_token'])
  const navigate = useNavigate()
  const {id} = useParams()

  const deleteEmployee = async(companyId: string, employeeId: string) => {
    await get(`deleteClientsEmployee?companyName=${companyName}&companyId=${companyId}&employeeId=${employeeId}`, cookies.access_token)
    companyRemoved(employeeId)
  }

  return (
    <div>
      <Divider>Darbuotojai</Divider>
      <List
        className='demo-loadmore-list'
        itemLayout='horizontal'
        dataSource={list}
        renderItem={(item) => {
          return (
            <List.Item
              key={item.companyId}
              actions={[
                <Link key={item.employeeId} to={`/SingleClientsEmployeePage?companyId=${id}&employeeId=${item.employeeId}`}>peržiūrėti</Link>,
                <Button key={item.employeeId} onClick={() => deleteEmployee(item.companyId, item.employeeId)} type='link'>ištrinti</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar
                  src={
                    <img
                      src={`../ClientsEmployeesPhotos/${item.employeePhoto ? item.employeePhoto : 'noUserImage.jpeg'}`}
                      alt='err' />}
                />}
                title={<div onClick={() => navigate(`/SingleClientsEmployeePage?companyId=${id}&employeeId=${item.employeeId}`)} style={{cursor: 'pointer'}}>{item.name}</div>}
                description={item.occupation}
              />
              <div style={{width: '150px'}}>
                <strong>Darbuotojo leidimai: </strong>
                {item.permissions.map((el, i) => <div key={i}>{el}</div>)}
              </div>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default ClientsEmployeeList