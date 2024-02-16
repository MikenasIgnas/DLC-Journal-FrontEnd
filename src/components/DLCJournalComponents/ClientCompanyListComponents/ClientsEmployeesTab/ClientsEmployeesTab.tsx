/* eslint-disable max-len */
import ClientsEmployeeList                from './ClientsEmployeeList'
import EmployeesAdditionModal             from './EmployeeAdditionModal'
import { Button }                         from 'antd'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setOpenEmployeeAdditionModal }   from '../../../../auth/ModalStateReducer/ModalStateReducer'

const ClientsEmployeesTab = () => {
  const dispatch                  = useAppDispatch()
  const openEmployeeAdditionModal = useAppSelector((state) => state.modals.openEmployeeAdditionModal)

  return (
    <div className='ClientsEmployeesTabContainer'>
      <div className='EmployeeAdditionButton'>
        <Button onClick={() => dispatch(setOpenEmployeeAdditionModal(true))}>Pridėti darbuotoją</Button>
      </div>
      {openEmployeeAdditionModal && <EmployeesAdditionModal urlPath={'company/companyEmployee'}/>}
      <ClientsEmployeeList/>
    </div>
  )
}

export default ClientsEmployeesTab