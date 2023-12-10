/* eslint-disable max-len */
import React                from 'react'
import { Tag, Typography }  from 'antd'
import HighlightText        from '../../UniversalComponents/HighlightText'
import { useSearchParams }  from 'react-router-dom'

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
  const [searchParams] = useSearchParams()
  const filter =         searchParams.get('filter')

  return (
    <tr key={id}>
      <td style={{padding: '12px'}}>
        <Typography>{HighlightText(filter, String(id))}</Typography>
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
        <Tag color={'success'}>{HighlightText(filter, status)}</Tag>
      </td>
      <td>
        <Typography >{HighlightText(filter, dateCreated)}</Typography>
      </td>
      <td>
        {rowMenu}
      </td>
    </tr>
  )
}

export default UersTableRows