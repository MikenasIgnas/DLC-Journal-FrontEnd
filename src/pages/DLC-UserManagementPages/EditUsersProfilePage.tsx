/* eslint-disable max-len */
import React                                                          from 'react'
import { Button, Card, ConfigProvider, Form, Input, Select, message } from 'antd'
import { post }                                                       from '../../Plugins/helpers'
import { useAppDispatch, useAppSelector }                             from '../../store/hooks'
import { setUsername }                                                from '../../auth/AuthReducer/reducer'
import { useCookies }                                                 from 'react-cookie'
import { TokenType }                                                  from '../../types/globalTypes'
import {jwtDecode}                                                    from 'jwt-decode'
import SuccessMessage                                                 from '../../components/UniversalComponents/SuccessMessage'
import useFetch                                                       from '../../customHooks/useFetch'

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
    username:       string,
    email:          string,
    userRole:       string,
    password:       string,
    repeatPassword: string,
}
const EditUserProfilePage = () => {

  const dispatch =                                useAppDispatch()
  const [form] =                                  Form.useForm()
  const [messageApi, contextHolder] =             message.useMessage()
  const [cookies] =                               useCookies(['access_token'])
  const token =                                   cookies.access_token
  const decodedToken:TokenType =                  jwtDecode(token)
  const [loading, setLoading] =                   React.useState(false)
  const defaultTheme =                            useAppSelector((state)=> state.theme.value)
  const [loginError, setLoginError] =             React.useState(false)
  const [errorMessage, setErrorMessage] =         React.useState('')
  const userProfileData =                         useFetch<FormValuesType>(`FindUser/${decodedToken.id}`, setLoading)

  const onFinish = async (values: {username:string, email:string,userRole:string, passwordOne:string,passwordTwo:string}) => {
    if(!values.passwordOne){
      const editedValues = {
        username: values.username,
        email:    values.email,
        userRole: values.userRole,
      }

      const res = await post(`editUserProfile/${decodedToken.id}`, editedValues, cookies.access_token)
      const res2 = await post(`changedUsername/${decodedToken.id}`, editedValues, cookies.access_token)
      dispatch(setUsername(values.username))
      if(!res.error && !res2.error){
        messageApi.success({
          type:    'success',
          content: 'Išsaugota',
        })
        form.resetFields(['passwordOne', 'passwordTwo'])
        setLoginError(false)
        setErrorMessage('')
      }else{
        setLoginError(res.error)
        setErrorMessage(res.message)
      }

    }else{
      const editedValues = {
        username:    values.username,
        email:       values.email,
        userRole:    values.userRole,
        passwordOne: values.passwordOne,
        passwordTwo: values.passwordTwo,
      }
      decodedToken.username = values.username
      const res = await post(`editUserProfile/${decodedToken.id}`, editedValues, cookies.access_token)
      const res2 = await post(`changedUsername/${decodedToken.id}`, editedValues, cookies.access_token)
      dispatch(setUsername(values.username))
      if(!res.error && !res2.error){
        messageApi.success({
          type:    'success',
          content: 'Išsaugota',
        })
        setLoginError(false)
        setErrorMessage('')
        form.resetFields(['passwordOne', 'passwordTwo'])
      }else{
        setLoginError(res.error)
        setErrorMessage(res.message)
      }
    }
  }

  return (
    <div className='CreateUserPageContainer'>
      <ConfigProvider theme = {{
        token: {
          colorBgContainer:     defaultTheme ? '#1e1e1e' : 'white',
          colorText:            defaultTheme ? 'white': 'black',
          controlItemBgActive:  defaultTheme ? '#2a2a2a' : '#e6f4ff',
          colorTextPlaceholder: '#7d7d7d',
        },
      }}>
        <Card
          loading={loading}
          headStyle={{textAlign: 'center', backgroundColor: defaultTheme ? '#191919' : 'white', color: defaultTheme ? 'white' : 'black'}}
          title='Edit your Profile'
          bordered={true}
          className='CreateUserCard'>
          <Form
            {...formItemLayout}
            form={form}
            name='EditUserProfile'
            onFinish={onFinish}
            className='Form'
            scrollToFirstError
          >
            <Form.Item
              labelAlign='left'
              name='username'
              label='Employee Name'
              initialValue={userProfileData?.username}
            >
              <Input placeholder='Duorbotojo vardas' />
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='email'
              label='E-mail'
              initialValue={userProfileData?.email}
            >
              <Input placeholder='Duorbotojo el. paštas'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='userRole'
              label='User Role'
              initialValue={userProfileData?.userRole}
            >
              <Select
                disabled={userProfileData?.userRole === 'admin' || userProfileData?.userRole === 'SYSADMIN' ? false : true}
                placeholder='Pasirinkti rolę'
                dropdownStyle={{ backgroundColor: defaultTheme ? '#191919' : 'white' }}
                options={[
                  { value: 'SYSADMIN', label: 'SYSADMIN' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'user', label: 'User' },
                ]}
              />
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='passwordOne'
              label='Change Password'
              hasFeedback
            >
              <Input.Password placeholder='Slaptažodis' />
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='passwordTwo'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('passwordOne') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Pakartoti slaptažodį' />
            </Form.Item>
            <Button htmlType='submit'>
              Save Changes
            </Button>
            {loginError && <div style={{color: 'red', textAlign: 'center'}}>{errorMessage}</div>}
          </Form>
        </Card>
      </ConfigProvider>
      <SuccessMessage contextHolder={contextHolder} />
    </div>
  )
}

export default EditUserProfilePage