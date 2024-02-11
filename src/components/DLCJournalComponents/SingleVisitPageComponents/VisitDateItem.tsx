/* eslint-disable max-len */
import { DatePicker, Form } from 'antd'
import dayjs                            from 'dayjs'
import { convertUTCtoLocalDate, convertUTCtoLocalTime } from '../../../Plugins/helpers'


type VisitDateItemProps = {
  edit:             boolean
  date:             Date | undefined;
  dateFormItemName: string;
}

const VisitDateItem = ({edit, date, dateFormItemName}:VisitDateItemProps) => {
  console.log(date)
  return (
    <div className='VisitDateItemContainer'>
      {!edit ?
        <div className='DisplayFlex' style={{width: '110px', justifyContent: 'space-between'}}>
          <div>{convertUTCtoLocalDate(date)}</div>
          <div>{convertUTCtoLocalTime(date)}</div>
        </div> :
        (
          date &&
          <div className='DatePickerContainer'>
            <Form.Item name={dateFormItemName} initialValue={dayjs(date)}>
              <DatePicker/>
            </Form.Item>
          </div>
        )
      }
    </div>
  )
}

export default VisitDateItem