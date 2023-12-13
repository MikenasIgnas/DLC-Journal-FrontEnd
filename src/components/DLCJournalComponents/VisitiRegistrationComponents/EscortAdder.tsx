import React, { useEffect, useRef, useState } from 'react'
import { UserOutlined }                       from '@ant-design/icons'
import { Avatar, Button, Form, Input, Space } from 'antd'
import type { FormInstance }                  from 'antd/es/form'

const layout = {
  labelCol:   { span: 8 },
  wrapperCol: { span: 16 },
}



interface UserType {
  name: string;
  age: string;
}

const useResetFormOnCloseModal = ({ form, open }: { form: FormInstance; open: boolean }) => {
  const prevOpenRef = useRef<boolean>()
  useEffect(() => {
    prevOpenRef.current = open
  }, [open])
  const prevOpen = prevOpenRef.current

  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields()
    }
  }, [form, prevOpen, open])
}


const ListItemAdder = () => {
  const [open, setOpen] = useState(false)

  const [form] = Form.useForm()

  const onOk = () => {
    form.submit()
  }

  useResetFormOnCloseModal({
    form,
    open,
  })

  const onFinish = (values: any) => {
    console.log('Finish:', values)
  }

  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === 'userForm') {
          const { basicForm } = forms
          const users = basicForm.getFieldValue('users') || []
          basicForm.setFieldsValue({ users: [...users, values] })
          setOpen(false)
        }
      }}
    >
      <Form {...layout} name='basicForm' onFinish={onFinish} style={{ maxWidth: 600 }}>

        <Form.Item name='users' hidden />
        <Form.Item
          label='User List'
          shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
        >
          {({ getFieldValue }) => {
            const users: UserType[] = getFieldValue('users') || []
            return (
              <ul>
                {users.map((user) => (
                  <li key={user.name} className='user'>
                    <Space>
                      <Avatar icon={<UserOutlined />} />
                      {`${user.name} - ${user.age}`}
                    </Space>
                  </li>
                ))}
              </ul>
            )
          }}
        </Form.Item>
        <Form form={form} layout='vertical' name='userForm'>
          <Form.Item name='name' label='User Name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button htmlType='submit'>Save</Button>
        </Form>
      </Form>
    </Form.Provider>
  )
}

export default ListItemAdder