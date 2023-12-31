/* eslint-disable max-len */
import React                                                        from 'react'
import { Card, Checkbox, Col, ConfigProvider, Divider, Form, Row }  from 'antd'
import { CollocationsType, CollocationsSites }                      from '../../../../types/globalTypes'


type CollocationFormListProps = {
    collocations:      CollocationsType[] | undefined;
    collocationsSites: CollocationsSites
}

const EditableCollocationFormList = ({collocations, collocationsSites}: CollocationFormListProps) => {
  return (
    <div style={{width: '100%'}} className='DisplayFlex' >
      { collocations?.map((colocation, i) =>
        <div style={{width: '50%'}} key={i} >
          <div>
            <Divider >
              {colocation.site}
            </Divider>
            <div>
              <Form.List
                name={colocation.site}
                initialValue={colocation.premises.map((premise) => {
                  const selectedRackData = collocationsSites[colocation.site as keyof typeof collocationsSites]?.find((data)=> data[premise.premiseName])
                  return {
                    [premise.premiseName]: selectedRackData ? selectedRackData[premise.premiseName] : [],
                  }
                })}
              >
                {(fields) => (
                  <Row gutter={[16, 16]}>
                    {fields.map(({ name, ...rest }, index) => {
                      const premise = colocation.premises[index]
                      return (
                        <Col span={10} key={index}>
                          <Card>
                            <Divider>
                              {premise.premiseName}
                            </Divider>
                            <ConfigProvider theme={{
                              token: {
                                marginXS: 0,
                              },
                            }}>
                              <Form.Item name={[name, premise.premiseName]}>
                                <Checkbox.Group options={premise.racks} style={{display: 'block'}}/>
                              </Form.Item>
                            </ConfigProvider>
                          </Card>
                        </Col>
                      )})}
                  </Row>
                )}
              </Form.List>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default EditableCollocationFormList