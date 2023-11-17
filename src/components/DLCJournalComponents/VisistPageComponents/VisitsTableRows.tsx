/* eslint-disable max-len */
import React        from 'react'
import Checkbox     from '@mui/joy/Checkbox'
import Typography   from '@mui/joy/Typography'
import Box          from '@mui/joy/Box'
import { Tag }      from 'antd'

type VisitsTableRowsProps = {
    visitId: string;
    visitStatus: string | undefined;
    visitingClient: string;
    visitAddress: string;
    dlcEmployees: string;
    rowMenu?: React.ReactNode
    clientsEmployees: string;
}

const VisitsTableRows = ({visitId, visitStatus, visitAddress, visitingClient, dlcEmployees, rowMenu, clientsEmployees}: VisitsTableRowsProps) => {
  const [selected, setSelected] = React.useState<readonly string[]>([])
  return (
    <tr key={visitId}>
      <td style={{ textAlign: 'center', width: 120 }}>
        <Checkbox
          size='sm'
          checked={selected.includes(visitId)}
          color={selected.includes(visitId) ? 'primary' : undefined}
          onChange={(event) => {
            setSelected((ids) =>
              event.target.checked
                ? ids.concat(visitId)
                : ids.filter((itemId) => itemId !== visitId),
            )
          }}
          slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
          sx={{ verticalAlign: 'text-bottom' }}
        />
      </td>
      <td>
        <Typography level='body-xs'>{visitId}</Typography>
      </td>
      <td>
        <Tag color={visitStatus}>{visitStatus === 'processing' ? 'paruoštas' : 'pradėtas'}</Tag>
      </td>
      <td>
        <Typography level='body-xs'>{visitingClient}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{clientsEmployees}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{clientsEmployees}</Typography>
      </td>
      {/* <td>
      <Typography level='body-xs'>{data?.visitGoal.map((el, i) => (<Typography key={i}>{el}</Typography>))}</Typography>
    </td> */}
      <td>
        <Typography level='body-xs'>{visitAddress === '1' ? 'J13' : 'T72'}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{dlcEmployees}</Typography>
      </td>
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {rowMenu}
        </Box>
      </td>
    </tr>
  )
}

export default VisitsTableRows