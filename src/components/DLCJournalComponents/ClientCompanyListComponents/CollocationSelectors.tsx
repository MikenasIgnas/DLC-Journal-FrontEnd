/* eslint-disable max-len */
import { Checkbox, Col, Collapse, ConfigProvider, Form, Row } from 'antd'
import React from 'react'

type ColocationSelectorsProps = {
    collocationSite:    string;
    colocationPremises: {
      premiseName: string;
      racks: string[]
    }[];
    colocationId:       string;
}

const ColocationSelectors = ({collocationSite, colocationPremises, colocationId }: ColocationSelectorsProps) => {
  const { Panel } = Collapse
  return(
    <div key={colocationId}>
      <Collapse style={{marginBottom: '10px', marginTop: '10px', width: '360px'}}>
        <Panel style={{padding: '10px'}} header={collocationSite} key={colocationId}>
          <Form.List
            name={collocationSite}
            initialValue={colocationPremises?.map((ele) => ({[ele.premiseName]: []}))}
          >
            {(fields) => {
              return fields?.map(({ name }, index) => {
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
                          <Checkbox.Group options={premise.racks} style={{
                            display:             'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap:                 '8px',
                          }}/>
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
