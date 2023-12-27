/* eslint-disable max-len */
import React                                                          from 'react'
import { post }                                                       from '../../Plugins/helpers'
import { Card, Form, Input, Button,Select, message, ConfigProvider }  from 'antd'
import {  useAppDispatch }                                            from '../../store/hooks'
import { useCookies }                                                 from 'react-cookie'
import SuccessMessage                                                 from '../../components/UniversalComponents/SuccessMessage'
import useSetUserRoles                                                from '../../Plugins/useSetUserRoles'
import { setEmployeeName }                                            from '../../auth/AuthReducer/reducer'
import useSetSingleUser                                               from '../../Plugins/useSetSingleUser'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

type FormValuesType = {
  name:           string,
  email:          string,
  userRole:       string,
  password:       string,
  repeatPassword: string,
  oldPassword:    string,
}

const SingleUserPage = () => {
  const [form]                      = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [cookies]                   = useCookies(['access_token'])
  const {user, id, loading}         = useSetSingleUser()
  const {roles}                     = useSetUserRoles()
  const dispatch                    = useAppDispatch()

  const userRoles = roles?.map((el) => ({
    value: el._id,
    label: el.name,
  }))
  const onFinish = async (values: FormValuesType) => {

    const userInfoValues = {
      id:    id,
      email: values.email,
      name:  values.name,
    }

    const passwordChangeValues = {
      id:             id,
      password:       values.password,
      repeatPassword: values.repeatPassword,
      oldPassword:    values?.oldPassword,
    }

    const endpoint = values.password ? 'auth/changePassword' : 'user/edit'
    const postData = values.password ? passwordChangeValues : userInfoValues

    try {
      const res = await post(endpoint, postData, cookies.access_token)

      if (res) {
        const successMessage = values.password ? 'Slaptažodis pakeistas' : 'Pakeitimai išsaugoti'
        messageApi.success({
          type:    'success',
          content: successMessage,
        })

        if (!values.password && values.name) {
          dispatch(setEmployeeName(res.name))
        }
      } else {
        messageApi.error({
          type:    'error',
          content: 'Nepavyko išsaugoti',
        })
      }
    } catch (error) {
      messageApi.error({
        type:    'error',
        content: 'Error',
      })
    }
  }

  React.useEffect(() => {
    form.setFieldsValue({
      name:  user?.name,
      email: user?.email,
    })
  }, [user?.email, user?.name, form])

  return (
    <div className='CreateUserPageContainer'>
      <ConfigProvider theme = {{
        token: {
          colorTextPlaceholder: '#7d7d7d',
        },
      }}>
        <Card
          loading={loading}
          headStyle={{textAlign: 'center' }}
          title={id ? `Tvarkyti ${user?.name} Profilį` : 'Mano Profilis'}
          bordered={true}
          className='CreateUserCard'>
          <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
            name='EditSingleUsersProfile'
            className='CreateUserForm'
            scrollToFirstError
          >
            <Form.Item
              labelAlign='left'
              name='name'
              label='Darbuotojas'
              initialValue={user?.name}
            >
              <Input placeholder='Darbuotojas'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='email'
              label='E-mail'
              initialValue={user?.email}
              key={user?.email}
            >
              <Input placeholder='Darbuotojo el. paštas'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='userRole'
              label='Rolė'
              initialValue={user?.userRole}
            >
              <Select
                placeholder='Pasirinkti rolę'
                options={userRoles}
              />
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='oldPassword'
              label='Senas slaptažodis'
              hasFeedback
            >
              <Input.Password placeholder='Senas slaptažodis'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='password'
              label='Keisti Slaptažodį'
              hasFeedback
            >
              <Input.Password placeholder='Slaptažodis'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='repeatPassword'
              label='Patvirtinti Slaptažodį'
              dependencies={['password']}
              hasFeedback
              rules={[

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Pakartoti slaptažodį'/>
            </Form.Item>
            <Button htmlType='submit'>
              Išsaugoti
            </Button>
          </Form>
        </Card>
      </ConfigProvider>
      <SuccessMessage contextHolder={contextHolder} />
    </div>
  )
}

export default SingleUserPage