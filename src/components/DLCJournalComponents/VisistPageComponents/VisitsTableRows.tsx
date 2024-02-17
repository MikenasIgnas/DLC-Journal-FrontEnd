/* eslint-disable max-len */
import React                  from 'react'
import Box                    from '@mui/joy/Box'
import HighlightText          from '../../UniversalComponents/HighlightText'

import {
  Button,
  Tag,
  Typography,
}                             from 'antd'

import {
  useNavigate,
  useSearchParams,
}                             from 'react-router-dom'

import {
  CompaniesType,
  EmployeesType,
  Sites,
  UserType,
  VisitPurpose,
  VisitStatus,
  Visitors,
  VisitsType,
}                             from '../../../types/globalTypes'

import {
  calculateTimeDifference,
  convertUTCtoLocalDate,
  convertUTCtoLocalTime,
  get,
}                             from '../../../Plugins/helpers'

import { useCookies }         from 'react-cookie'
import statusMap              from './visitStatusMap'

type VisitsTableRowsProps = {
    rowMenu?: React.ReactNode
    visit:    VisitsType
}

const VisitsTableRows = ({ rowMenu, visit }: VisitsTableRowsProps) => {
  const [searchParams]                    = useSearchParams()
  const filter                            = searchParams.get('search')
  const timeDifference                    = calculateTimeDifference(visit.startDate, visit.endDate)
  const navigate                          = useNavigate()
  const [cookies]                         = useCookies(['access_token'])
  const [visitors, setVisitors]           = React.useState<EmployeesType[]>([])
  const [companies, setCompanies]         = React.useState<CompaniesType>()
  const [visitPurposes, setVisitPurposes] = React.useState<VisitPurpose[]>([])
  const [site, setSite]                   = React.useState<Sites>()
  const [visitStatus, setVisitStatus]     = React.useState<VisitStatus | undefined>()
  const [dlcEmployee, setDlcEmployee]     = React.useState<UserType | undefined>()

  React.useEffect(() => {
    const setFetchedData = async () => {
      const visitorsRes: Visitors[]             = await get(`visit/visitor?visitId=${visit._id}&page=1&limit=10`, cookies.access_token)
      const visitorsEmployeeIds                 = visitorsRes.map((el) => el.employeeId)
      const companyEmployeesRes:EmployeesType[] = await get('company/CompanyEmployee', cookies.access_token)
      const visitsVisitors                      = companyEmployeesRes.filter((el) => visitorsEmployeeIds.includes(el._id))
      const companiesRes: CompaniesType         = await get(`company/company?id=${visit.companyId}`, cookies.access_token)
      const visitPuposeRes: VisitPurpose[]      = await get('company/permission', cookies.access_token)
      const purposes                            = visitPuposeRes.filter((el) => visit.visitPurpose.includes(el._id))
      const visitStatusRes                      = await get(`visit/visitStatus?id=${visit.statusId}`, cookies.access_token)
      const siteRes                             = await get(`site/site?id=${visit.siteId}`, cookies.access_token)
      setVisitStatus(visitStatusRes)
      setSite(siteRes)
      setVisitPurposes(purposes)
      setCompanies(companiesRes)
      setVisitors(visitsVisitors)

      if(visit?.dlcEmlpyee){
        const dlcEmployeeRes                      = await get(`user?id=${visit?.dlcEmlpyee}`, cookies.access_token)
        setDlcEmployee(dlcEmployeeRes)
      }
    }
    setFetchedData()
  }, [])

  const visitDate       = convertUTCtoLocalDate(visit.startDate)
  const visitEndDate    = convertUTCtoLocalDate(visit.endDate)
  const visitStartTime  = convertUTCtoLocalTime(visit.startDate)
  const visitEndTime    = convertUTCtoLocalTime(visit.endDate)
  const status          = visitStatus && statusMap[visitStatus.name]

  return (
    <tr key={visit.id}>
      <td style={{padding: '12px' }}>
        <Typography> {HighlightText(filter, String(visit.id))}</Typography>
      </td>
      <td>
        <Tag color={status}>{visitStatus?.name}</Tag>
      </td>
      <td>
        <Typography> {HighlightText(filter, companies?.name)}</Typography>
      </td>
      <td>
        {visitors?.map((el) =>
          <Typography key={el._id}>{HighlightText(filter, `${el?.name} ${el?.lastname}`)}</Typography>
        )}
      </td>
      <td>
        {visitPurposes?.map((el, i) => <Tag key={i}>{HighlightText(filter, el.name)}</Tag>)}
      </td>
      <td>
        <Typography>{ HighlightText(filter, site?.name) }</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, visitDate)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, visitStartTime)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, visitEndDate)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, visitEndTime)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, timeDifference)}</Typography>
      </td>
      <td>
        <Typography>{HighlightText(filter, dlcEmployee?.name)}</Typography>
      </td>
      <td>
        <Button
          type='link'
          style={{border: '1px solid #1677ff'}}
          onClick={() => navigate(`${visit._id}?siteId=${visit.siteId}&companyId=${visit.companyId}&id=${visit._id}`)}>
          Peržiūrėti
        </Button>
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