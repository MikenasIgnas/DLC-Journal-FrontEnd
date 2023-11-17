/* eslint-disable max-len */
import React                            from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { deleteTableItem, get }                          from '../../Plugins/helpers'
import { HistoryDataType }              from '../../types/globalTypes'
import { useCookies }                   from 'react-cookie'
import PDFGenerator                     from '../../components/DLCChecklistComponents/PDFRENDERER/PDFGenerator'
import FullTable                        from '../../components/Table/TableComponents/FullTable'
import ChecklistHistoryTableRows        from '../../components/DLCChecklistComponents/ChecklistHistoryTableRows.tsx/ChecklistHistoryTableRows'
import RowMenu                          from '../../components/Table/TableComponents/RowMenu'

const ChecklistHistoryPage = () => {
  const [cookies] =                        useCookies(['access_token'])
  const [filledData, setFilledData] =      React.useState<HistoryDataType[]>()
  const [searchParams, setSearchParams] =  useSearchParams()
  const page =                             searchParams.get('page')
  const limit =                            searchParams.get('limit')
  const navigate =                         useNavigate()

  React.useEffect(() => {
    (async () => {
      try{
        const hisotoryData = await get(`checklistHistoryData?page=${page}&limit=${limit}`, cookies.access_token)
        setFilledData(hisotoryData.results)
      }catch(err){
        console.log(err)
      }
    })()
  }, [page, limit, cookies.access_token])

  const TableColumns = () => {
    return(
      <>
        <th style={{ width: 220, padding: '12px 6px' }}>Darbuotojas</th>
        <th style={{ width: 220, padding: '12px 6px' }}>Pradėta</th>
        <th style={{ width: 150, padding: '12px 6px' }}>Baigta</th>
        <th style={{ width: 120, padding: '12px 6px' }}>Užtrukta</th>
        <th style={{ width: 100, padding: '12px 6px' }}>Problemos</th>
        <th style={{ width: 100, padding: '12px 6px' }}>Veiksmai</th>
      </>
    )
  }

  const tableFilter = [
    {
      filterName:    'Statusas',
      filterOptions: [{ value: 'active', label: 'active' }, { value: 'inactive', label: 'inactive' }],
    },
  ]
  return (
    <>
      <PDFGenerator/>
      <FullTable
        tableData={filledData}
        setTableData={setFilledData}
        tableColumns={<TableColumns />}
        currentPage={page}
        setSearchParams={setSearchParams}
        tableFilter={tableFilter}
        tableRows={filledData?.map((el) => (
          <ChecklistHistoryTableRows
            key={el.id}
            id={el.id}
            employee={el.userName}
            duration={String(el.problemCount)}
            problems={el.problemCount}
            rowMenu={<RowMenu
              navigate={() => navigate(`${el.id}`)}
              deleteItem={() => deleteTableItem(el.id, setFilledData, filledData, cookies.access_token, 'deleteHistoryItem')}
            />}
            startTime={el.startTime}
            startDate={el.startDate}
            endTime={el.endTime}
            endDate={el.endDate}
          />
        ))}
        request={'checklistHistoryData'}
        getDocumentCount={'checklistHistoryCount'}
      />
    </>
  )
}

export default ChecklistHistoryPage

