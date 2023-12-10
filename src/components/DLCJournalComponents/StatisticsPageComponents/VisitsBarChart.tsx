/* eslint-disable max-len */
import React                                                                                 from 'react'
import { DatePicker}                                                                         from 'antd'
import { Bar, BarChart, Brush, CartesianGrid, Legend, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts'
import { VisitsType }                                                                        from '../../../types/globalTypes'
import useGetChartDates                                                                      from '../../../Plugins/useGetChartDates'
const { RangePicker } = DatePicker

type VisitsBarChartProps = {
    visits: VisitsType[] | undefined
}

type ChartDataType = {
    name: string; Vizitai: number
}

const VisitsBarChart = ({visits}: VisitsBarChartProps) => {
  const {allDates, formatDateString, onRangeChange, rangePresets}   = useGetChartDates()

  const data: ChartDataType[] = []
  for (let i = 0; i < allDates.length; i++) {
    const visitCounter = visits?.filter((visit) => visit.endDate === formatDateString(allDates[i])).length || 0
    data.push({ name: formatDateString(allDates[i]), Vizitai: visitCounter })
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

export default VisitsBarChart