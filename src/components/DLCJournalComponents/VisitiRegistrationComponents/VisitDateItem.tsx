/* eslint-disable max-len */
import React                            from 'react'
import { DatePicker, Form, TimePicker } from 'antd'
import dayjs                            from 'dayjs'


type VisitDateItemProps = {
  edit:             boolean
  date:             string | undefined;
  time:             string | undefined;
  dateFormItemName: string;
  timeFormItemName: string;
}

const VisitDateItem = ({edit, date, time, dateFormItemName, timeFormItemName}:VisitDateItemProps) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {!edit ?
        <div style={{display: 'flex'}}>
          <div>{date || ''}</div>
          <div>{time || ''}</div>
        </div> :
        (
          date && time &&
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Form.Item name={dateFormItemName} initialValue={dayjs(date)}>
              <DatePicker/>
            </Form.Item>
            <Form.Item name={timeFormItemName} initialValue={dayjs(time, 'HH:mm')}>
              <TimePicker format={'HH:mm'}/>
            </Form.Item>
          </div>
        )
      }
    </div>
  )
}

export default VisitDateItem