/* eslint-disable max-len */
import { Modal, Form, Checkbox, Button, Collapse } from 'antd'
import form from 'antd/es/form'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
const colocations = [
  {
    site:     'J13',
    premises: [
      {
        premiseName: 'RA1',
        racks:       ['S1.1', 'S2.1', 'S3.1'],
      },
      {
        premiseName: 'RA2',
        racks:       [
          'S2.1', 'S2.2', 'S2.3', 'S2.4',
          'S3.1', 'S3.2', 'S3.3', 'S3.4', 'S3.5',
          'S4.0', 'S4.1', 'S4.2', 'S4.3', 'S4.4', 'S4.5',
          'S5.1', 'S5.2', 'S5.3', 'S5.4', 'S5.5',
          'S6.0', 'S6.1', 'S6.2', 'S6.3', 'S6.4', 'S6.5',
          'S7.0', 'S7.1', 'S7.2', 'S7.3', 'S7.4', 'S7.5',
          'S8.1', 'S8.2', 'S8.3', 'S8.4', 'S8.5',
          'S9.1',
        ],
      },
      {
        premiseName: 'RA3',
        racks:       [
          'S1.2', 'S1.3', 'S1.4',
          'S2.1', 'S2.2', 'S2.3',
          'S3.1', 'S3.2', 'S3.3',
          'S4.1', 'S4.2', 'S4.3',
          'S5.1A', 'S5.1B', 'S5.2','S5.3',
          'S6.0', 'S6.1', 'S6.2', 'S6.3', 'S6.4', 'S6.5',
          'S7.1A', 'S7.1B', 'S7.2', 'S7.3',
          'S8.1', 'S8.2', 'S8.3',
          'S9.1', 'S9.2',
          'S10.1', 'S10.2', 'S10.3',
        ],
      },
      {
        premiseName: 'DC1',
        racks:       [
          '101', '102', '103', '104', '105', '106', '107', '108', '109',
          '201', '202', '203', '204', '205', '206', '207', '208', '209',
          '301', '302', '303', '304', '305', '306', '307', '308', '309', '310',
          '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411',
        ],
      },
      {
        premiseName: 'DC2',
        racks:       [
          'S1.2', 'S1.3', 'S1.4', 'S1.5', 'S1.6', 'S1.7', 'S1.8', 'S1.9',
          'S2.1', 'S2.2', 'S2.3', 'S2.4A', 'S2.4B', 'S2.4C', 'S2.4D', 'S2.5', 'S2.6',
          'S3.1', 'S3.2', 'S3.3', 'S3.4', 'S3.5', 'S3.6', 'S3.7', 'S3.8', 'S3.9', 'S3.10',
          'S4.1', 'S4.2', 'S4.3', 'S4.4', 'S4.5',
        ],
      },
      {
        premiseName: 'DC3-C',
        racks:       [
          'SS02', 'SS03', 'SS04', 'SS05', 'SS06', 'SS07', 'SS08', 'SS09', 'SS10',
          'SS11', 'SS12', 'SS13', 'SS14', 'SS15', 'SS16',
          'RMS01', 'RMS02',
        ],
      },
      {
        premiseName: 'DC3-T',
        racks:       [
          '11', '12', '13', '14', '15', '16', '17', '18',
          '20', '21', '30', '31', '32', '33', '34', '35', '36',
          '37', '38', '39', '40', '41',
        ],
      },
      {
        premiseName: 'DC4',
        racks:       [
          'S1.2', 'S1.3', 'S1.4',
          'S2.3', 'S2.4', 'S2.5',
          'S3.1', 'S3.2', 'S3.3', 'S3.4', 'S3.5',
          'S4.1', 'S4.2', 'S4.3', 'S4.4', 'S4.5',
        ],
      },
      {
        premiseName: 'DC5',
        racks:       [
          'S1.1', 'S1.2', 'S1.3', 'S1.4', 'S1.5',
          'S2.1', 'S2.2', 'S2.3', 'S2.4', 'S2.5',
          'S3.1', 'S3.2', 'S3.3', 'S3.4', 'S3.5',
          'S4.1', 'S4.2', 'S4.3', 'S4.4',
        ],
      },
      {
        premiseName: 'OIB',
        racks:       ['KS-A', 'KS-B'],
      },
    ],
  },
  {
    site:     'T72',
    premises: [
      {
        premiseName: 'C1',
        racks:       [
          'S1.1', 'S1.2', 'S1.3', 'S1.4', 'S1.5', 'S1.6', 'S1.7', 'S1.8', 'S1.9', 'S1.10', 'S1.11', 'S1.12', 'S1.13',
          'S2.1', 'S2.2', 'S2.3', 'S2.4', 'S2.5', 'S2.6', 'S2.7', 'S2.8', 'S2.9', 'S2.10', 'S2.11', 'S2.12',
          'S3.1', 'S3.2', 'S3.3', 'S3.4', 'S3.5', 'S3.6', 'S3.7', 'S3.8', 'S3.9', 'S3.10', 'S3.11', 'S3.12',
        ],
      },
      {
        premiseName: 'C2',
        racks:       [
          'S4.1', 'S4.2', 'S4.3', 'S4.4', 'S4.5', 'S4.6', 'S4.7', 'S4.8', 'S4.9', 'S4.10',
          'S5.1', 'S5.2', 'S5.3', 'S5.4', 'S5.5', 'S5.6', 'S5.7', 'S5.8', 'S5.9', 'S5.10', 'S5.11', 'S5.12', 'S5.13',
        ],
      },
      {
        premiseName: 'C3',
        racks:       [
          'SS01A', 'SS02A', 'S203A', 'RMS01A', 'RMS02A', 'SS04A', 'SS05A', 'SS06A', 'SS07A',
          'SS01B', 'SS02B', 'SS03B', 'RMS01B', 'RMS01B', 'RMS03B', 'SS04B', 'SS05B', 'SS06B', 'RMS02B',
        ],
      },
      {
        premiseName: 'C4',
        racks:       [
          'S7.1', 'S7.2', 'S7.3', 'S7.4', 'S7.5', 'S7.6', 'S7.7', 'S7.8', 'S7.9', 'S7.10', 'S7.11', 'S7.12', 'S7.13', 'S7.14', 'S7.15', 'S7.16', 'S7.17',
          'S8.1', 'S8.2', 'S8.3', 'S8.4', 'S8.5', 'S8.6', 'S8.7', 'S8.8', 'S8.9', 'S8.10', 'S8.11', 'S8.12', 'S8.13', 'S8.14', 'S8.15', 'S8.16', 'S8.17',
        ],
      },
      {
        premiseName: 'OIA',
        racks:       ['KS1-A', 'KS2-A'],
      },
      {
        premiseName: 'OIB',
        racks:       ['KS1-B', 'KS2-B'],
      },
      {
        premiseName: 'SpaceX aikštelė',
        racks:       ['Antenos'],
      },
    ],
  },

]

type AdditionModalProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AdditionModal = ({setIsModalOpen}: AdditionModalProps) => {

  const [form] = useForm()
  const { Panel } =                     Collapse

  const addCompany = (values: any) => {
    console.log(values)
  }

  return (
    <Modal
      title='Pridėkite įmonę'
      centered
      open
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer={false}
    >
      <Form form={form} onFinish={addCompany}>
        <div className='CardContent'>
          {colocations.map((colocation, i) => {
            return (
              <Collapse key={i}>
                <Panel header={colocation.site} key={i}>
                  <Form.List
                    name={colocation.site}
                    initialValue={colocation.premises.map((ele) => ({[ele.premiseName]: []}))}
                  >
                    {(fields) => {
                      return fields.map(({ name, ...rest }, index) => {
                        const premise = colocation.premises[index]

                        return(
                          <Collapse key={index}>
                            <Panel key={Math.random()} header={premise.premiseName}>
                              <Form.Item name={[name, premise.premiseName]}>
                                <Checkbox.Group options={premise.racks} style={{padding: ' 5px'}} />
                              </Form.Item>
                            </Panel>
                          </Collapse>
                        )
                      }
                      )}
                    }
                  </Form.List>
                </Panel>
              </Collapse>
            )
          })
          }
        </div>
        {/* <Form.List
        name='newCompany'
        initialValue={colocations.map((el) => el.premises.map((ele) => ({[ele.premiseName]: ele.racks})))}
      >
        {(fields) => (
          <div className='CardContent' >
            {fields.map(({ name, ...rest }, index) => {
              const header = colocations[index].site
              const premises = colocations[index].premises
              return(
                <Collapse>
                  <Panel header={header} key={index}>
                    {premises.map((premise, i) =>
                      <Collapse>
                        <Panel key={i} header={premise.premiseName}>
                          <Form.Item name={[ header, premise.premiseName ]}>
                            <Checkbox.Group options={premise.racks} style={{padding: ' 5px'}} />
                          </Form.Item>
                        </Panel>
                      </Collapse>
                    )}
                  </Panel>
                </Collapse>
              )
            }
            )}
          </div>
        )}
      </Form.List> */}
        <Button htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default AdditionModal