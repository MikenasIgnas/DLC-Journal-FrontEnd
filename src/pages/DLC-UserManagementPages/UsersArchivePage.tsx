/* eslint-disable max-len */
import React                            from 'react'
import FullTable                        from '../../components/Table/TableComponents/FullTable'
import { useNavigate, useSearchParams } from 'react-router-dom'
import UserArchiveTableRows             from '../../components/DLCJournalComponents/UserArchiveComponents/UserArchiveTableRow'
import RowMenu                          from '../../components/Table/TableComponents/RowMenu'
import useSetArchivedUserData           from '../../Plugins/useSetArchivedUserData'

const TableColumns = () => {
  return(
    <>
      <th className='TableColumnWidth250px'>Prisijungimas</th>
      <th className='TableColumnWidth250px'>El. Paštas</th>
      <th className='TableColumnWidth150px'>Darbuotojas</th>
      <th className='TableColumnWidth130px'>Rolė</th>
      <th className='TableColumnWidth100px'>Statusas</th>
      <th className='TableColumnWidth100px'>Sukurta</th>
      <th className='TableColumnWidth100px'>Ištrinta</th>
      <th className='TableColumnWidth100px'>Veiksmai</th>
    </>
  )
}

const UsersArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page                            = searchParams.get('page')
  const navigate                        = useNavigate()
  const {data, count}                   = useSetArchivedUserData()

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
      tableRows={data?.map((el) => (
        <UserArchiveTableRows
          key={el.id}
          id={String(el.id)}
          dateCreated={el.dateCreated}
          dateDeleted={el.dateDeleted}
          email={el.email}
          userRole={el.userRole}
          username={el.username}
          rowMenu={<RowMenu
            navigate={() => navigate(`${el.id}`)} />}
          status={el.status} />
      ))}
      documentCount={count}
      tableSorter={tableSorter}
    />
  )
}

export default UsersArchivePage