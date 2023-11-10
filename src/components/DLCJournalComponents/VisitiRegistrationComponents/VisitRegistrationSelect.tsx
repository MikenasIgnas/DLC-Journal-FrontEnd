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
    onChange?: (value: string) => void
}

const VisitRegistrationFormItem = ({formItemName, placeholder, formItemLabel, slectOptions, fieldValue, updateValue, onSelect, onChange}: VisitRegistrationFormItemProps) => {
  return (
    <Form.Item
      shouldUpdate={updateValue}
    >
      {({ getFieldValue }) =>
        getFieldValue(fieldValue) && (
          <Form.Item name={formItemName} label={<div style={{width: '120px'}}>{formItemLabel}</div>} rules={[{ required: true }]} colon={false} labelAlign={'left'}>
            <Select
              showSearch
              style={{width: '200px'}}
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