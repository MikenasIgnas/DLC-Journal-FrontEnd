import { Card, Form, FormInstance, List } from 'antd'
import React from 'react'
import VisitorsListItem from './VisitorsListItem'


type VisitorsListProps = {
    form: FormInstance<any>
}

const VisitorsList = ({form}: VisitorsListProps) => {
  return (
    <Card title={'Lankytojai'}style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
      <Form.List name='visitors'>
        {(fields, {remove}) => (
          <List
            dataSource={fields}
            renderItem={(item) => <VisitorsListItem form={form} item={item} remove={remove}/>}
          />
        )}
      </Form.List>
    </Card>
  )
}

export default VisitorsList