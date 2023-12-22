/* eslint-disable max-len */
import React                             from 'react'
import { Button, DatePicker, Tooltip }   from 'antd'
import dayjs                             from 'dayjs'
import type { Dayjs }                    from 'dayjs'
import type { TimeRangePickerProps }     from 'antd'
import useGenerateMultiplePDF            from '../../../Plugins/useGenerateMultiplePDF'

const { RangePicker } = DatePicker

type PdfGeneratorProps = {
    url: string
}

const PdfGenerator = ({url}: PdfGeneratorProps) => {
  const [pdfDateFrom, setPDFDateFrom]   = React.useState<string | undefined>()
  const [pdfDateTo, setPDFDateTo]       = React.useState<string | undefined>()
  const {generateMultiplePdf, loading}  = useGenerateMultiplePDF()

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setPDFDateFrom(dateStrings[0])
      setPDFDateTo(dateStrings[1])
    } else {
      setPDFDateFrom(undefined)
      setPDFDateTo(undefined)
    }
  }
  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ]
  return (
    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
      <div style={{display: 'flex'}}>
        <RangePicker presets={rangePresets} onChange={onRangeChange}/>
        {pdfDateFrom && pdfDateTo &&
      <Tooltip title='Generuoja tik pabaigtus vizitus' color='blue'>
        <Button loading={loading} onClick={() => generateMultiplePdf(url, pdfDateFrom, pdfDateTo)}>PDF</Button>
      </Tooltip>
        }
      </div>
    </div>
  )
}

export default PdfGenerator