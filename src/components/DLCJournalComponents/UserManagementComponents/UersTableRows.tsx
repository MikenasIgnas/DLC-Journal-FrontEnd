/* eslint-disable max-len */
import { Button, Tag, Typography }      from 'antd'
import HighlightText                    from '../../UniversalComponents/HighlightText'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { convertUTCtoLocalDate }        from '../../../Plugins/helpers'
import { UserType }                     from '../../../types/globalTypes'
import { useAppSelector } from '../../../store/hooks'

type UersTableProps = {
    id:           number;
    deleteItem?:  (id: string) => Promise<void>
    deleteButtonText: string
    item: UserType
}

const UersTableRows = ({ id, item, deleteItem, deleteButtonText }: UersTableProps) => {
  const [searchParams]  = useSearchParams()
  const filter          = searchParams.get('search')
  const navigate        = useNavigate()
  const isAdmin                         = useAppSelector((state) => state.auth.isAdmin)
  return (
    <tr key={id}>
      <td style={{padding: '12px'}}>
        <Typography>{HighlightText(filter, String(id))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, item.username)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, item.email)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, item.name)}</Typography>
      </td>
      <td>
        <Tag>{HighlightText(filter, item.isSecurity ? 'apsauga' : item.isAdmin ? 'admin': 'user' )}</Tag>
      </td>
      <td>
        <Tag color={!item.isDisabled ? 'success' : 'error'}>{HighlightText(filter, !item.isDisabled ? 'aktyvus' : 'neaktyvus')}</Tag>
      </td>
      <td>
        <Typography >{HighlightText(filter, convertUTCtoLocalDate(item.created))}</Typography>
      </td>
      <td>
        {item.disabledDate && (
          <Typography>{HighlightText(filter, convertUTCtoLocalDate(item.disabledDate))}</Typography>
        )}
      </td>
      <td>
        <Button type='link' style={{border: '1px solid #1677ff'}} onClick={() => navigate(`${item._id}`)}>Peržiūrėti</Button>
      </td>
      {
        isAdmin ?
          <td>
            <Button type='link' style={{border: '1px solid red', color: 'red'}} onClick={() => deleteItem && deleteItem(item._id)}>{deleteButtonText}</Button>
          </td> : null
      }
    </tr>
  )
}

export default UersTableRows