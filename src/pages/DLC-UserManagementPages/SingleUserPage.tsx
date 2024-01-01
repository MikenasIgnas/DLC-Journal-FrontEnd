/* eslint-disable max-len */
import React                                                              from 'react'
import { post }                                                           from '../../Plugins/helpers'
import { Card, Form, Input, Button, message, ConfigProvider, Checkbox }   from 'antd'
import {  useAppDispatch, useAppSelector }                                from '../../store/hooks'
import { useCookies }                                                     from 'react-cookie'
import SuccessMessage                                                     from '../../components/UniversalComponents/SuccessMessage'
import { setEmployeeName }                                                from '../../auth/AuthReducer/reducer'
import useSetSingleUser                                                   from '../../Plugins/useSetSingleUser'
import { jwtDecode }                                                      from 'jwt-decode'
import { TokenType }                                                      from '../../types/globalTypes'

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
  username:       string,
  email:          string,
  userRole:       string,
  password:       string,
  repeatPassword: string,
  oldPassword:    string,
  isAdmin:        boolean
}

const SingleUserPage = () => {
  const [form]                      = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [cookies]                   = useCookies(['access_token'])
  const {user, id, loading}         = useSetSingleUser()
  const dispatch                    = useAppDispatch()
  const token:TokenType             = jwtDecode(cookies.access_token)
  const logedInUser                 = token.userId === id
  const isAdmin                     = useAppSelector((state) => state.auth.isAdmin)

  const onFinish = async (values: FormValuesType) => {
    const userInfoValues = {
      id:       id,
      email:    values.email,
      name:     values.name,
      isAdmin:  values.isAdmin,
      username: values.username,
    }

    const passwordChangeValues = {
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
          if(logedInUser){
            dispatch(setEmployeeName(res.name))
          }
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
      name:     user?.name,
      username: user?.username,
      email:    user?.email,
      idAdmin:  user?.isAdmin,
    })
  }, [user?.email, user?.name, user?.username, user?.isAdmin, isAdmin,form])

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
          title={logedInUser ? 'Mano Profilis' : `Darbuotojas: ${user?.name}`}
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
              rules={[{required: true, message: 'Privaloma įvesti darbtuotojo vardą/pavardę'}]}
            >
              <Input disabled={logedInUser || isAdmin ? false : true} placeholder='Darbuotojas'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='username'
              label='Vartotojo vardas'
              rules={[{required: true, message: 'Privaloma įvesti vartotojo vardą'}]}
              initialValue={user?.username}
            >
              <Input disabled={logedInUser || isAdmin ? false : true} placeholder='Vartotojo vardas'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='email'
              label='E-mail'
              initialValue={user?.email}
              rules={[{required: true, message: 'Privaloma įvesti el. paštą'}]}
              key={user?.email}
            >
              <Input disabled={logedInUser || isAdmin ? false : true} placeholder='Darbuotojo el. paštas'/>
            </Form.Item>
            <Form.Item
              label='Rolė'
              labelAlign='left'
              initialValue={user?.isAdmin}
              name='isAdmin'
              valuePropName='checked'
            >
              <Checkbox disabled={isAdmin ? false : true}>Admin</Checkbox>
            </Form.Item>
            {logedInUser &&
            <>
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
            </>
            }
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