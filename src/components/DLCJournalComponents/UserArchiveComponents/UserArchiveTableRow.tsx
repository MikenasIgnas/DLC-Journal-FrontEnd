/* eslint-disable max-len */
import React                      from 'react'
import { Tag, Typography }        from 'antd'
import HighlightText              from '../../UniversalComponents/HighlightText'
import { useSearchParams }        from 'react-router-dom'
import useSetRole                 from '../../../Plugins/useSetSingleRole'
import { convertUTCtoLocalDate }  from '../../../Plugins/helpers'

type UersTableProps = {
    id:           number;
    dateCreated:  string;
    dateDeleted:  string;
    email:        string;
    roleId:       string;
    name:         string;
    rowMenu:      React.ReactNode;
    status:       boolean;
}

const UserArchiveTableRows = ({dateCreated, dateDeleted, email, id, status, roleId, name, rowMenu}: UersTableProps) => {
  const [searchParams]  = useSearchParams()
  const filter          = searchParams.get('filter')
  const {data}          = useSetRole(roleId)

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
        <Typography>{HighlightText(filter, name)}</Typography>
      </td>
      <td>
        <Tag>{HighlightText(filter, data?.name)}</Tag>
      </td>
      <td>
        <Tag color={!status ? 'success' : 'error'}>{HighlightText(filter, !status ? 'aktyvus' : 'ištrintas')}</Tag>
      </td>
      <td>
        <Typography>{HighlightText(filter, convertUTCtoLocalDate(dateCreated))}</Typography>
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