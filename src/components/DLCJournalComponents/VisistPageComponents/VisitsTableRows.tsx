/* eslint-disable max-len */
import React                            from 'react'
import Box                              from '@mui/joy/Box'
import { Button, Tag, Typography }      from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import HighlightText                    from '../../UniversalComponents/HighlightText'
import { VisitsType }                   from '../../../types/globalTypes'
import { calculateTimeDifference }      from '../../../Plugins/helpers'

type VisitsTableRowsProps = {
    rowMenu?:       React.ReactNode
    visit: VisitsType
}

const VisitsTableRows = ({
  rowMenu,
  visit,
}: VisitsTableRowsProps) => {
  const [searchParams]  = useSearchParams()
  const filter          = searchParams.get('search')
  const timeDifference  = calculateTimeDifference(visit.startDate, visit.startTime, visit.endDate, visit.endTime)
  const navigate = useNavigate()
  return (
    <tr key={visit.id}>
      <td style={{padding: '12px' }}>
        <Typography> {HighlightText(filter, String(visit.id))}</Typography>
      </td>
      <td>
        <Tag color={visit.visitStatus}>{visit.visitStatus === 'processing' && 'paruoštas' || visit.visitStatus === 'success' && 'pradėtas' || visit.visitStatus === 'error' && 'baigtas'}</Tag>
      </td>
      <td>
        <Typography> {HighlightText(filter, visit.visitingClient)}</Typography>
      </td>
      <td>
        {visit.visitors?.map((el) =>
          <Typography key={el.selectedVisitor.employeeId}>{HighlightText(filter, `${el.selectedVisitor?.name} ${el.selectedVisitor?.lastname}`)}</Typography>
        )}
      </td>
      <td>
        {visit.visitPurpose?.map((el, i) => <Typography key={i}>{HighlightText(filter, el)}</Typography>)}
      </td>
      <td>
        <Typography>{ HighlightText(filter, visit.visitAddress) }</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, String(visit.startDate ? visit.startDate : '' ))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, String(visit.startTime ? visit.startTime : ''))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, String(visit.endDate ? visit.endDate : ''))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, String(visit.endTime ? visit.endTime : ''))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, String(timeDifference ? timeDifference : ''))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, visit.dlcEmployees)}</Typography>
      </td>
      <td>
        <Button type='link' style={{border: '1px solid #1677ff'}} onClick={() => navigate(`${visit.id}?visitAddress=${visit.visitAddress}`)}>Peržiūrėti</Button>
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