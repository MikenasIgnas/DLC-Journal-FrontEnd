/* eslint-disable max-len */
import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'

const EscortAdder: React.FC = () => {
  return (
    <Form.List name='escortNames'>
      {(fields, { add, remove }, { errors }) => (
        <div >
          {fields.map((field) => (
            <Form.Item required={false} key={field.key} style={{display: 'flex', justifyContent: 'space-between'}}>
              <Form.Item validateTrigger={['onChange', 'onBlur']} {...field} noStyle>
                <Input placeholder='Palyda' style={{ width: '90%' }}/>
              </Form.Item>
              <MinusCircleOutlined rev=''
                style={{marginLeft: '5px'}}
                className='dynamic-delete-button'
                onClick={() => remove(field.name)}
              />
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type='dashed'
              onClick={() => add()}
              style={{ width: '200px' }}
              icon={<PlusOutlined rev=''/>}
            >
                Pridėti palydą
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </div>
      )}
    </Form.List>
  )
}

export default EscortAdder