/* eslint-disable max-len */
import React              from 'react'
import { Button, Select } from 'antd'
import { ModalStateType } from '../../../types/globalTypes'

type SubClientAdditionProps = {
    setModalState:    React.Dispatch<React.SetStateAction<ModalStateType>>;
    modalState:       ModalStateType;
    selectedValue:    null;
    handleChange:     (value: string) => Promise<void>;
    mainCompaniesOptions:  {
        value: string;
        label: string;
    }[],
    handleSelect:     () => void
}

const SubClientAddition = ({modalState, setModalState, selectedValue, handleChange, mainCompaniesOptions, handleSelect }:SubClientAdditionProps) => {
  return (
    <div className='SubClientAdditionContainer'>
      <div className='SubClientAdditionBody'>
        <div>
          <Button onClick={() => setModalState({...modalState, isModalOpen: true})}>Pridėti Naują Sub Klientą</Button>
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