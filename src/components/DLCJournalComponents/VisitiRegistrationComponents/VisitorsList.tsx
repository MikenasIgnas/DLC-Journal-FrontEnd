import React                    from 'react'
import { Card, Form, List }     from 'antd'
import VisitorsListItem         from './VisitorsListItem'
import useCheckCompanyEmployees from '../../../Plugins/useCheckCompanyEmployees'


const VisitorsList = () => {
  const isCompaniesEmployees = useCheckCompanyEmployees()
  return (
    <>
      {
        isCompaniesEmployees &&
        <Card title={'Lankytojai'}style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
          <Form.List name='visitors'>
            {(fields) => (
              <List
                dataSource={fields}
                renderItem={(item) => <VisitorsListItem item={item}/>}
              />
            )}
          </Form.List>
        </Card>
      }
    </>
  )
}

export default VisitorsList