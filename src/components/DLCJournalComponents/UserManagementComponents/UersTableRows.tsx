/* eslint-disable max-len */
import React                      from 'react'
import { Tag, Typography }        from 'antd'
import HighlightText              from '../../UniversalComponents/HighlightText'
import { useSearchParams }        from 'react-router-dom'
import { convertUTCtoLocalDate }  from '../../../Plugins/helpers'

type UersTableProps = {
    id:           number;
    dateCreated:  string;
    email:        string;
    isAdmin:      boolean;
    name:         string;
    rowMenu:      React.ReactNode;
    disabledDate?: string;
    status:       boolean
    username:     string;
}

const UersTableRows = ({dateCreated, email, id, isAdmin, name, rowMenu, status, disabledDate, username}: UersTableProps) => {
  const [searchParams] = useSearchParams()
  const filter =         searchParams.get('filter')
  return (
    <tr key={id}>
      <td style={{padding: '12px'}}>
        <Typography>{HighlightText(filter, String(id))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, username)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, email)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, name)}</Typography>
      </td>
      <td>
        <Tag>{HighlightText(filter, isAdmin ? 'admin': 'user')}</Tag>
      </td>
      <td>
        <Tag color={!status ? 'success' : 'error'}>{HighlightText(filter, !status ? 'aktyvus' : 'ištrintas')}</Tag>
      </td>
      <td>
        <Typography >{HighlightText(filter, convertUTCtoLocalDate(dateCreated))}</Typography>
      </td>
      <td>
        {disabledDate && (
          <Typography>{HighlightText(filter, convertUTCtoLocalDate(disabledDate))}</Typography>
        )}
      </td>
      <td>
        {rowMenu}
      </td>
    </tr>
  )
}

export default UersTableRows