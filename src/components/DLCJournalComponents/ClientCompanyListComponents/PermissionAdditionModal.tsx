/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                              from 'react'
import { Button, Form, FormInstance, Input, List, Modal } from 'antd'
import {CheckOutlined, FileAddOutlined }                  from '@ant-design/icons'
import PermissionsListItem                                from './PermissionsListItem'
import { Permissions }                                    from '../../../types/globalTypes'

type PermissionAdditionModalProps = {
  setIsModalOpen:   React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen :     boolean
  form:             FormInstance<any>
  permissions:      Permissions[]
  addPermission:    (values: Permissions) => Promise<void>
  deletePermission: (id: string) => Promise<void>
  setPermissions: React.Dispatch<React.SetStateAction<Permissions[]>>
}

const PermissionAdditionModal = ({isModalOpen, setIsModalOpen, form, permissions, addPermission, deletePermission, setPermissions}: PermissionAdditionModalProps) => {

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Button icon={<CheckOutlined />} onClick={showModal}>
        Įgaliojimai
      </Button>
      <Modal title='Pridėti įgaliojimą' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={addPermission}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px'}}>
            <Form.Item noStyle name='name'>
              <Input style={{width: '75%'}}/>
            </Form.Item>
            <Button icon={<FileAddOutlined />} htmlType='submit'>Pridėti</Button>
          </div>
        </Form>
        <List
          size='large'
          bordered
          dataSource={permissions}
          renderItem={(item) => <PermissionsListItem permissions={permissions} setPermissions={setPermissions} item={item} deletePermission={deletePermission}/>}
        />
      </Modal>
    </div>
  )
}

export default PermissionAdditionModal