/* eslint-disable max-len */
import React                                                                                              from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Brush, ResponsiveContainer } from 'recharts'
import { VisitsType }                                                                                     from '../../../types/globalTypes'
import useGetChartDates                                                                                   from '../../../Plugins/useGetChartDates'
import { ConfigProvider, DatePicker }                                                                                     from 'antd'
import locale                                           from 'antd/es/locale/lt_LT'
import 'dayjs/locale/lt'
const { RangePicker } = DatePicker

type CompaniesVisitsBarChartProps = {
  visits: VisitsType[] | undefined;
};

const CompaniesVisitsBarChart = ({ visits }: CompaniesVisitsBarChartProps) => {
  const { allDates, formatDateString, onRangeChange, rangePresets } = useGetChartDates()
  const companyData: { [date: string]: { [companyName: string]: number } } = {}

  allDates.forEach((date) => {
    const dateString = formatDateString(date)
    const dailyVisits = visits?.filter((visit) => visit?.endDate === dateString) || []
    dailyVisits.forEach((visit) => {
      const companyName = visit?.visitingClient || 'Unknown Company'
      if (!companyData[dateString]) {
        companyData[dateString] = {}
      }
      if (companyData[dateString][companyName]) {
        companyData[dateString][companyName]++
      } else {
        companyData[dateString][companyName] = 1
      }
    })
  })

  const data = allDates.map((date) => {
    const dateString = formatDateString(date)
    const companies = companyData[dateString] || {}
    return {
      name: dateString,
      ...companies,
    }
  })

  const colorPalette = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#bada55']

  const uniqueCompanies = Array.from(
    new Set(data.flatMap((entry) => Object.keys(entry).filter((key) => key !== 'name')))
  )

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <ConfigProvider locale={locale}>
        <RangePicker presets={rangePresets} onChange={onRangeChange}/>
      </ConfigProvider>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart
          data={data}
          margin={{
            top:    20,
            right:  30,
            left:   20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis tickCount={3}/>
          <Tooltip />
          <ReferenceLine y={0} stroke='#000' />
          <Brush dataKey='name' height={30} stroke='#8884d8' />
          {uniqueCompanies.map((companyName, index) => (
            <Bar
              key={companyName}
              dataKey={companyName}
              stackId='a'
              fill={colorPalette[index % colorPalette.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CompaniesVisitsBarChart