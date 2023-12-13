/* eslint-disable max-len */
import React                                                                                              from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Brush, ResponsiveContainer } from 'recharts'
import { VisitsType }                                                                                     from '../../../types/globalTypes'
import useGetChartDates                                                                                   from '../../../Plugins/useGetChartDates'
import { DatePicker }                                                                                     from 'antd'

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
    <ResponsiveContainer width='100%' height='100%' minWidth={500} minHeight={500}>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <RangePicker
          onChange={onRangeChange}
          presets={rangePresets}
        />
        <BarChart
          width={1500}
          height={500}
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
          <ReferenceLine y={0} stroke='#000' />
          <Brush dataKey='name' height={30} stroke='#8884d8' />
          <Tooltip />
          {uniqueCompanies.map((companyName, index) => (
            <Bar
              key={companyName}
              dataKey={companyName}
              stackId='a'
              fill={colorPalette[index % colorPalette.length]}
            />
          ))}
        </BarChart>
      </div>
    </ResponsiveContainer>
  )
}

export default CompaniesVisitsBarChart