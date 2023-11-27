/* eslint-disable max-len */
import React                from 'react'
import Checkbox             from '@mui/joy/Checkbox'
import { Tag, Typography }  from 'antd'
import HighlightText        from '../../UniversalComponents/HighlightText'
import { useSearchParams }  from 'react-router-dom'

type UersTableProps = {
    id:           string;
    dateCreated:  string;
    dateDeleted:  string;
    email:        string;
    userRole:     string;
    username:     string;
    rowMenu:      React.ReactNode;
    status:       string;
}

const UserArchiveTableRows = ({dateCreated, dateDeleted, email, id, status, userRole, username, rowMenu}: UersTableProps) => {
  const [searchParams] =            useSearchParams()
  const filter =                    searchParams.get('filter')

  return (
    <tr key={id}>
      <td style={{padding: '12px'}}>
        <Typography>{HighlightText(filter, id)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, email)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, email)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, username)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, userRole)}</Typography>
      </td>
      <td>
        <Tag color={status === 'active' ? 'success' : 'error'}>{HighlightText(filter, status)}</Tag>
      </td>
      <td>
        <Typography>{HighlightText(filter, dateCreated)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, dateDeleted)}</Typography>
      </td>
      <td>
        {rowMenu}
      </td>
    </tr>
  )
}

export default UserArchiveTableRows