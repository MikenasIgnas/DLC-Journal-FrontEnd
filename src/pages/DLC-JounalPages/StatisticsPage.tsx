/* eslint-disable max-len */
import React                          from 'react'
import { useCookies }                 from 'react-cookie'
import { get }                        from '../../Plugins/helpers'
import { HistoryDataType }            from '../../types/globalTypes'
import { DatePicker }                 from 'antd'
import type { Dayjs }                 from 'dayjs'
import type { TimeRangePickerProps }  from 'antd'
import dayjs                          from 'dayjs'
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const { RangePicker } = DatePicker

const StatisticsPage = () => {
  const formatDateString = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}/${month}/${day}`
  }
  const [cookies] =                   useCookies()
  const today = new Date()
  const lastMonth = new Date(today)
  lastMonth.setMonth(today.getMonth() - 1)

  const [visits, setVisits] = React.useState<HistoryDataType[] | undefined>()
  const [dateTo, setDateTo] = React.useState(today)
  const [dateFrom, setDateFrom] = React.useState(lastMonth)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const allVisits = await get('getVisits', cookies.access_token)
        setVisits(allVisits.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [cookies.access_token])


  function generateDates(startDate: Date, endDate: Date) {
    const dates: Date[] = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dates
  }
  const allDates = generateDates(dateFrom, dateTo)
  const data: { name: string; Vizitai: number }[] = []
  for (let i = 0; i < allDates.length; i++) {
    const visitCounter = visits?.filter((visit) => visit.startDate === formatDateString(allDates[i])).length || 0
    data.push({ name: formatDateString(allDates[i]), Vizitai: visitCounter })
  }

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ]

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      const startDate = dayjs(dateStrings[0]).toDate()
      const endDate = dayjs(dateStrings[1]).toDate()
      setDateFrom(startDate)
      setDateTo(endDate)
    } else {
      setDateFrom(lastMonth)
      setDateTo(today)
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <RangePicker presets={rangePresets} onChange={onRangeChange}/>
      <BarChart
        width={1500}
        height={500}
        data={data}
        margin={{
          top:    5,
          right:  30,
          left:   20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis tickCount={3} />
        <Tooltip />
        <Legend verticalAlign='top' wrapperStyle={{ lineHeight: '40px' }} />
        <ReferenceLine y={0} stroke='#000' />
        <Brush dataKey='name' height={30} stroke='#8884d8' />
        <Bar dataKey='Vizitai' fill='#8884d8' />
      </BarChart>
    </div>
  )
}

export default StatisticsPage