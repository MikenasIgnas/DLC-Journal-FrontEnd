import { Input, Space } from 'antd'
import { SearchProps }  from 'antd/es/input'
import React            from 'react'

const { Search } = Input

const ResetPasswordPage = () => {
  const [email, setEmail] = React.useState<string>()
  const onSearch: SearchProps['onSearch'] = (value) => setEmail(value)
  return (
    <div className='CreateUserContainer'>
      <Space.Compact >
        <Search
          placeholder='El. Paštas'
          allowClear
          enterButton='Siųsti'
          size='large'
          onSearch={onSearch}
        />
      </Space.Compact>
      <div>
        {
          email && <Space.Compact>
            <Input style={{ width: '20%' }} defaultValue='0571' />
            <Input style={{ width: '80%' }} defaultValue='26888888' />
            <Input style={{ width: '80%' }} defaultValue='26888888' />
            <Input style={{ width: '80%' }} defaultValue='26888888' />
          </Space.Compact>
        }
      </div>
    </div>
  )
}

export default ResetPasswordPage