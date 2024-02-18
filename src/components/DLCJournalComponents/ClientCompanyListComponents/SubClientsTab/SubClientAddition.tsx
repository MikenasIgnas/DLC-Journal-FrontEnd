/* eslint-disable max-len */
import {
  Button,
  Select,
}                                         from 'antd'

import {
  useAppDispatch,
  useAppSelector,
}                                         from '../../../../store/hooks'
import { setOpenSubClientAdditionModal }  from '../../../../auth/ModalStateReducer/ModalStateReducer'

type SubClientAdditionProps = {
    selectedValue:    null;
    handleChange:     (value: string) => Promise<void>;
    handleSelect:     () => void
}

const SubClientAddition = ({ selectedValue, handleChange, handleSelect }:SubClientAdditionProps) => {
  const dispatch              = useAppDispatch()
  const parentCompanies       = useAppSelector((state) => state.singleCompany.parentCompanies)
  const mainCompaniesOptions  = parentCompanies?.map((el) => {
    return{
      value: el._id,
      label: el.name,
    }
  })

  return (
    <div className='SubClientAdditionContainer'>
      <div className='SubClientAdditionBody'>
        <div>
          <Button onClick={() => dispatch(setOpenSubClientAdditionModal(true))}>Pridėti Naują Sub Klientą</Button>
        </div>
        <div>
          <Select
            className='SubClientAdditionSelect'
            placeholder={'Pridėti egzistuojantį klientą'}
            value={selectedValue}
            onChange={handleChange}
            options={mainCompaniesOptions}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </div>
  )

}

export default SubClientAddition