/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import { Avatar, Divider, List, Skeleton } from 'antd'

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
}

const ClientsEmployeeList = ({list}: ClientsEmployeeListProps) => {
  return (
    <div>
      <Divider>Darbuotojai</Divider>
      <List
        className='demo-loadmore-list'
        itemLayout='horizontal'
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={ item.employeePhoto ? item.employeePhoto : '../Images/UserLogo.png'}/>}
              title={<div>{item.name}</div>}
              description={item.occupation}
            />
            <div style={{width: '150px'}}>
              <strong>Darbuotojo leidimai: </strong>
              {item.permissions.map((el) => <div>{el}</div>)}
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ClientsEmployeeList