/* eslint-disable max-len */

import React                            from 'react'
import { get, validateUser }                 from '../Plugins/helpers'
import { LockOutlined, UserOutlined }   from '@ant-design/icons'
import { Button, Form, Input, Card }    from 'antd'
import { useCookies }                   from 'react-cookie'
import axios                            from 'axios'
import { useNavigate }                  from 'react-router'
import { jwtDecode } from 'jwt-decode'
import { TokenType } from '../types/globalTypes'

type LoginValuesType = {
  email:    string,
  password: string,
}

const LoginPage = () => {
  const [ ,setCookie]                    = useCookies(['access_token'])
  const [loginError, setLoginError]     = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const navigate                        = useNavigate()

  const onFinish = async(values: LoginValuesType) => {
    try{
      const res = await validateUser('login', values)
      const decodedToken: TokenType = jwtDecode(res.token)
      const user = await get(`user?id=${decodedToken.userId}`, res.token)
      if(!res.error){
        setCookie('access_token', res.token, { path: '/'})
        axios.defaults.headers.common['Authorization'] = res.token
        if(!user.isSecurity){
          navigate('/DLC Žurnalas?menuKey=1')
        }else{
          navigate('/DLC Žurnalas/Vizitai?page=1&limit=10&selectFilter=T72')
        }
      }
    }catch (err){
      setLoginError(true)
      setErrorMessage('Neteisingas prisijungimas arba slaptažodis')
    }
  }

  return (
    <div className='CreateUserContainer'>
      <Card headStyle={{textAlign: 'center'}} title='Log In' bordered={true} className='LoginPage'>
        <Form
          name='normal_login'
          onFinish={onFinish}
        >
          <Form.Item
            name='login'
            rules={[
              { required: true, message: 'Please input your Email!' },
            ]}
          >
            <Input prefix={<UserOutlined rev='' className='site-form-item-icon' />} placeholder='Email' />
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
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
              </Button>
              <Button onClick={() => navigate('/SendRecoveryCodePage')} type='link' style={{textAlign: 'center'}} className='login-form-forgot' href=''>
               Pamiršau slaptažodį
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage