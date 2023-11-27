/* eslint-disable max-len */
import React                                    from 'react'
import { PDFDownloadLink }                      from '@react-pdf/renderer'
import { get }                                  from '../../../Plugins/helpers'
import { HistoryDataType }                      from '../../../types/globalTypes'
import { useCookies }                           from 'react-cookie'
import { Button, DatePicker, DatePickerProps }  from 'antd'
import { RangePickerProps }                     from 'antd/es/date-picker'
import customParseFormat                        from 'dayjs/plugin/customParseFormat'
import PDFTable                                 from './PDFTable'
import type { TimeRangePickerProps }            from 'antd'
import dayjs                                    from 'dayjs'
dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker

const PDFGenerator = () => {
  const [cookies] = useCookies(['access_token'])
  const [reportData, setPDFData] = React.useState<HistoryDataType[]>()
  const [buttonText, setButtonText] = React.useState('Generuoti ataskaitą')
  const [specificDate, setSpecificDate] = React.useState('')
  const currentDate = reportData?.[0]?.startDate
  const dateInAMonth = reportData?.[reportData?.length -1]?.startDate
  const fileName = `Patalpu tikrinimo ataskaita ${currentDate} - ${dateInAMonth}`
  const [fetchedPremisesData, setFetchedPremisesData] = React.useState({
    routes:   null,
    areas:    null,
    problems: null,
    todo:     null,
  })

  React.useEffect(() => {
    (async () => {
      try{
        const resRoutes =             await get('routeData', cookies.access_token)
        const resAreas =              await get('areasData', cookies.access_token)
        const resProblems =           await get('problemsData', cookies.access_token)
        const resTodo =               await get('todoData', cookies.access_token)
        const historyData =           await get('generateMonthlyPDFReport', cookies.access_token)
        if( !resRoutes.error && !resAreas.error && !resProblems.error && !resTodo.error){
          setFetchedPremisesData({routes: resRoutes.data , areas: resAreas.data, problems: resProblems.data, todo: resTodo.data})
          setPDFData(historyData.data)
        }
      }catch(err){
        console.log(err)
      }
    })()
  }, [])


  const onChange = async(
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    setButtonText(`Generuoti ${dateString[0]} - ${dateString[1]} ataskaitą`)
    const getSpecificDateReport = await get(`getSpecificDateReport?startDate=${dateString[0]}&endDate=${dateString[1]}`, cookies.access_token)
    setSpecificDate(`${dateString[0]} - ${dateString[1]}`)
    setPDFData(getSpecificDateReport.data)
  }

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ]

  return(
    <>
      <RangePicker presets={rangePresets} onChange={onChange} />
      <PDFDownloadLink document={<PDFTable key={Math.random()} fetchedPremisesData={fetchedPremisesData} tableData={reportData} specificDate={specificDate}/>} fileName={fileName}>
        <Button>{buttonText}</Button>
      </PDFDownloadLink>
    </>
  )
}

export default PDFGenerator


