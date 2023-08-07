/* eslint-disable max-len */
import React            from 'react'
import { Form, Select } from 'antd'

type VisitRegistrationSelectProps = {
    formItemName: string;
    placeholder: string;
    slectOptions:{
        value: string;
        label: string;
    }[] | undefined
    onChange ?: (value: string, options: any) => void
}

const VisitRegistrationSelect = ({formItemName, placeholder, slectOptions, onChange}: VisitRegistrationSelectProps) => {
  return (
    <div>
      <Form.Item
        rules={[
          {
            required: true,
            message:  'Please input your password!',
          },
        ]} name={formItemName}>
        <Select
          placeholder = {placeholder}
          style={{width: '300px'}}
          options={slectOptions}
          onChange= {onChange}

        >
        </Select>
      </Form.Item>
    </div>
  )
}

export default VisitRegistrationSelect