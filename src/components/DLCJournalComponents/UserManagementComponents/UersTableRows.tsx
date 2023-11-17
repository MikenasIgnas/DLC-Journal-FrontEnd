/* eslint-disable max-len */
import React      from 'react'
import Checkbox   from '@mui/joy/Checkbox'
import Typography from '@mui/joy/Typography'
import {Tag}      from 'antd'

type UersTableProps = {
    id:           string;
    dateCreated:  string;
    email:        string;
    userRole:     string;
    username:     string;
    rowMenu:      React.ReactNode;
    status:       string;
}

const UersTableRows = ({dateCreated, email, id, status, userRole, username, rowMenu}: UersTableProps) => {
  const [selected, setSelected] =   React.useState<readonly string[]>([])
  return (
    <tr key={id}>
      <td style={{ textAlign: 'center', width: 120 }}>
        <Checkbox
          size='sm'
          checked={selected.includes(id)}
          color={selected.includes(id) ? 'primary' : undefined}
          onChange={(event) => {
            setSelected((ids) =>
              event.target.checked
                ? ids.concat(id)
                : ids.filter((itemId) => itemId !== id),
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
        <Typography level='body-xs'>{email}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{email}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{username}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{userRole}</Typography>
      </td>
      <td>
        <Tag color={'success'}>{status}</Tag>
      </td>
      <td>
        <Typography level='body-xs'>{dateCreated}</Typography>
      </td>
      <td>
        {rowMenu}
      </td>
    </tr>
  )
}

export default UersTableRows