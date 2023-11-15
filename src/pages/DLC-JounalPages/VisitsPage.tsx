/* eslint-disable max-len */
import React                from 'react'
import { useSearchParams }  from 'react-router-dom'
import { get }              from '../../Plugins/helpers'
import { VisitsType }       from '../../types/globalTypes'
import { useCookies }       from 'react-cookie'
import FullTable            from '../../components/Table/TableComponents/FullTable'
import VisitsTableRows      from '../../components/DLCJournalComponents/VisistPageComponents/VisitsTableRows'
import { Divider, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy'
import IconButton           from '@mui/joy/IconButton'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'

const TableColumns = () => {
  return(
    <>
      <th style={{ width: 140, padding: '12px 6px' }}>Statusas</th>
      <th style={{ width: 140, padding: '12px 6px' }}>Klientas</th>
      <th style={{ width: 200, padding: '12px 6px' }}>Kliento Darbuotojas</th>
      <th style={{ width: 200, padding: '12px 6px' }}>Vizito Tikslas</th>
      <th style={{ width: 140, padding: '12px 6px' }}>Adresas</th>
      <th style={{ width: 140, padding: '12px 6px' }}>Lydintysis</th>
      <th style={{ width: 140, padding: '12px 6px' }}>Veiksmai</th>
    </>
  )
}

const tableFilter = [
  {
    filterName:    'statusas',
    filterOptions: [{ value: 'success', label: 'success' },{ value: 'processing', label: 'processing' }],
  },
  {
    filterName:    'adresas',
    filterOptions: [{ value: '1', label: 'J13' },{ value: '2', label: 'T72' }],
  },
]

const RowMenu = () => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size='sm' sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color='danger'>Delete</MenuItem>
      </Menu>
    </Dropdown>
  )
}
const VisitPage = () => {
  const [cookies] =                                   useCookies(['access_token'])
  const [searchParams, setSearchParams] =             useSearchParams()
  const page =                                        searchParams.get('page')
  const limit =                                       searchParams.get('limit')
  const filter =                                      searchParams.get('filter')
  const [visits, setVisits] =                         React.useState<VisitsType[]>()

  React.useEffect(() => {
    (async () => {
      try{
        const visitsData =  await get(`visitsData?page=${page}&limit=${limit}&filter=${filter}`, cookies.access_token)
        setVisits(visitsData)
      }catch(err){
        console.log(err)
      }
    })()
  }, [page, limit, cookies.access_token, filter])

  return (
    <FullTable
      tableRows={visits?.map((el) => (
        <VisitsTableRows
          key={el.id}
          visitId={el.id}
          visitStatus={el.visitStatus}
          visitingClient={el.visitInfo.visitingClient}
          visitAddress={el.visitInfo.visitAddress}
          dlcEmployees={el.visitInfo.dlcEmployees}
          clientsEmployees={el.visitInfo.clientsEmployees}
          rowMenu={<RowMenu />} />
      ))}
      tableFilter={tableFilter}
      setTableData={setVisits}
      currentPage={page}
      setSearchParams={setSearchParams}
      tableData={visits}
      tableColumns={<TableColumns />}
      request={'visitsData'}
      getDocumentCount={'visitsCount'}
    />
  )
}

export default VisitPage

