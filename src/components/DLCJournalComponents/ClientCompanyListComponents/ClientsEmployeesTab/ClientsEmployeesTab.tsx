/* eslint-disable max-len */
import React                              from 'react'
import ClientsEmployeeList                from './ClientsEmployeeList'
import EmployeesAdditionModal             from './EmployeeAdditionModal'
import { Button }                         from 'antd'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setOpenEmployeeAdditionModal }   from '../../../../auth/ModalStateReducer/ModalStateReducer'



type EmployeesType = {
  _id:            string;
  companyId:      number;
  name:           string;
  lastName:       string;
  occupation:     string;
  employeeId:     number;
  permissions:    string[];
  employeePhoto:  string
}
type ClientsEmployeesTabProps = {
    companyName:            string | undefined;
    list:                   EmployeesType[]
    employeeRemoved:        (id: number) => void
    setEditClientsEmployee: React.Dispatch<React.SetStateAction<boolean>>
    editClientsEmployee:    boolean
    companyId:              number | undefined
    setEmployeesList:       React.Dispatch<React.SetStateAction<EmployeesType[]>>
  }
const ClientsEmployeesTab = ({companyName, editClientsEmployee, employeeRemoved, list, setEditClientsEmployee, companyId, setEmployeesList }: ClientsEmployeesTabProps) => {
  const dispatch = useAppDispatch()
  const openEmployeeAdditionModal = useAppSelector((state) => state.modals.openEmployeeAdditionModal)
  return (
    <div className='ClientsEmployeesTabContainer'>
      <div className='EmployeeAdditionButton'>
        <Button onClick={() => dispatch(setOpenEmployeeAdditionModal(true))}>Pridėti darbuotoją</Button>
      </div>
      {openEmployeeAdditionModal &&
      <EmployeesAdditionModal
        companyName={companyName}
        companyId={companyId as number | null}
        urlPath={'addEmployee'}
      />
      }
      <ClientsEmployeeList
        setEmployeesList={setEmployeesList}
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