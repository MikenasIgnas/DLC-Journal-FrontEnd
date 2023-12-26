/* eslint-disable max-len */
import React                        from 'react'
import { Col, Input, Modal, Row }   from 'antd'
import VisitorsSelectCard           from './VisitorsSelectCard'
import { EmployeesType }            from '../../../types/globalTypes'

type VisitorAdditionModalProps = {
    open:                 boolean
    clientsEmployees:     EmployeesType[] | undefined
    setOpen:              (value: React.SetStateAction<boolean>) => void
    searchEmployee:       (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    searchEmployeeValue:  string | undefined
    setPermissions?:      React.Dispatch<React.SetStateAction<string[]>>
    addVisitor:           (id:number) => void
    removeVisitor:        (id:number) => void
}

const VisitorAdditionModal = ({
  open,
  clientsEmployees,
  setOpen,
  searchEmployee,
  searchEmployeeValue,
  setPermissions,
  addVisitor,
  removeVisitor,
}: VisitorAdditionModalProps) => {
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
            setPermissions={setPermissions}
            name={employee.name}
            lastName={employee.lastName}
            occupation={employee.occupation}
            item={employee}
            addVisitor={addVisitor}
            removeVisitor={removeVisitor}
          />
        </Col>
          )}
        </Row>
      </Modal>
    </div>
  )
}

export default VisitorAdditionModal