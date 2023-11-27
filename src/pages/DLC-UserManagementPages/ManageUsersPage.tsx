/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                              from 'react'
import { useNavigate, useSearchParams }   from 'react-router-dom'
import FullTable                          from '../../components/Table/TableComponents/FullTable'
import UersTableRows                      from '../../components/DLCJournalComponents/UserManagementComponents/UersTableRows'
import RowMenu                            from '../../components/Table/TableComponents/RowMenu'
import useSetUsersData                    from '../../Plugins/useSetUsersData'

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
      <th style={{ width: 100, padding: '12px 6px' }}>Veiksmai</th>
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
  const [searchParams, setSearchParams] =   useSearchParams()
  const page =                              searchParams.get('page')
  const navigate =                          useNavigate()
  const {data, count} =                     useSetUsersData()

  return (
    <>
      <FullTable
        tableRows={data?.map((el) => (
          <UersTableRows
            key={el?.key}
            id={el?.key}
            dateCreated={el?.dateCreated}
            email={el?.email}
            status={el?.status}
            userRole={el?.userRole}
            username={el?.username}
            rowMenu={<RowMenu
              // deleteItem={() => deleteTableItem(el?.id, setFechedData, users, cookies.access_token, 'deleteUser', 'changeUsersStatus', 'addDeletionDate')}
              navigate={() => navigate(`${el.id}`)} />} />
        ))}

        currentPage={page}
        setSearchParams={setSearchParams}
        tableColumns={<TableColumns />}
        documentCount={count}
        tableSorter={tableSorter}
      />
    </>
  )
}

export default ManageUsersPage

