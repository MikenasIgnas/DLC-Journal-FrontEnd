/* eslint-disable max-len */
import React                                from 'react'
import { AppstoreAddOutlined }              from '@ant-design/icons'
import { Button}                            from 'antd'
import CompanyAdditionModal                 from './CompanyAdditionModal'
import { CollocationsType, ModalStateType } from '../../../../types/globalTypes'

type CompanyAdditionProps = {
  postUrl:            string;
  additionModalTitle: string;
  setModalState:      React.Dispatch<React.SetStateAction<ModalStateType>>
  modalState:         ModalStateType
  collocations:       CollocationsType[] | undefined
}
const CompanyAddition = ({postUrl, additionModalTitle, collocations, setModalState, modalState}:CompanyAdditionProps) => {
  return (
    <div>
      <Button
        style={{display: 'flex', margin: 'auto', marginTop: '10px'}}
        icon={<AppstoreAddOutlined rev='' />}
        onClick={()=> setModalState({...modalState, isModalOpen: true})}>
          Pridėti įmonę
      </Button>
      {modalState.isModalOpen && <CompanyAdditionModal
        postUrl={postUrl}
        additionModalTitle={additionModalTitle}
        collocations={collocations}
        setModalState={setModalState}
        modalState={modalState}
      />
      }
    </div>
  )
}

export default CompanyAddition