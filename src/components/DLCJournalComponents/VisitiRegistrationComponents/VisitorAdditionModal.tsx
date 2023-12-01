/* eslint-disable max-len */
import { Col, FormInstance, Input, Modal, Row } from 'antd'
import React from 'react'
import VisitorsSelectCard from './VisitorsSelectCard'
import { EmployeesType } from '../../../types/globalTypes'


type VisitorAdditionModalProps = {
    open: boolean
    clientsEmployees:  EmployeesType[] | undefined
    form: FormInstance<any>
    setOpen: (value: React.SetStateAction<boolean>) => void
    searchEmployee: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    setSelectedVisitors: React.Dispatch<React.SetStateAction<EmployeesType[] | undefined>>
    searchEmployeeValue: string | undefined
}

const VisitorAdditionModal = ({open, clientsEmployees, form, setOpen, searchEmployee, setSelectedVisitors, searchEmployeeValue}: VisitorAdditionModalProps) => {
  return (
    <div>
      <Modal
        title='Ieškoti darbuotojo'
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={'85%'}
      >
        <Input onChange={searchEmployee}/>
        <Row gutter={[16, 16]}>
          {clientsEmployees?.map((employee) => (!searchEmployeeValue || employee.name.toLowerCase().includes(searchEmployeeValue)) &&
        <Col key={employee.employeeId} span={6}>
          <VisitorsSelectCard
            form={form}
            setSelectedVisitors={setSelectedVisitors}
            name={employee.name}
            lastName={employee.lastName}
            occupation={employee.occupation}
            item={employee}
          />
        </Col>
          )}
        </Row>
      </Modal>
    </div>
  )
}

export default VisitorAdditionModal