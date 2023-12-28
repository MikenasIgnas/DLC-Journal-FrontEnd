/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                            from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FullTable                        from '../../components/Table/TableComponents/FullTable'
import UersTableRows                    from '../../components/DLCJournalComponents/UserManagementComponents/UersTableRows'
import RowMenu                          from '../../components/Table/TableComponents/RowMenu'
import useSetUsersData                  from '../../Plugins/useSetUsersData'
import { getCurrentDate, post }         from '../../Plugins/helpers'
import { useCookies }                   from 'react-cookie'

const tableColumnNames = [
  {itemName: 'Prisijungimas', itemWidth: 270, itemValue: 'email'},
  {itemName: 'El. Paštas', itemWidth: 270, itemValue: 'email'},
  {itemName: 'Darbuotojas', itemWidth: 150, itemValue: 'username'},
  {itemName: 'Rolė', itemWidth: 120, itemValue: 'userRole'},
  {itemName: 'Statusas', itemWidth: 100, itemValue: 'status'},
  {itemName: 'Sukurta', itemWidth: 100, itemValue: 'dateCreated'},
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
    filterOptions: [{ value: 'user', label: 'user' }, { value: 'admin', label: 'admin' }, { value: 'SYSADMIN', label: 'SYSADMIN' }],
  },
]

const ManageUsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cookies]                       = useCookies(['access_token'])
  const page                            = searchParams.get('page')
  const navigate                        = useNavigate()
  const { users, setUsers, count }      = useSetUsersData(false)

  const disableUser = async(id:string) => {
    const tableItemRemoved = (id:string) => {
      if(users){
        let newTableItems = [...users]
        newTableItems = newTableItems.filter(x => x._id !== id)
        setUsers(newTableItems)
      }
    }

    const statusItems = {
      id:         id,
      isDisabled: true,
      deleted:    getCurrentDate(),
    }

    if(tableItemRemoved){
      await post('user/changeStatus', statusItems, cookies.access_token)
      tableItemRemoved(id)
    }

  }

  return (
    <FullTable
      tableRows={users?.map((el, index) => (
        <UersTableRows
          key={el?._id}
          id={index}
          dateCreated={el?.created}
          email={el?.email}
          roleId={el?.roleId}
          name={el?.name}
          status={el.isDisabled}
          rowMenu={<RowMenu
            deleteItem={() => disableUser(el._id)}
            navigate={() => navigate(`${el._id}`)} />}
        />
      ))}
      currentPage={page}
      setSearchParams={setSearchParams}
      tableColumns={<TableColumns />}
      documentCount={count}
      tableSorter={tableSorter}
    />
  )
}

export default ManageUsersPage