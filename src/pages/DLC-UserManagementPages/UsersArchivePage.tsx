/* eslint-disable max-len */
import FullTable           from '../../components/Table/TableComponents/FullTable'
import { useSearchParams } from 'react-router-dom'
import UersTableRows       from '../../components/DLCJournalComponents/UserManagementComponents/UersTableRows'
import { deleteItem }      from '../../Plugins/helpers'
import { useCookies }      from 'react-cookie'
import useSetAllUsersData  from '../../Plugins/useSetAllUsersData'
import { useAppSelector }  from '../../store/hooks'

const UsersArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page                            = searchParams.get('page')
  const [cookies]                       = useCookies(['access_token'])
  const { users, setUsers, count }      = useSetAllUsersData()
  const isAdmin                         = useAppSelector((state) => state.auth.isAdmin)
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
        <th className='TableColumnWidth100px'>Peržiūrėti</th>
        {isAdmin ? <th className='TableColumnWidth100px'>Veiksmai</th> : null}
      </>
    )
  }

  const tableSorter = [
    {
      filterName:    'Statusas',
      filterOptions: [
        { value: '1', label: 'Aktyvus', filterParam: 'isDisabled', filterValue: false },
        { value: '2', label: 'Neaktyvus', filterParam: 'isDisabled', filterValue: true },
      ],
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
      await deleteItem('user', {id: id}, cookies.access_token)
      tableItemRemoved(id)
    }

  }

  return (
    <FullTable
      tableColumns={<TableColumns/>}
      currentPage={page}
      setSearchParams={setSearchParams}
      tableRows={users?.map((item, index) => (
        <UersTableRows
          id={index + 1}
          key={item._id}
          item={item}
          deleteItem={deleteUser}
          deleteButtonText={'Ištrinti'}
        />
      ))}
      documentCount={count}
      tableSorter={tableSorter}
    />
  )
}

export default UsersArchivePage