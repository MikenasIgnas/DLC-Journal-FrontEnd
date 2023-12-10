/* eslint-disable max-len */
import React                                        from 'react'
import { Checkbox, Collapse, ConfigProvider, Form } from 'antd'

type ColocationSelectorsProps = {
    collocationSite:    string;
    colocationPremises: {
      premiseName:      string;
      racks:            string[]
    }[];
    colocationId:       string;
}

const ColocationSelectors = ({collocationSite, colocationPremises, colocationId }: ColocationSelectorsProps) => {
  const { Panel } = Collapse
  return(
    <div key={colocationId}>
      <Collapse className='CollocationSelectorCollapse'>
        <Panel className='CollocationSelectorPannel' header={collocationSite} key={colocationId}>
          <Form.List
            name={collocationSite}
            initialValue={colocationPremises?.map((ele) => ({[ele.premiseName]: []}))}
          >
            {(fields) => {
              return fields?.map(({ name }, index) => {
                const premise = colocationPremises[index]
                return(
                  <Collapse className='ColocationPremisesCollapse' key={index}>
                    <Panel key={colocationId} header={premise.premiseName}>
                      <ConfigProvider theme={{
                        token: {
                          marginXS: 0,
                        },
                      }}>
                        <Form.Item name={[name, premise.premiseName]}>
                          <Checkbox.Group options={premise.racks} className='CollocationSelectorCheckboxes'/>
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