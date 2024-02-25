/* eslint-disable max-len */
import React                                            from 'react'
import { Button, ConfigProvider, DatePicker, Tooltip }  from 'antd'
import dayjs                                            from 'dayjs'
import type { Dayjs }                                   from 'dayjs'
import type { TimeRangePickerProps }                    from 'antd'
import useGenerateVisitsReport                           from '../../../Plugins/useGenerateVisitsReport'
import locale                                           from 'antd/es/locale/lt_LT'
import 'dayjs/locale/lt'

const { RangePicker } = DatePicker

type PdfGeneratorProps = {
    url :         string
    tooltipText:  string
}

const PdfGenerator = ({url, tooltipText}: PdfGeneratorProps) => {
  const [reportDateFrom, setReportDateFrom]   = React.useState<Dayjs | null>()
  const [reportDateTo, setReportDateTo]       = React.useState<Dayjs | null>()
  const {generateVisitsReport, loading}       = useGenerateVisitsReport()

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (dates) {
      setReportDateFrom(dates[0])
      setReportDateTo(dates[1])
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

export default PdfGenerator