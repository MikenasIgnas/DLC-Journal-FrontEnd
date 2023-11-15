/* eslint-disable max-len */
import React                                                          from 'react'
import { useParams }                                                  from 'react-router-dom'
import { post }                                                       from '../../Plugins/helpers'
import { Card, Form, Input, Button,Select, message, ConfigProvider }  from 'antd'
import {  useAppSelector }                                            from '../../store/hooks'
import { useCookies }                                                 from 'react-cookie'
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

type SingleUserType = {
  email:          string,
  password:       string,
  repeatPassword: string,
  secret:         string,
  userRole:       string,
  username:       string,
  _id:            string
}

const SingleUserPage = () => {
  const [form] =                      Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [cookies] =                   useCookies(['access_token'])
  const {id} =                    useParams()
  const [loading, setLoading] =       React.useState(false)
  const usersRole =                   useAppSelector((state)=> state.auth.usersRole)
  const defaultTheme =                useAppSelector((state)=> state.theme.value)
  const singleUser =                  useFetch<SingleUserType>(`FindSingleUser/${id}`, setLoading)
  const onFinish = async (values: {username:string, email:string,userRole:string, passwordOne:string,passwordTwo:string}) => {
    if(!values.passwordOne){
      const editedValues = {
        username: values.username,
        email:    values.email,
        userRole: values.userRole,
      }
      if(id){
        const res = await post(`editUserProfile/${id}`, editedValues, cookies.access_token)
        const res2 = await post(`changedUsername/${id}`, editedValues, cookies.access_token)
        if(!res.error && !res2.error){
          messageApi.success({
            type:    'success',
            content: 'Išsaugota',
          })
        }
      }
    }else{
      const editedValues = {
        username:    values.username,
        email:       values.email,
        userRole:    values.userRole,
        passwordOne: values.passwordOne,
        passwordTwo: values.passwordTwo,
      }
      if(id){
        const res = await post(`editUserProfile/${id}`, editedValues, cookies.access_token)
        const res2 = await post(`changedUsername/${id}`, editedValues, cookies.access_token)
        if(!res.error && !res2.error){
          messageApi.success({
            type:    'success',
            content: 'Išsaugota',
          })
        }
      }
    }
  }

  return (
    <div className='CreateUserPageContainer'>
      <ConfigProvider theme = {{
        token: {
          colorBgContainer:     defaultTheme ? '#1e1e1e' : 'white',
          colorText:            defaultTheme ? 'white' : 'black',
          controlItemBgActive:  defaultTheme ? '#2a2a2a' : '#e6f4ff',
          colorTextPlaceholder: '#7d7d7d',
        },
      }}>

        <Card
          loading={loading}
          headStyle={{textAlign: 'center', backgroundColor: defaultTheme ? '#191919' : 'white', color: defaultTheme ? 'white' : 'black'}}
          title={`Edit Users ${singleUser?.username} Profile`}
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
              name='username'
              label='Employee Name'
              initialValue={singleUser?.username}
            >
              <Input placeholder='Darbuotojas'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='email'
              label='E-mail'
              initialValue={singleUser?.email}
            >
              <Input placeholder='Darbuotojo el. paštas' />
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='userRole'
              label='User Role'
              initialValue={singleUser?.userRole}
            >
              <Select
                disabled={usersRole !== 'user' ? false : true}
                placeholder='Pasirinkti rolę'
                dropdownStyle={{ backgroundColor: defaultTheme ? '#191919' : 'white' }}
                options={[
                  { value: 'system admin', label: 'System Admin' },
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
              <Input.Password placeholder='Slaptažodis'/>
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
              <Input.Password placeholder='Pakartoti slaptažodį'/>
            </Form.Item>
            <Button htmlType='submit'>
              Save Changes
            </Button>
          </Form>
        </Card>
      </ConfigProvider>
      <SuccessMessage contextHolder={contextHolder} />
    </div>
  )
}

export default SingleUserPage