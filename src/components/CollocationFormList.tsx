/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checkbox, Col, ConfigProvider, Divider, Form, Row } from 'antd'
import React from 'react'

type CollocationFormListProps = {
    collocations:   any;
    newObj2:        any;
}

const EditableCollocationFormList = ({collocations, newObj2}: CollocationFormListProps) => {
  return (
    <div style={{display: 'flex'}} >
      { collocations?.map((colocation:any, i:number) =>
        <div key={i} >
          <div>
            <Divider >
              {colocation.site}
            </Divider>
            <div>
              <Form.List
                name={colocation.site}
                initialValue={colocation.premises.map((premise: any) => {
                  const selectedRackData = newObj2[colocation.site as keyof typeof newObj2]?.find((data: any )=> data[premise.premiseName])
                  return {
                    [premise.premiseName]: selectedRackData ? selectedRackData[premise.premiseName] : [],
                  }
                })}
              >
                {(fields) => (
                  <Row gutter={[16, 16]} style={{display: 'flex', justifyContent: 'space-evenly'}} >
                    {fields.map(({ name, ...rest }, index) => {
                      const premise = colocation.premises[index]
                      return (
                        <Col span={10} key={index}>
                          <div>
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
                          </div>
                        </Col>
                      )
                    })}
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