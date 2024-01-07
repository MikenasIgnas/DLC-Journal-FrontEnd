/* eslint-disable max-len */
import React                            from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { deleteTableItem }              from '../../Plugins/helpers'
import { useCookies }                   from 'react-cookie'
import FullTable                        from '../../components/Table/TableComponents/FullTable'
import VisitsTableRows                  from '../../components/DLCJournalComponents/VisistPageComponents/VisitsTableRows'
import RowMenu                          from '../../components/Table/TableComponents/RowMenu'
import useSetVisitsData                 from '../../Plugins/useSetVisitData'
import useGenerateSingleVisitPDF        from '../../Plugins/useGenerateSingleVIsitPDF'
import PdfGenerator                     from '../../components/UniversalComponents/PdfGenerator/PdfGenerator'
import visitsRowMenuItems               from '../../components/DLCJournalComponents/VisistPageComponents/visitsRowMenuItems'
import { useAppSelector } from '../../store/hooks'

const TableColumns = () => {
  return(
    <>
      <th className='TableColumnWidth100px'>Statusas</th>
      <th className='TableColumnWidth100px'>Klientas</th>
      <th className='TableColumnWidth200px'>Kliento Darbuotojas</th>
      <th className='TableColumnWidth130px'>Vizito Tikslas</th>
      <th className='TableColumnWidth70px'>Adresas</th>
      <th className='TableColumnWidth100px'>Pradžios Data</th>
      <th className='TableColumnWidth70px'>Pradžios Laikas</th>
      <th className='TableColumnWidth100px'>Pabaigos Data</th>
      <th className='TableColumnWidth70px'>Pabaigos Laikas</th>
      <th className='TableColumnWidth70px'>Užtrukta</th>
      <th className='TableColumnWidth150px'>Lydintysis</th>
      <th className='TableColumnWidth70px'>Veiksmai</th>
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
  const [cookies]                         = useCookies(['access_token'])
  const [searchParams, setSearchParams]   = useSearchParams()
  const page                              = searchParams.get('page')
  const navigate                          = useNavigate()
  const {data, count, setData}            = useSetVisitsData()
  const {generateSingleVisitPDF, loading} = useGenerateSingleVisitPDF()
  const isSecurity                        = useAppSelector((state) => state.auth.isSecurity)
  const rowMenuItems                      = visitsRowMenuItems(loading, isSecurity)

  return (
    <FullTable
      pdfGenerator={<PdfGenerator url={'generateMultipleVisitPdf'} tooltipText={'Generuoja tik pabaigtus vizitus'}/>}
      filterParam={'selectFilter'}
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
            navigate={() => navigate(`${el.id}?visitAddress=${el.visitAddress}`)}
            deleteItem={() => deleteTableItem('deleteVisit', data, setData, el.id, cookies.access_token)}
            generatePDF={() => generateSingleVisitPDF(el.id)}
            items={rowMenuItems}
          />}
        />
      ))}
    />
  )
}

export default VisitPage