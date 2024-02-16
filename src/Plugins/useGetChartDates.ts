/* eslint-disable max-len */
import { TimeRangePickerProps } from 'antd'
import dayjs                    from 'dayjs'
import type { Dayjs }           from 'dayjs'
import React                    from 'react'
import { convertUTCtoLocalDate } from './helpers'

const useGetChartDates = () => {
  const today                   = new Date()
  const lastMonth               = new Date(today)
  lastMonth.setMonth(today.getMonth() - 1)
  const [dateTo, setDateTo]     = React.useState(today)
  const [dateFrom, setDateFrom] = React.useState(lastMonth)

  const formatDateString = (date: Date) => {
    const fullDate = convertUTCtoLocalDate(date)
    return fullDate
  }

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Paskutinės 7 Dienos', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Paskutinės 14 Dienų', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Paskutinės 30 Dienų', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Paskutinės 90 Dienų', value: [dayjs().add(-90, 'd'), dayjs()] },
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