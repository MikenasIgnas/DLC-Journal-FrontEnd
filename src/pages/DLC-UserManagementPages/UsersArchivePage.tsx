/* eslint-disable max-len */
import React                from 'react'
import { get }              from '../../Plugins/helpers'
import { useCookies }       from 'react-cookie'
import { UserType }         from '../../types/globalTypes'
import FullTable            from '../../components/Table/TableComponents/FullTable'
import { useNavigate, useSearchParams }  from 'react-router-dom'
import UserArchiveTableRows from '../../components/DLCJournalComponents/UserArchiveComponents/UserArchiveTableRow'
import RowMenu              from '../../components/Table/TableComponents/RowMenu'

const TableColumns = () => {
  return(
    <>
      <th style={{ width: 220, padding: '12px 6px' }}>Prisijungimas</th>
      <th style={{ width: 220, padding: '12px 6px' }}>El. Paštas</th>
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
  const [users, setUsers] =                 React.useState<UserType[]>()
  const [cookies] =                         useCookies(['access_token'])
  const [searchParams, setSearchParams] =   useSearchParams()
  const page =                              searchParams.get('page')
  const limit =                             searchParams.get('limit')
  const filter =                            searchParams.get('filter')
  const navigate =                          useNavigate()
  React.useEffect(() => {
    (async () => {
      try{
        const allArchivedUsers = await get(`getArchivedUsers?page=${page}&limit=${limit}&filter=${filter}`, cookies.access_token)
        setUsers(allArchivedUsers)
      }catch(err){
        console.log(err)
      }
    })()
  },[page, limit, filter])

  const tableFilter = [
    {
      filterName:    'Statusas',
      filterOptions: [{ value: 'active', label: 'active' }, { value: 'inactive', label: 'inactive' }],
    },
  ]
  return (
    <FullTable
      tableData={users}
      tableColumns={<TableColumns />}
      currentPage={page}
      setSearchParams={setSearchParams}
      setTableData={setUsers}
      tableFilter={tableFilter}
      tableRows={users?.map((el) => (
        <UserArchiveTableRows
          key={el.id}
          id={String(el.id)}
          dateCreated={el.dateCreated}
          dateDeleted={el.dateDeleted}
          email={el.email}
          userRole={el.userRole}
          username={el.username}
          rowMenu={<RowMenu
            navigate={() => navigate(`${el.id}`)}
          />}
          status={el.status} />
      ))}
      request={'getArchivedUsers'}
      getDocumentCount={'archivedUsersCount'}
    />
  )
}

export default UsersArchivePage