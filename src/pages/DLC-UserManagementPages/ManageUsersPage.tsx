/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                            from 'react'
import { get, deleteTableItem }         from '../../Plugins/helpers'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCookies }                   from 'react-cookie'
import { UserType }                     from '../../types/globalTypes'
import FullTable                        from '../../components/Table/TableComponents/FullTable'
import UersTableRows                    from '../../components/DLCJournalComponents/UserManagementComponents/UersTableRows'
import RowMenu                          from '../../components/Table/TableComponents/RowMenu'

const tableColumnNames = [
  {itemName: 'Id', itemWidth: 220, itemValue: 'id'},
  {itemName: 'Prisijungimas', itemWidth: 220, itemValue: 'email'},
  {itemName: 'El. Paštas', itemWidth: 220, itemValue: 'email'},
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
      <th style={{ width: 100, padding: '12px 6px' }}>Veiksmai</th>
    </>
  )
}

const tableFilter = [
  {
    filterName:    'Rolė',
    filterOptions: [{ value: 'user', label: 'user' }, { value: 'admin', label: 'admin' }, { value: 'SYSADMIN', label: 'SYSADMIN' }],
  },
]

const ManageUsersPage = () => {
  const [users, setUsers] =               React.useState<UserType[] | undefined>()
  const [cookies] =                       useCookies(['access_token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const page =                            searchParams.get('page')
  const limit =                           searchParams.get('limit')
  const filter =                          searchParams.get('filter')
  const selectFilter =                    searchParams.get('selectFilter')
  const navigate =                        useNavigate()

  React.useEffect(() => {
    (async () => {
      try{
        const allUsers = await get(`allUsers?page=${page}&limit=${limit}&filter=${filter}&selectFilter=${selectFilter}`, cookies.access_token)
        setUsers(allUsers)
        console.log(allUsers)
      }catch(err){
        console.log(err)
      }
    })()
  },[page, limit, filter, cookies.access_token, selectFilter])

  return (
    <>
      <FullTable
        tableRows={users?.map((el) => (
          <UersTableRows
            key={el?.key}
            id={el?.key}
            dateCreated={el?.dateCreated}
            email={el.email}
            status={el?.status}
            userRole={el?.userRole}
            username={el?.username}
            rowMenu={<RowMenu
              deleteItem={() => deleteTableItem(el.id, setUsers, users, cookies.access_token, 'deleteUser', 'changeUsersStatus', 'addDeletionDate')}
              navigate={() => navigate(`${el.id}`)}
            />}
          />
        ))}
        tableFilter={tableFilter}
        setTableData={setUsers}
        currentPage={page}
        setSearchParams={setSearchParams}
        tableData={users}
        tableColumns={<TableColumns />}
        request={'allUsers'}
        getDocumentCount={'allUsersCount'} />
    </>
  )
}

export default ManageUsersPage

