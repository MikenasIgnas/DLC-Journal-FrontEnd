/* eslint-disable max-len */
import { useSearchParams }          from 'react-router-dom'
import FullTable                    from '../../components/Table/TableComponents/FullTable'
import ChecklistHistoryTableRows    from '../../components/DLCChecklistComponents/ChecklistHistoryTableRows.tsx/ChecklistHistoryTableRows'
import RowMenu                      from '../../components/Table/TableComponents/RowMenu'
import useSetChecklistHistoryData   from '../../Plugins/useSetChecklistHistoryData'
import PdfGenerator                 from '../../components/UniversalComponents/CsvGenerator/CsvGenerator'
import { deleteTableItem }          from '../../Plugins/helpers'
import { useCookies }               from 'react-cookie'
import checklistHistoryRowMenuItems from '../../components/DLCChecklistComponents/ChecklistHistoryTableRows.tsx/checklistHistoryRowMenuItems'

const ChecklistHistoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cookies]                       = useCookies(['access_token'])
  const page                            = searchParams.get('page')
  const {data, setData, count}          = useSetChecklistHistoryData()
  const rowMenuItems                    = checklistHistoryRowMenuItems()

  const TableColumns = () => {
    return(
      <>
        <th className='TableColumnWidth200px'>Darbuotojas</th>
        <th className='TableColumnWidth200px'>Pradėta</th>
        <th className='TableColumnWidth150px'>Baigta</th>
        <th className='TableColumnWidth130px'>Užtrukta</th>
        <th className='TableColumnWidth100px'>Problemos</th>
        <th className='TableColumnWidth100px'>Peržiūrėti</th>
        <th className='TableColumnWidth100px'>Veiksmai</th>
      </>
    )
  }

  const tableSorter = [
    {
      filterName:    'Problemos',
      filterOptions: [
        { value: '1', label: 'Yra Problemų', filterParam: 'selectFilter', filterValue: 'hasProblems'},
        { value: '2', label: 'Nėra Problemų', filterParam: 'selectFilter', filterValue: 'noProblems' },
      ],
    },
  ]

  return (
    <FullTable
      pdfGenerator={<PdfGenerator tooltipText ={'Generuo tik problemas turinčias formas'} url={'generateMultipleChecklistHistoryPdf'}/>}
      tableColumns={<TableColumns />}
      currentPage={page}
      setSearchParams={setSearchParams}
      documentCount={count}
      tableSorter={tableSorter}
      tableRows={data?.map((el) => (
        <ChecklistHistoryTableRows
          key={el?.id}
          id={el?.id}
          employee={el?.userName}
          problems={el?.problemCount}
          startTime={el?.startTime}
          startDate={el?.startDate}
          endTime={el?.endTime}
          endDate={el?.endDate}
          rowMenu={<RowMenu
            deleteItem={() => deleteTableItem('deleteHistoryItem', data, setData, String(el.id), cookies.access_token)}
            items={rowMenuItems} />

          }
        />
      ))}
    />
  )
}

export default ChecklistHistoryPage