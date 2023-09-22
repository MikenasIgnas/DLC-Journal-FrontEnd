/* eslint-disable max-len */
import React                from 'react'
import PDFFile              from './PDFfile'
import { PDFDownloadLink }  from '@react-pdf/renderer'
import { get } from '../../../Plugins/helpers'
import { HistoryDataType } from '../../../types/globalTypes'
import { useCookies } from 'react-cookie'
import { Button, DatePicker, DatePickerProps } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import PDFTable from './PDFTable'
dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker

const PDFGenerator = () => {

  const [cookies] = useCookies(['access_token'])
  const [pdfData, setPDFData] = React.useState<HistoryDataType[]>()
  const [buttonText, setButtonText] = React.useState('Generuoti 1 menesio ataskaitą')

  React.useEffect(() => {
    (async () => {
      try{
        const historyData = await get('generateMonthlyPDFReport', cookies.access_token)
        setPDFData(historyData.data)
      }catch(err){
        console.log(err)
      }
    })()
  }, [])

  const currentDate = pdfData?.[0].startDate
  const dateInOneMonth = pdfData?.[pdfData?.length -1].startDate
  const fileName = `Patalpų tikrinimo ataskaita ${currentDate} - ${dateInOneMonth}`

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    setButtonText(`Generuoti ${dateString[0]} - ${dateString[1]} ataskaitą`)
    if(dateString[0] === '' && dateString[1] === ''){
      setButtonText('Generuoti 1 menesio ataskaitą')
    }
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().add(10, 'day').endOf('day')
  }
  return(
    <div>
      <PDFDownloadLink document={<PDFTable/>} fileName={fileName}>
        {({loading}) => (loading ? <Button>Loading Document...</Button> : <Button>{buttonText}</Button> )}
      </PDFDownloadLink>
      <RangePicker
        disabledDate={disabledDate}
        format='YYYY-MM-DD'
      />
    </div>

  )
}

export default PDFGenerator


