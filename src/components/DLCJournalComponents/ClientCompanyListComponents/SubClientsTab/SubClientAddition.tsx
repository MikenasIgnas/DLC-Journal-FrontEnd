/* eslint-disable max-len */
import { Button, Select }                 from 'antd'
import { useAppDispatch }                 from '../../../../store/hooks'
import { setOpenSubClientAdditionModal }  from '../../../../auth/ModalStateReducer/ModalStateReducer'

type SubClientAdditionProps = {
    selectedValue:    null;
    handleChange:     (value: number) => Promise<void>;
    mainCompaniesOptions:  {
        value: number;
        label: string;
    }[],
    handleSelect:     () => void
}

const SubClientAddition = ({ selectedValue, handleChange, mainCompaniesOptions, handleSelect }:SubClientAdditionProps) => {
  const dispatch = useAppDispatch()
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