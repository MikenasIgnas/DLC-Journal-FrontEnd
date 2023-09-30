/* eslint-disable max-len */
import React            from 'react'
import { Form, Select } from 'antd'

type VisitRegistrationFormItemProps = {
    formItemName: string;
    placeholder: string;
    formItemLabel: string;
    slectOptions:{
        value: string | undefined;
        label: string | undefined;
    }[] | undefined
    fieldValue: string
    updateValue?: boolean | ((prevValue: any, curValue: any) => boolean)
    onSelect?: (values: any, data: any) => void
}

const VisitRegistrationFormItem = ({formItemName, placeholder, formItemLabel, slectOptions, fieldValue, updateValue, onSelect}: VisitRegistrationFormItemProps) => {
  return (
    <Form.Item
      noStyle
      shouldUpdate={updateValue}
    >
      {({ getFieldValue }) =>
        getFieldValue(fieldValue) && (
          <Form.Item name={formItemName} label={formItemLabel} rules={[{ required: true }]}>
            <Select
              placeholder={placeholder}
              allowClear
              onSelect={onSelect}
              options={slectOptions}
            >
            </Select>
          </Form.Item>
        ) }
    </Form.Item>
  )
}

export default VisitRegistrationFormItem