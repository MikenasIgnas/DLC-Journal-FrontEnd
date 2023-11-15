/* eslint-disable max-len */
import React            from 'react'
import Checkbox         from '@mui/joy/Checkbox'
import Typography       from '@mui/joy/Typography'
import Box              from '@mui/joy/Box'
import Link             from '@mui/joy/Link'
import { useNavigate }  from 'react-router'

type UersTableProps = {
    id:         number;
    employee:   string;
    startTime:    string;
    startDate:    string;
    endTime:      string;
    endDate:      string;
    duration:   string;
    problems:   React.ReactNode;
    rowMenu:    React.ReactNode
}

const ChecklistHistoryTableRows = ({id, employee, startTime, startDate, endTime, endDate, duration, problems, rowMenu}: UersTableProps) => {
  const [selected, setSelected] =   React.useState<readonly string[]>([])
  const navigate =                  useNavigate()

  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)
  const difference = (endHour * 60 + endMinute) - (startHour * 60 + startMinute)
  const differenceString = `${Math.floor(difference / 60)}:${(difference % 60).toString().padStart(2, '0')}`
  return (
    <tr key={id}>
      <td style={{ textAlign: 'center', width: 120 }}>
        <Checkbox
          size='sm'
          checked={selected.includes(String(id))}
          color={selected.includes(String(id)) ? 'primary' : undefined}
          onChange={(event) => {
            setSelected((ids) =>
              event.target.checked
                ? ids.concat(String(id))
                : ids.filter((itemId) => itemId !== String(id)),
            )
          }}
          slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
          sx={{ verticalAlign: 'text-bottom' }}
        />
      </td>
      <td>
        <Typography level='body-xs'>{id}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{employee}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{startDate} {startTime}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{endDate} {endTime}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{differenceString}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{problems}</Typography>
      </td>
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link onClick={() => navigate(`${id}`)} level='body-xs' component='button'>
          Peržiūrėti
          </Link>
          {rowMenu}
        </Box>
      </td>
    </tr>
  )
}

export default ChecklistHistoryTableRows