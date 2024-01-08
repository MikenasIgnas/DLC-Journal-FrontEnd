/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                                from 'react'
import { useNavigate, useSearchParams }     from 'react-router-dom'
import FullTable                            from '../../components/Table/TableComponents/FullTable'
import UersTableRows                        from '../../components/DLCJournalComponents/UserManagementComponents/UersTableRows'
import RowMenu                              from '../../components/Table/TableComponents/RowMenu'
import { getCurrentDate, post }             from '../../Plugins/helpers'
import { useCookies }                       from 'react-cookie'
import usersRowMenuItems                    from '../../components/DLCJournalComponents/UserManagementComponents/usersRowMenuItems'
import { useAppSelector }                   from '../../store/hooks'
import useSetAllUsersData                   from '../../Plugins/useSetAllUsersData'

const tableColumnNames = [
  {itemName: 'Prisijungimas', itemWidth: 270, itemValue: 'username'},
  {itemName: 'El. Paštas', itemWidth: 270, itemValue: 'email'},
  {itemName: 'Darbuotojas', itemWidth: 150, itemValue: 'username'},
  {itemName: 'Rolė', itemWidth: 120, itemValue: 'userRole'},
  {itemName: 'Statusas', itemWidth: 100, itemValue: 'status'},
  {itemName: 'Sukurta', itemWidth: 100, itemValue: 'dateCreated'},
  {itemName: '', itemWidth: 100, itemValue: ''},
]

const TableColumns = () => {
  return(
    <>
      {tableColumnNames.map((el, i) => (
        <th key={i} style={{ width: el.itemWidth, padding: '12px 6px' }}>{el.itemName}</th>
      ))}
      <th className='TableColumnWidth100px'>Veiksmai</th>
    </>
  )
}

const tableSorter = [
  {
    filterName:    'Rolė',
    filterOptions: [
      { value: '1', label: 'user', filterParam: 'isAdmin', filterValue: false},
      { value: '2', label: 'admin', filterParam: 'isAdmin', filterValue: true },
      { value: '3', label: 'apsauga', filterParam: 'isSecurity', filterValue: true },
    ],
  },
]

const ManageUsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cookies]                       = useCookies(['access_token'])
  const page                            = searchParams.get('page')
  const navigate                        = useNavigate()
  const { users, setUsers, count }      = useSetAllUsersData(false)
  const isAdmin                         = useAppSelector((state) => state.auth.isAdmin)
  const rowMenuItems                    = usersRowMenuItems(isAdmin)

  const disableUser = async(id:string) => {
    const tableItemRemoved = (id:string) => {
      if(users){
        let newTableItems = [...users]
        newTableItems = newTableItems.filter(x => x._id !== id)
        setUsers(newTableItems)
      }
    }

    const statusItems = {
      id:           id,
      isDisabled:   true,
      disabledDate: getCurrentDate(),
    }

    if(tableItemRemoved){
      await post('user/changeStatus', statusItems, cookies.access_token)
      tableItemRemoved(id)
    }
  }

  return (
    <FullTable
      currentPage={page}
      setSearchParams={setSearchParams}
      tableColumns={<TableColumns />}
      documentCount={count}
      tableSorter={tableSorter}
      tableRows={users?.map((el, index) => (
        <UersTableRows
          key={el?._id}
          id={index + 1}
          dateCreated={el?.created}
          username={el.username}
          email={el?.email}
          isAdmin={el?.isAdmin}
          isSecurity = {el.isSecurity}
          name={el?.name}
          status={el.isDisabled}
          rowMenu={<RowMenu
            items={rowMenuItems}
            deleteItem={() => disableUser(el._id)}
            navigate={() => navigate(`${el._id}`)} />}
        />
      ))}
    />
  )
}

export default ManageUsersPage