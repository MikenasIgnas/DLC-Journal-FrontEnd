/* eslint-disable max-len */
import React                from 'react'
import ClientsEmployeeList  from '../ClientsEmployeeList'
import { EmployeesType, ModalStateType }    from '../../../../types/globalTypes'
import EmployeesAdditionModal from '../EmployeeAdditionModal'
import { Button } from 'antd'

type ClientsEmployeesTabProps = {
    companyName:            string | undefined;
    list:                   EmployeesType[] | undefined
    employeeRemoved:        (id: string) => void
    setEditClientsEmployee: React.Dispatch<React.SetStateAction<boolean>>
    editClientsEmployee:    boolean
    modalState: ModalStateType
    companyId: string | undefined
    setModalState: React.Dispatch<React.SetStateAction<ModalStateType>>
  }
const ClientsEmployeesTab = ({companyName, editClientsEmployee, employeeRemoved, list, setEditClientsEmployee, modalState, companyId, setModalState}: ClientsEmployeesTabProps) => {
  return (

    <div style={{width: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: '50%', display: 'flex',justifyContent: 'center'}}>
        <Button onClick={() => setModalState({...modalState, isEmployeeAdditionModalOpen: true})}>Pridėti darbuotoją</Button>
      </div>
      {modalState.isEmployeeAdditionModalOpen &&
        <EmployeesAdditionModal
          companyName={companyName}
          companyId={companyId as string | null}
          urlPath={'addEmployee'}
          setModalState={setModalState}
          modalState={modalState}
        />
      }
      <ClientsEmployeeList
        setEditClientsEmployee={setEditClientsEmployee}
        editClientsEmployee={editClientsEmployee}
        companyName={companyName}
        list={list}
        employeeRemoved={employeeRemoved}
      />
    </div>
  )
}

export default ClientsEmployeesTab