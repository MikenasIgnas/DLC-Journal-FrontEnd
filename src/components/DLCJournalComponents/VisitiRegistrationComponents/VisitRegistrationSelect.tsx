/* eslint-disable max-len */
import React            from 'react'
import { Form, Select } from 'antd'

type VisitRegistrationFormItemProps = {
    formItemName:       string;
    placeholder:        string;
    slectOptions:{
        value: string | undefined;
        label: string | undefined;
    } [] | undefined
    fieldValue:         string
    updateValue?:       boolean | ((prevValue: any, curValue: any) => boolean)
    onSelect?:          (values: any, data: any) => void
    onChange?:          (value: string[], option: any) => void;
    validationMessage:  string;
    mode?: 'multiple' | 'tags' | undefined;
}

const VisitRegistrationFormItem = ({formItemName, placeholder, slectOptions, fieldValue, updateValue, onSelect, onChange, validationMessage, mode}: VisitRegistrationFormItemProps) => {
  return (
    <Form.Item
      shouldUpdate={updateValue}
      style={{width: '100%'}}
    >
      {({ getFieldValue }) =>
        getFieldValue(fieldValue) && (
          <Form.Item name={formItemName} rules={[{ required: true, message: validationMessage }]} >
            <Select
              mode={mode}
              showSearch
              placeholder={placeholder}
              allowClear
              onChange={onChange}
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