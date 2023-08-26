/* eslint-disable max-len */
import { Checkbox, Collapse, ConfigProvider, Form } from 'antd'
import React from 'react'

type ColocationSelectorsProps = {
    key:           number;
    collocationSite:    string;
    colocationPremises: any[]
    colocationId:       string;
}

const ColocationSelectors = ({key, collocationSite, colocationPremises, colocationId }: ColocationSelectorsProps) => {
  const { Panel } =                       Collapse

  return(
    <div key={key}>
      <Collapse style={{marginBottom: '10px', marginTop: '10px', width: '200px'}} key={key}>
        <Panel style={{padding: '10px'}} header={collocationSite} key={key}>
          <Form.List
            name={collocationSite}
            initialValue={colocationPremises.map((ele:any) => ({[ele.premiseName]: []}))}
          >
            {(fields) => {
              return fields.map(({ name, ...rest }, index) => {
                const premise = colocationPremises[index]
                return(
                  <Collapse style={{marginTop: '5px'}} key={index}>
                    <Panel key={colocationId} header={premise.premiseName}>
                      <ConfigProvider theme={{
                        token: {
                          marginXS: 0,
                        },
                      }}>
                        <Form.Item name={[name, premise.premiseName]}>
                          <Checkbox.Group options={premise.racks} style={{display: 'block'}} />
                        </Form.Item>
                      </ConfigProvider>
                    </Panel>
                  </Collapse>
                )
              })}
            }
          </Form.List>
        </Panel>
      </Collapse>
    </div>
  )
}

export default ColocationSelectors
