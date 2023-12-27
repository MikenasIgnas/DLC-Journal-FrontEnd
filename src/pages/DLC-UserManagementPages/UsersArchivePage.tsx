/* eslint-disable max-len */
import React                            from 'react'
import FullTable                        from '../../components/Table/TableComponents/FullTable'
import { useNavigate, useSearchParams } from 'react-router-dom'
import UserArchiveTableRows             from '../../components/DLCJournalComponents/UserArchiveComponents/UserArchiveTableRow'
import RowMenu                          from '../../components/Table/TableComponents/RowMenu'
import useSetUsersData                  from '../../Plugins/useSetUsersData'

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
  const {users, count}                  = useSetUsersData()

  const tableSorter = [
    {
      filterName:    'Statusas',
      filterOptions: [{ value: 'active', label: 'active' }, { value: 'inactive', label: 'inactive' }],
    },
  ]

  return (
    <FullTable
      tableColumns={<TableColumns/>}
      currentPage={page}
      setSearchParams={setSearchParams}
      tableRows={users?.map((el, index) => (
        <UserArchiveTableRows
          key={el._id}
          id={index}
          dateCreated={el.created}
          dateDeleted={el.dateDeleted}
          email={el.email}
          roleId={el.roleId}
          name={el.name}
          rowMenu={<RowMenu
            navigate={() => navigate(`${el._id}`)}
          />}
          status={el.isDisabled}
        />
      ))}
      documentCount={count}
      tableSorter={tableSorter}
    />
  )
}

export default UsersArchivePage