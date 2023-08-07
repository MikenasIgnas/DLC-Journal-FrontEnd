/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import React      from 'react'
import { Modal }  from 'antd'

type FinishModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isModalOpen:    boolean,
  onFinish?:      ((values: any) => void) | undefined,
};

const FinishModal = ({ isModalOpen, setIsModalOpen, onFinish }:FinishModalProps) => {
  return (
    <Modal title='Ar norite pabaigti?' open={isModalOpen} onOk={onFinish} onCancel={() => setIsModalOpen(false)} />
  )
}

export default FinishModal
