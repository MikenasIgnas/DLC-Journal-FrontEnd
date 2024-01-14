/* eslint-disable max-len */
import React                            from 'react'
import { Button, Tag, Typography }      from 'antd'
import HighlightText                    from '../../UniversalComponents/HighlightText'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { convertUTCtoLocalDate }        from '../../../Plugins/helpers'

type UersTableProps = {
    id:           number;
    userId:       string;
    dateCreated:  string;
    email:        string;
    isAdmin:      boolean;
    name:         string;
    rowMenu:      React.ReactNode;
    disabledDate?: string;
    status:       boolean
    username:     string;
    isSecurity:   boolean;
}

const UersTableRows = ({dateCreated, email, id, userId, isAdmin, name, rowMenu, status, disabledDate, username, isSecurity}: UersTableProps) => {
  const [searchParams]  = useSearchParams()
  const filter          = searchParams.get('search')
  const navigate        = useNavigate()

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
        <Tag>{HighlightText(filter, isSecurity ? 'apsauga' : isAdmin ? 'admin': 'user' )}</Tag>
      </td>
      <td>
        <Tag color={!status ? 'success' : 'error'}>{HighlightText(filter, !status ? 'aktyvus' : 'neaktyvus')}</Tag>
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
        <Button type='link' style={{border: '1px solid #1677ff'}} onClick={() => navigate(`${userId}`)}>Peržiūrėti</Button>
      </td>
      <td>
        {rowMenu}
      </td>
    </tr>
  )
}

export default UersTableRows