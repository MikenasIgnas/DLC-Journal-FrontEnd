/* eslint-disable max-len */
import React                              from 'react'
import ClientsEmployeeList                from './ClientsEmployeeList'
import { EmployeesType }                  from '../../../../types/globalTypes'
import EmployeesAdditionModal             from './EmployeeAdditionModal'
import { Button }                         from 'antd'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setOpenEmployeeAdditionModal }   from '../../../../auth/ModalStateReducer/ModalStateReducer'

type ClientsEmployeesTabProps = {
    companyName:            string | undefined;
    list:                   EmployeesType[] | undefined
    employeeRemoved:        (id: number) => void
    setEditClientsEmployee: React.Dispatch<React.SetStateAction<boolean>>
    editClientsEmployee:    boolean
    companyId:              number | undefined
  }
const ClientsEmployeesTab = ({companyName, editClientsEmployee, employeeRemoved, list, setEditClientsEmployee, companyId }: ClientsEmployeesTabProps) => {
  const dispatch = useAppDispatch()
  return (
    <div className='ClientsEmployeesTabContainer'>
      <div className='EmployeeAdditionButton'>
        <Button onClick={() => dispatch(setOpenEmployeeAdditionModal(true))}>Pridėti darbuotoją</Button>
      </div>
      <EmployeesAdditionModal
        companyName={companyName}
        companyId={companyId as number | null}
        urlPath={'addEmployee'}
      />
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