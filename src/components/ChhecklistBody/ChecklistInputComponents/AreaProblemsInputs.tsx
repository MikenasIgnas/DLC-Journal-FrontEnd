/* eslint-disable max-len */
import React                                      from 'react'
import {Input, Form, Typography, ConfigProvider}  from 'antd'
import { useAppSelector }                         from '../../../store/hooks'
import CameraTool                                 from '../../../CameraTool'

type AreaProblemsInputsProps = {
  reaction: string | undefined,
  name:     number,
  dutiesId: number | undefined,
};

const { TextArea } = Input

const AreaProblemsInputs = ({ reaction, name, dutiesId }:AreaProblemsInputsProps) => {
  const today =         new Date()
  const currentTime =   `${today.getHours()}:${today.getMinutes()}`
  const defaultTheme =  useAppSelector((state) => state.theme.value)
  const isDesktop = window.innerWidth < 650
  return (
    <div className='AreaProblemsInputsContainer'>
      <div className='AreaProblemsInputsContainer'>
        <ConfigProvider theme ={{
          token: {
            colorBgContainer:     defaultTheme? '#1d1d1d' : 'white',
            colorText:            defaultTheme ? 'white' : 'black',
            colorTextPlaceholder: '#7d7d7d',
          },
        }}>
          <Form.Item className='FormItem' name={[name, 'ticketNr']}>
            <Input type='number' placeholder='Odoo bilieto Nr.' />
          </Form.Item>
          <Typography style={{color: defaultTheme ? 'white' : 'black'}}>Laikas:</Typography>
          <Form.Item className='FormItem' name={[name, 'time']} initialValue={currentTime}>
            <Input style={{color: defaultTheme ? 'white' : 'black'}} disabled placeholder='Laikas' value={currentTime} />
          </Form.Item>
          <Typography className='Typography' style={{color: defaultTheme ? 'white' : 'black'}} >{reaction}</Typography>
          <Form.Item className='FormItem' name={[name, 'notes']}>
            <TextArea placeholder='Pastabos' />
          </Form.Item>
        </ConfigProvider>
      </div>
      <div style={{display: 'flex', width: isDesktop ? '100%' : '20%', justifyContent: 'center', alignItems: 'center'}}>
        <CameraTool dutiesId={dutiesId}/>
      </div>
    </div>

  )
}

export default AreaProblemsInputs
