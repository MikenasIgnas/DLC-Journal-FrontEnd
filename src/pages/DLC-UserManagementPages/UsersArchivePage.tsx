/* eslint-disable max-len */
import React                            from 'react'
import FullTable                        from '../../components/Table/TableComponents/FullTable'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RowMenu                          from '../../components/Table/TableComponents/RowMenu'
import useSetUsersData                  from '../../Plugins/useSetUsersData'
import UersTableRows                    from '../../components/DLCJournalComponents/UserManagementComponents/UersTableRows'
import archivedUsersRowMenuItems        from '../../components/DLCJournalComponents/UserManagementComponents/archivedUsersRowMenuItems'
import { useAppSelector } from '../../store/hooks'

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
  const isAdmin                         = useAppSelector((state) => state.auth.isAdmin)
  const rowMenuItems                    = archivedUsersRowMenuItems(isAdmin)

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
        <UersTableRows
          key={el._id}
          id={index}
          dateCreated={el.created}
          disabledDate={el.disabledDate}
          email={el.email}
          username={el.username}
          isAdmin={el.isAdmin}
          name={el.name}
          status={el.isDisabled}
          rowMenu={<RowMenu
            navigate={() => navigate(`${el._id}`)}
            items={rowMenuItems}
          />}
        />
      ))}
      documentCount={count}
      tableSorter={tableSorter}
    />
  )
}

export default UsersArchivePage