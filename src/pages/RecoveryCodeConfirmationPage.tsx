/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Button, Card, Form, Input }  from 'antd'
import { useNavigate }                  from 'react-router'

const RecoveryCodeConfirmationPage = () => {
  const navigate    = useNavigate()
  const [form]      = Form.useForm()

  const onFinish = (values: any) => {
     Object.values(values).sort().join('')
    form.resetFields()
    navigate('/PasswordResetPage')
  }

  return (
    <div className='CreateUserContainer'>
      <Card headStyle={{textAlign: 'center'}} title='Kodo patvirtinimas' bordered={true} className='LoginPage'>
        <Form form={form} onFinish={onFinish}>
          <div style={{display: 'flex'}}>
            <Form.Item name='imputOne'>
              <Input size='large' />
            </Form.Item>
            <Form.Item name='imputTwo'>
              <Input size='large' />
            </Form.Item>
            <Form.Item name='imputThree'>
              <Input size='large' />
            </Form.Item>
            <Form.Item name='imputFour'>
              <Input max={1} size='large' />
            </Form.Item>
          </div>
          <Form.Item className='loginButtons'>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Patvirtinti
              </Button>
              <Button onClick={() => navigate('/')} type='link' style={{textAlign: 'center'}} className='login-form-forgot' href=''>
                Prisijungti
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default RecoveryCodeConfirmationPage