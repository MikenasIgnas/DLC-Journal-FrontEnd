/* eslint-disable max-len */
import React                                    from 'react'
import { PDFDownloadLink }                      from '@react-pdf/renderer'
import { get }                                  from '../../../Plugins/helpers'
import { HistoryDataType }                      from '../../../types/globalTypes'
import { useCookies }                           from 'react-cookie'
import { Button, DatePicker, DatePickerProps }  from 'antd'
import { RangePickerProps }                     from 'antd/es/date-picker'
import customParseFormat                        from 'dayjs/plugin/customParseFormat'
import dayjs                                    from 'dayjs'
import PDFTable                                 from './PDFTable'
dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker

const PDFGenerator = () => {

  const [cookies] = useCookies(['access_token'])
  const [reportData, setPDFData] = React.useState<HistoryDataType[]>()
  const [buttonText, setButtonText] = React.useState('Generuoti 1 menesio ataskaitą')
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
        if( !resRoutes.error && !resAreas.error && !resProblems.error && !resTodo.error){
          setFetchedPremisesData({routes: resRoutes.data , areas: resAreas.data, problems: resProblems.data, todo: resTodo.data})
          const historyData = await get('generateMonthlyPDFReport', cookies.access_token)
          setPDFData(historyData.data)
        }
      }catch(err){
        console.log(err)
      }
    })()
  }, [])

  const currentDate = reportData?.[0].startDate
  const dateInOneMonth = reportData?.[reportData?.length -1].startDate
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
    return current && (current > dayjs())
  }
  return(
    <div>
      <PDFDownloadLink document={<PDFTable fetchedPremisesData={fetchedPremisesData} tableData={reportData}/>} fileName={fileName}>
        {({loading}) => (loading ? <Button>Loading Document...</Button> : <Button>{buttonText}</Button> )}
      </PDFDownloadLink>
      <RangePicker
        format='YYYY-MM-DD'
      />
    </div>

  )
}

export default PDFGenerator


