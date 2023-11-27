/* eslint-disable max-len */
import React                              from 'react'
import { get }                            from '../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'
import { UserType }                       from '../../types/globalTypes'
import FullTable                          from '../../components/Table/TableComponents/FullTable'
import { useNavigate, useSearchParams }   from 'react-router-dom'
import UserArchiveTableRows               from '../../components/DLCJournalComponents/UserArchiveComponents/UserArchiveTableRow'
import RowMenu                            from '../../components/Table/TableComponents/RowMenu'
import { useAppSelector }                 from '../../store/hooks'
import useSetUsersData from '../../Plugins/useSetUsersData'
import useSetArchivedUserData from '../../Plugins/useSetArchivedUserData'

const TableColumns = () => {
  return(
    <>
      <th style={{ width: 250, padding: '12px 6px' }}>Prisijungimas</th>
      <th style={{ width: 250, padding: '12px 6px' }}>El. Paštas</th>
      <th style={{ width: 150, padding: '12px 6px' }}>Darbuotojas</th>
      <th style={{ width: 120, padding: '12px 6px' }}>Rolė</th>
      <th style={{ width: 100, padding: '12px 6px' }}>Statusas</th>
      <th style={{ width: 100, padding: '12px 6px' }}>Sukurta</th>
      <th style={{ width: 100, padding: '12px 6px' }}>Ištrinta</th>
      <th style={{ width: 100, padding: '12px 6px' }}>Veiksmai</th>
    </>
  )
}

const UsersArchivePage = () => {
  const [documentsCount, setDocumentsCount] = React.useState<number | undefined>()
  const [searchParams, setSearchParams] =     useSearchParams()
  const page =                                searchParams.get('page')
  const navigate =                            useNavigate()
  const {data, count} =                       useSetArchivedUserData()


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