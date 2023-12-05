/* eslint-disable max-len */
import React                            from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { deleteTableItem }         from '../../Plugins/helpers'
import { useCookies }                   from 'react-cookie'
import FullTable                        from '../../components/Table/TableComponents/FullTable'
import VisitsTableRows                  from '../../components/DLCJournalComponents/VisistPageComponents/VisitsTableRows'
import RowMenu                          from '../../components/Table/TableComponents/RowMenu'
import useSetVisitsData                 from '../../Plugins/useSetVisitData'

const TableColumns = () => {
  return(
    <>
      <th style={{ width: 100, padding: '12px 6px' }}>Statusas</th>
      <th style={{ width: 100, padding: '12px 6px' }}>Klientas</th>
      <th style={{ width: 200, padding: '12px 6px' }}>Kliento Darbuotojas</th>
      <th style={{ width: 130, padding: '12px 6px' }}>Vizito Tikslas</th>
      <th style={{ width: 70, padding: '12px 6px' }}>Adresas</th>
      <th style={{ width: 100, padding: '12px 6px' }}>Pradžios Data</th>
      <th style={{ width: 70, padding: '12px 6px' }}>Pradžios Laikas</th>
      <th style={{ width: 100, padding: '12px 6px' }}>Pabaigos Data</th>
      <th style={{ width: 70, padding: '12px 6px' }}>Pabaigos Laikas</th>
      <th style={{ width: 150, padding: '12px 6px' }}>Lydintysis</th>
      <th style={{ width: 70, padding: '12px 6px' }}>Veiksmai</th>
    </>
  )
}

const tableSorter = [
  {
    filterName:    'statusas',
    filterOptions: [
      { value: 'success', label: 'Pradėtas' },
      { value: 'processing', label: 'Paruoštas'},
      { value: 'error', label: 'Baigtas'},
    ],
  },
  {
    filterName:    'adresas',
    filterOptions: [{ value: 'J13', label: 'J13' },{ value: 'T72', label: 'T72' }],
  },
]

const VisitPage = () => {
  const [cookies] =                           useCookies(['access_token'])
  const [searchParams, setSearchParams] =     useSearchParams()
  const page =                                searchParams.get('page')
  const navigate =                            useNavigate()
  const {data, count, setData} =     useSetVisitsData()
  return (
    <FullTable
      tableSorter={tableSorter}
      currentPage={page}
      setSearchParams={setSearchParams}
      documentCount={count}
      tableColumns={<TableColumns />}
      tableRows={data?.map((el) => (
        <VisitsTableRows
          key={el.id}
          visitId={el.id}
          visitStatus={el.visitStatus}
          visitingClient={el.visitingClient}
          visitAddress={el.visitAddress}
          dlcEmployees={el.dlcEmployees}
          visitors={el.visitors}
          visitPurpose={el.visitPurpose}
          visitStartDate={el.startDate}
          visitStartTime={el.startTime}
          visitEndDate={el.endDate}
          visitEndTime={el.endTime}
          rowMenu={<RowMenu
            navigate={() => navigate(`${el.id}`)}
            deleteItem={() => deleteTableItem(el.id, setData, data, cookies.access_token, 'deleteVisit')} />} />
      ))} />
  )
}

export default VisitPage

