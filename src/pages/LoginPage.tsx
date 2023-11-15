/* eslint-disable max-len */

import React                            from 'react'
import { validateUser }                 from '../Plugins/helpers'
import { LockOutlined, UserOutlined }   from '@ant-design/icons'
import { Button, Form, Input, Card }    from 'antd'
import { useCookies }                   from 'react-cookie'
import axios from 'axios'

type LoginValuesType = {
  email:    string,
  password: string,
}

const LoginPage = () => {
  const [c, setCookie] =                     useCookies(['access_token'])
  const [loginError, setLoginError] =       React.useState(false)
  const [errorMessage, setErrorMessage] =   React.useState('')

  const onFinish = async(values: LoginValuesType) => {
    try{
      const res = await validateUser('logInUser', values)
      if(!res.error){
        setCookie('access_token', res.token, { path: '/'})
        axios.defaults.headers.common['Authorization'] = res.token
      }
    }catch (err){
      setLoginError(true)
      setErrorMessage('Invalid Username or Password')
    }
  }

  return (
    <div className='CreateUserContainer'>
      <Card headStyle={{textAlign: 'center'}} title='Log In' bordered={true} className='LoginPage'>
        <Form
          name='normal_login'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Please input your Email!' },
              {type: 'email', message: 'The input is not valid E-mail!'},
            ]}
          >
            <Input type='email' prefix={<UserOutlined rev='' className='site-form-item-icon' />} placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined rev='' className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          {loginError && <div style={{color: 'red', textAlign: 'center'}}>{errorMessage}</div>}
          <Form.Item className='loginButtons'>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage