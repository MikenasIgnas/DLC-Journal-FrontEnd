/* eslint-disable max-len */
import React                            from 'react'
import FullTable                        from '../../components/Table/TableComponents/FullTable'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RowMenu                          from '../../components/Table/TableComponents/RowMenu'
import UersTableRows                    from '../../components/DLCJournalComponents/UserManagementComponents/UersTableRows'
import archivedUsersRowMenuItems        from '../../components/DLCJournalComponents/UserManagementComponents/archivedUsersRowMenuItems'
import { useAppSelector }               from '../../store/hooks'
import { deleteItem }                   from '../../Plugins/helpers'
import { useCookies }                   from 'react-cookie'
import useSetAllUsersData               from '../../Plugins/useSetAllUsersData'

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
  const isAdmin                         = useAppSelector((state) => state.auth.isAdmin)
  const rowMenuItems                    = archivedUsersRowMenuItems(isAdmin)
  const [cookies]                       = useCookies(['access_token'])
  const { users, setUsers, count }      = useSetAllUsersData()
  const tableSorter = [
    {
      filterName:    'Statusas',
      filterOptions: [{ value: 'false', label: 'Aktyvus' }, { value: 'true', label: 'Neaktyvus' }],
    },
  ]
  const deleteUser = async(id:string) => {
    const tableItemRemoved = (id:string) => {
      if(users){
        let newTableItems = [...users]
        newTableItems = newTableItems.filter(x => x._id !== id)
        setUsers(newTableItems)
      }
    }

    if(tableItemRemoved){
      await deleteItem(`user?id=${id}`, cookies.access_token)
      tableItemRemoved(id)
    }

  }

  return (
    <FullTable
      filterParam={'isDisabled'}
      tableColumns={<TableColumns/>}
      currentPage={page}
      setSearchParams={setSearchParams}
      tableRows={users?.map((el, index) => (
        <UersTableRows
          key={el._id}
          id={index + 1}
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
            deleteItem={() => deleteUser(el._id)}
          />}
        />
      ))}
      documentCount={count}
      tableSorter={tableSorter}
    />
  )
}

export default UsersArchivePage