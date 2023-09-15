/* eslint-disable max-len */
import React                    from 'react'
import { AppstoreAddOutlined }  from '@ant-design/icons'
import { Button}                from 'antd'
import CompanyAdditionModal     from './CompanyAdditionModal'
import { CollocationsType, ModalStateType }     from '../../../../types/globalTypes'

type CompanyAdditionProps = {
  postUrl:            string;
  additionModalTitle: string;
  setModalOpen:       React.Dispatch<React.SetStateAction<ModalStateType>>
  modalOpen:          ModalStateType
  collocations:       CollocationsType[] | undefined
}
const CompanyAddition = ({postUrl, additionModalTitle, collocations, setModalOpen, modalOpen}:CompanyAdditionProps) => {
  return (
    <div>
      <Button
        style={{display: 'flex', margin: 'auto', marginTop: '10px'}}
        icon={<AppstoreAddOutlined />}
        onClick={()=> setModalOpen({...modalOpen, isModalOpen: true})}>
          Pridėti įmonę
      </Button>
      {modalOpen.isModalOpen && <CompanyAdditionModal
        postUrl={postUrl}
        additionModalTitle={additionModalTitle}
        collocations={collocations}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      }
    </div>
  )
}

export default CompanyAddition