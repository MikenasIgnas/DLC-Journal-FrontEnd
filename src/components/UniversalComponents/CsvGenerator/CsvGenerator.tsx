/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                            from 'react'
import { Button, ConfigProvider, DatePicker, Tooltip }  from 'antd'
import dayjs                                            from 'dayjs'
import type { Dayjs }                                   from 'dayjs'
import type { TimeRangePickerProps }                    from 'antd'
import useGenerateVisitsReport                           from '../../../Plugins/useGenerateVisitsReport'
import locale                                           from 'antd/es/locale/lt_LT'
import 'dayjs/locale/lt'
import { convertUTCtoLocalDate } from '../../../Plugins/helpers'

const { RangePicker } = DatePicker

type CsvGeneratorProps = {
    url :         string
    tooltipText:  string
}

const CsvGenerator = ({url, tooltipText}: CsvGeneratorProps) => {
  const [reportDateFrom, setReportDateFrom]   = React.useState<string>()
  const [reportDateTo, setReportDateTo]       = React.useState<string>()
  const {generateVisitsReport, loading}       = useGenerateVisitsReport()

  const onRangeChange = (dates: null | (Dayjs | null)[], dateString: [string, string] | string) => {
    if (dateString) {
      const dateFrom = convertUTCtoLocalDate(dateString[0])
      const dateTo = convertUTCtoLocalDate(dateString[1])
      setReportDateFrom(dateFrom)
      setReportDateTo(dateTo)
    } else {
      setReportDateFrom(undefined)
      setReportDateTo(undefined)
    }
  }

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Paskutinės 7 Dienos', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Paskutinės 14 Dienų', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Paskutinės 30 Dienų', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Paskutinės 90 Dienų', value: [dayjs().add(-90, 'd'), dayjs()] },
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
      <div style={{display: 'flex'}}>
        <ConfigProvider locale={locale}>
          <RangePicker presets={rangePresets} onChange={onRangeChange}/>
        </ConfigProvider>
        {reportDateFrom && reportDateTo &&
      <Tooltip title={tooltipText} color='blue'>
        <Button loading={loading} onClick={() => generateVisitsReport(url, reportDateFrom, reportDateTo)}>Ataskaita</Button>
      </Tooltip>
        }
      </div>
    </div>
  )
}

export default CsvGenerator