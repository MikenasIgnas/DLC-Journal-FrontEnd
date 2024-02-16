/* eslint-disable max-len */
import React                            from 'react'
import { Button, Tag, Typography }      from 'antd'
import Box                              from '@mui/joy/Box'
import HighlightText                    from '../../UniversalComponents/HighlightText'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { calculateTimeDifference }      from '../../../Plugins/helpers'

type UersTableProps = {
  id:         number;
  employee:   string;
  startTime:  string;
  startDate:  string;
  endTime:    string;
  endDate:    string;
  problems:   number;
  rowMenu:    React.ReactNode;
};

const ChecklistHistoryTableRows = ({
  id,
  employee,
  startTime,
  startDate,
  endTime,
  endDate,
  problems,
  rowMenu,
}: UersTableProps) => {
  const [searchParams]  = useSearchParams()
  const filter          = searchParams.get('search')
  const fullStartTime   = `${startDate} ${startTime}`
  const fullEndTime     = `${endDate} ${endTime}`
  const timeDifferencer = calculateTimeDifference(startDate, startTime, endDate, endTime)
  const navigate        = useNavigate()
  return (
    <tr key={id}>
      <td style={{ padding: '12px' }}>
        <Typography>{HighlightText(filter, String(id))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, employee)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, fullStartTime)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, fullEndTime)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, timeDifferencer)}</Typography>
      </td>
      <td>
        <Tag color={problems > 0 ? 'error' : 'success'}>{HighlightText(filter, String(problems))}</Tag>
      </td>
      <td>
        <Button type='link' style={{border: '1px solid #1677ff'}} onClick={() => navigate(`${id}`)}>Peržiūrėti</Button>
      </td>
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>{rowMenu}</Box>
      </td>
    </tr>
  )
}

export default ChecklistHistoryTableRows