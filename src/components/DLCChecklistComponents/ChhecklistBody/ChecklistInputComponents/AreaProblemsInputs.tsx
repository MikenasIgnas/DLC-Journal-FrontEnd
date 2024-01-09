/* eslint-disable max-len */
import {Input, Form, Typography}  from 'antd'
import CameraTool                 from '../../../../CameraTool'

type AreaProblemsInputsProps = {
  reaction: string | undefined,
  name:     number,
  dutiesId: number | undefined,
};

const { TextArea } = Input

const AreaProblemsInputs = ({ reaction, name, dutiesId }:AreaProblemsInputsProps) => {
  const today         = new Date()
  const currentTime   = `${today.getHours()}:${today.getMinutes()}`
  const isDesktop     = window.innerWidth < 650
  return (
    <div className='AreaProblemsInputsContainer'>
      <div className='AreaProblemsInputsContainer'>
        <Form.Item className='FormItem' name={[name, 'ticketNr']}>
          <Input type='number' placeholder='Odoo bilieto Nr.' />
        </Form.Item>
        <Typography>Laikas:</Typography>
        <Form.Item className='FormItem' name={[name, 'time']} initialValue={currentTime}>
          <Input disabled placeholder='Laikas' value={currentTime} />
        </Form.Item>
        <Typography className='Typography'>{reaction}</Typography>
        <Form.Item className='FormItem' name={[name, 'notes']}>
          <TextArea placeholder='Pastabos' />
        </Form.Item>
      </div>
      <div style={{display: 'flex', width: isDesktop ? '100%' : '20%', justifyContent: 'center', alignItems: 'center'}}>
        <CameraTool dutiesId={dutiesId}/>
      </div>
    </div>

  )
}

export default AreaProblemsInputs