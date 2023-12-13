/* eslint-disable max-len */
import React                            from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FullTable                        from '../../components/Table/TableComponents/FullTable'
import ChecklistHistoryTableRows        from '../../components/DLCChecklistComponents/ChecklistHistoryTableRows.tsx/ChecklistHistoryTableRows'
import RowMenu                          from '../../components/Table/TableComponents/RowMenu'
import useSetChecklistHistoryData       from '../../Plugins/useSetChecklistHistoryData'

const ChecklistHistoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page                            = searchParams.get('page')
  const navigate                        = useNavigate()
  const {data, count}                   = useSetChecklistHistoryData()

  const TableColumns = () => {
    return(
      <>
        <th className='TableColumnWidth200px'>Darbuotojas</th>
        <th className='TableColumnWidth200px'>Pradėta</th>
        <th className='TableColumnWidth150px'>Baigta</th>
        <th className='TableColumnWidth130px'>Užtrukta</th>
        <th className='TableColumnWidth100px'>Problemos</th>
        <th className='TableColumnWidth100px'>Veiksmai</th>
      </>
    )
  }

  const tableSorter = [
    {
      filterName:    'Statusas',
      filterOptions: [{ value: 'active', label: 'active' }, { value: 'inactive', label: 'inactive' }],
    },
  ]

  return (
    <FullTable
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
            navigate={() => navigate(`${el?.id}`)}
            // deleteItem={() => deleteTableItem(el?.id, setFechedData, filledData, cookies.access_token, 'deleteHistoryItem')}
          />
          }
        />
      ))}
    />
  )
}

export default ChecklistHistoryPage