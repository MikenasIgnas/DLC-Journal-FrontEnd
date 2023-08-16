/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import { Avatar, Divider, List }    from 'antd'
import { useNavigate, useParams }              from 'react-router-dom'

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
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id)
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
              title={<div onClick={() => navigate(`/SingleClientsEmployeePage?companyId=${id}&employeeId=${item.employeeId}`)} style={{cursor: 'pointer'}}>{item.name}</div>}
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