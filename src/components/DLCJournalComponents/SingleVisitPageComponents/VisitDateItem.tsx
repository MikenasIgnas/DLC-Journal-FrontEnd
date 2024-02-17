/* eslint-disable max-len */
import dayjs              from 'dayjs'
import locale             from 'antd/es/locale/lt_LT'

import {
  ConfigProvider,
  DatePicker,
  Form,
}                         from 'antd'

import {
  convertUTCtoLocalDate,
  convertUTCtoLocalTime,
}                         from '../../../Plugins/helpers'

import 'dayjs/locale/lt'

type VisitDateItemProps = {
  edit:             boolean
  date:             Date | undefined;
  dateFormItemName: string;
}

const VisitDateItem = ({edit, date, dateFormItemName}:VisitDateItemProps) => {

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
            <ConfigProvider locale={locale}>
              <Form.Item name={dateFormItemName} initialValue={dayjs(date)}>
                <DatePicker showTime={{ format: 'HH:mm' }} format='YYYY-MM-DD HH:mm'/>
              </Form.Item>
            </ConfigProvider>
          </div>
        )
      }
    </div>
  )
}

export default VisitDateItem