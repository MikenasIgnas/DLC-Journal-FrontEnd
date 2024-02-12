/* eslint-disable max-len */
import { ConfigProvider, DatePicker } from 'antd'
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { VisitsType }   from '../../../types/globalTypes'
import useGetChartDates from '../../../Plugins/useGetChartDates'
import locale           from 'antd/es/locale/lt_LT'
import 'dayjs/locale/lt'

const { RangePicker } = DatePicker

type VisitsBarChartProps = {
  visits: VisitsType[] | undefined;
};

type ChartDataType = {
  name: string;
  Vizitai: number;
};

const VisitsBarChart = ({ visits }: VisitsBarChartProps) => {
  const { allDates, formatDateString, onRangeChange, rangePresets } = useGetChartDates()

  const data: ChartDataType[] = []
  for (let i = 0; i < allDates.length; i++) {
    const visitCounter = visits?.filter((visit) => formatDateString(visit.endDate) === formatDateString(allDates[i])).length || 0
    data.push({ name: formatDateString(allDates[i]), Vizitai: visitCounter })
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <ConfigProvider locale={locale}>
        <RangePicker presets={rangePresets} onChange={onRangeChange}/>
      </ConfigProvider>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart
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
          <YAxis tickCount={4} />
          <Tooltip />
          <Legend verticalAlign='top' wrapperStyle={{ lineHeight: '40px' }} />
          <ReferenceLine y={0} stroke='#000' />
          <Brush dataKey='name' height={30} stroke='#8884d8' />
          <Bar dataKey='Vizitai' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VisitsBarChart