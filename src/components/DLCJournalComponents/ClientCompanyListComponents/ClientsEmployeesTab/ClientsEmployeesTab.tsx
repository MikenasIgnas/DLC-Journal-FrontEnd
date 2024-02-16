/* eslint-disable max-len */
import React                              from 'react'
import ClientsEmployeeList                from './ClientsEmployeeList'
import EmployeesAdditionModal             from './EmployeeAdditionModal'
import { Button }                         from 'antd'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setOpenEmployeeAdditionModal }   from '../../../../auth/ModalStateReducer/ModalStateReducer'
import { EmployeesType }                  from '../../../../types/globalTypes'


type ClientsEmployeesTabProps = {
  companyName:            string | undefined;
  list:                   EmployeesType[]
  employeeRemoved:        (id: string) => void
  setEditClientsEmployee: React.Dispatch<React.SetStateAction<boolean>>
  editClientsEmployee:    boolean
  setEmployeesList:       React.Dispatch<React.SetStateAction<EmployeesType[]>>
}

const ClientsEmployeesTab = ({
  companyName,
  editClientsEmployee,
  employeeRemoved,
  list,
  setEditClientsEmployee,
  setEmployeesList,
}: ClientsEmployeesTabProps) => {
  const dispatch                  = useAppDispatch()
  const openEmployeeAdditionModal = useAppSelector((state) => state.modals.openEmployeeAdditionModal)

  return (
    <div className='ClientsEmployeesTabContainer'>
      <div className='EmployeeAdditionButton'>
        <Button onClick={() => dispatch(setOpenEmployeeAdditionModal(true))}>Pridėti darbuotoją</Button>
      </div>
      {openEmployeeAdditionModal && <EmployeesAdditionModal urlPath={'company/companyEmployee'}/>}
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