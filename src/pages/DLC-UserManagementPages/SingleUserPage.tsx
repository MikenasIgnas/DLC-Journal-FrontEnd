/* eslint-disable max-len */
import React                                                          from 'react'
import { useParams }                                                  from 'react-router-dom'
import { post }                                                       from '../../Plugins/helpers'
import { Card, Form, Input, Button,Select, message, ConfigProvider }  from 'antd'
import {  useAppDispatch, useAppSelector }                                            from '../../store/hooks'
import { useCookies }                                                 from 'react-cookie'
import SuccessMessage                                                 from '../../components/UniversalComponents/SuccessMessage'
import useFetch                                                       from '../../customHooks/useFetch'
import useSetUserRoles                                                from '../../Plugins/useSetUserRoles'
import { values } from 'lodash'
import { setEmployeeName } from '../../auth/AuthReducer/reducer'

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
  name:           string,
  _id:            string
}

type FormValuesType = {
  name:           string,
  email:          string,
  userRole:       string,
  password:       string,
  repeatPassword: string,
}

const SingleUserPage = () => {
  const [form]                      = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [cookies]                   = useCookies(['access_token'])
  const {id}                        = useParams()
  const [loading, setLoading]       = React.useState(false)
  const usersRole                   = useAppSelector((state)=> state.auth.usersRole)
  const singleUser                  = useFetch<SingleUserType>(`user/getbyId?id=${id}`, setLoading)
  const {data}                      = useSetUserRoles()
  const dispatch                    = useAppDispatch()

  const userRoles = data?.map((el) => ({
    value: el._id,
    label: el.name,
  }))

  const onFinish = async (values: FormValuesType) => {
    if(!values.password){
      if(id){
        if(!values.name){
          const editValues = {
            id:    id,
            email: values.email,
          }

          const res = await post('user/edit', editValues, cookies.access_token)
          if(res){
            messageApi.success({
              type:    'success',
              content: 'Išsaugota',
            })
          }else{
            messageApi.success({
              type:    'error',
              content: 'Išsaugoti Nepavyko',
            })
          }
        }
        if(!values.email){
          const editValues = {
            id:   id,
            name: values.name,
          }
          const res = await post('user/edit', editValues, cookies.access_token)
          console.log(res.name)
          dispatch(setEmployeeName(res.name))
          if(res){
            messageApi.success({
              type:    'success',
              content: 'Išsaugota',
            })
          }else{
            messageApi.success({
              type:    'error',
              content: 'Išsaugoti Nepavyko',
            })
          }
        }
        if(values.name && values.email){
          const editValues = {
            id:    id,
            name:  values.name,
            email: values.email,
          }
          const res = await post('user/edit',editValues, cookies.access_token)
          if(res){
            messageApi.success({
              type:    'success',
              content: 'Išsaugota',
            })
          }else{
            messageApi.success({
              type:    'error',
              content: 'Išsaugoti Nepavyko',
            })
          }
        }
      }
    }else{
      const passwordChangeValues = {
        password:       values.password,
        repeatPassword: values.repeatPassword,
        oldPassword:    singleUser?.password,
      }
      if(id){
        const res = await post('auth/changePassword', passwordChangeValues, cookies.access_token)
        if(res){
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
          colorTextPlaceholder: '#7d7d7d',
        },
      }}>

        <Card
          loading={loading}
          headStyle={{textAlign: 'center' }}
          title={`Tvarkyti ${singleUser?.name} Profilį`}
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
              initialValue={singleUser?.name}
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
              label='Rolė'
              initialValue={singleUser?.userRole}
            >
              <Select
                disabled={usersRole !== 'user' ? false : true}
                placeholder='Pasirinkti rolę'
                options={userRoles}
              />
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