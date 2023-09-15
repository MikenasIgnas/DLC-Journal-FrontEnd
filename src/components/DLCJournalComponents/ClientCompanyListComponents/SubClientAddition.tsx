/* eslint-disable max-len */
import { Button, Select } from 'antd'
import React from 'react'
import { ModalStateType } from '../../../types/globalTypes'

type SubClientAdditionProps = {
    setModalOpen:   React.Dispatch<React.SetStateAction<ModalStateType>>;
    modalOpen:      ModalStateType;
    selectedValue:  null;
    handleChange:   (value: string) => Promise<void>;
    mainCompaniesOptions:  {
        value: string;
        label: string;
    }[],
    handleSelect: () => void
}

const SubClientAddition = ({modalOpen, setModalOpen, selectedValue, handleChange, mainCompaniesOptions, handleSelect }:SubClientAdditionProps) => {

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{width: '50%', display: 'flex',justifyContent: 'center'}}>
        <Button onClick={() => setModalOpen({...modalOpen, isEmployeeAdditionModalOpen: true})}>Pridėti darbuotoją</Button>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-evenly', width: '50%'}}>
        <div>
          <Button onClick={() => setModalOpen({...modalOpen, isModalOpen: true})}>Pridėti Naują Sub Klientą</Button>
        </div>
        <div>
          <Select
            placeholder={'Pridėti egzistuojantį klientą'}
            value={selectedValue}
            style={{ width: '100%' }}
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