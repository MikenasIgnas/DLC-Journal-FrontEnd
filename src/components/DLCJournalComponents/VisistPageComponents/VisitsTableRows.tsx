/* eslint-disable max-len */
import React                        from 'react'
import Box                          from '@mui/joy/Box'
import { Tag, Typography }          from 'antd'
import { useSearchParams }          from 'react-router-dom'
import HighlightText                from '../../UniversalComponents/HighlightText'
import { VisitorsType }             from '../../../types/globalTypes'
import { calculateTimeDifference }  from '../../../Plugins/helpers'

type VisitsTableRowsProps = {
    visitId:        number;
    visitStatus:    string | undefined;
    visitingClient: string;
    visitAddress:   string;
    dlcEmployees:   string;
    rowMenu?:       React.ReactNode
    visitors:       VisitorsType[];
    visitStartDate: string;
    visitStartTime: string;
    visitEndDate:   string;
    visitEndTime:   string;
    visitPurpose:   string[];
}

const VisitsTableRows = ({
  visitId,
  visitStatus,
  visitAddress,
  visitingClient,
  dlcEmployees,
  rowMenu,
  visitors,
  visitStartDate,
  visitStartTime,
  visitEndDate,
  visitEndTime,
  visitPurpose,
}: VisitsTableRowsProps) => {
  const [searchParams]  = useSearchParams()
  const filter          = searchParams.get('filter')
  const timeDifference  = calculateTimeDifference(visitStartDate, visitStartTime, visitEndDate,visitEndTime)
  return (
    <tr key={visitId}>
      <td style={{padding: '12px' }}>
        <Typography> {HighlightText(filter, String(visitId))}</Typography>
      </td>
      <td>
        <Tag color={visitStatus}>{visitStatus === 'processing' && 'paruoštas' || visitStatus === 'success' && 'pradėtas' || visitStatus === 'error' && 'baigtas'}</Tag>
      </td>
      <td>
        <Typography> {HighlightText(filter, visitingClient)}</Typography>
      </td>
      <td>
        {visitors?.map((el) =>
          <Typography key={el.selectedVisitor.employeeId}>{HighlightText(filter, `${el.selectedVisitor?.name} ${el.selectedVisitor?.lastName}`)}</Typography>
        )}
      </td>
      <td>
        {visitPurpose?.map((el, i) => <Typography key={i}>{HighlightText(filter, el)}</Typography>)}
      </td>
      <td>
        <Typography>{ HighlightText(filter,visitAddress) }</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, String(visitStartDate ? visitStartDate : '' ))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, String(visitStartTime ? visitStartTime : ''))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, String(visitEndDate ? visitEndDate : ''))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, String(visitEndTime ? visitEndTime : ''))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, String(timeDifference ? timeDifference : ''))}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, dlcEmployees)}</Typography>
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