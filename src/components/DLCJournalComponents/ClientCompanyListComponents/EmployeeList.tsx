/* eslint-disable max-len */
import react from 'react'
import { Avatar, Button, List } from 'antd'
import { EmployeesType } from '../../../types/globalTypes'

type EmployeeListProps = {
    subClientEmployees: EmployeesType[] | undefined;
    deleteSubClientEmployee: (companyId: string | undefined, employeeId: string | undefined) => void
}

const EmployeeList = ({subClientEmployees, deleteSubClientEmployee}:EmployeeListProps) => {

  return (
    <List
      dataSource={subClientEmployees}
      bordered
      renderItem={(item) => (
        <List.Item
          key={item.employeeId}
          actions={[
            <Button type='link' key={item.employeeId}>
          Peržiūrėti
            </Button>,
            <Button type='link' onClick={() => deleteSubClientEmployee(item.companyId, item.employeeId)} key={item.employeeId}>
              Ištrinti
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar src={
                <img
                  src={`../ClientsEmployeesPhotos/${item.employeePhoto ? item.employeePhoto: 'noUserImage.jpeg'}`}
                  alt='err' />}
              />}
            title={`${item.name} ${item.lastName}`}
            description={item.occupation}
          />
        </List.Item>
      )}
    />
  )
}

export default EmployeeList