/* eslint-disable max-len */
import { TimeRangePickerProps } from 'antd'
import dayjs                    from 'dayjs'
import type { Dayjs }           from 'dayjs'
import React                    from 'react'

const useGetChartDates = () => {
  const today                   = new Date()
  const lastMonth               = new Date(today)
  lastMonth.setMonth(today.getMonth() - 1)
  const [dateTo, setDateTo]     = React.useState(today)
  const [dateFrom, setDateFrom] = React.useState(lastMonth)

  const formatDateString = (date: Date) => {
    const year  = date.getFullYear()
    const month = date.getMonth() + 1
    const day   = date.getDate()
    return `${year}/${month}/${day}`
  }

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ]

  const generateDates = (startDate: Date, endDate: Date) => {
    const dates: Date[] = []
    const currentDate   = new Date(startDate)

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
  }

  const allDates = generateDates(dateFrom, dateTo)

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
  return {formatDateString, rangePresets, allDates, onRangeChange}
}

export default useGetChartDates