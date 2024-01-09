/* eslint-disable max-len */
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
    <div className='VisitDateItemContainer'>
      {!edit ?
        <div className='DisplayFlex' style={{width: '110px', justifyContent: 'space-between'}}>
          <div>{date}</div>
          <div>{time}</div>
        </div> :
        (
          date && time &&
          <div className='DatePickerContainer'>
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