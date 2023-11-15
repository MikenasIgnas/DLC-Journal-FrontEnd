/* eslint-disable max-len */
import React                          from 'react'
import { get, getCurrentDate, post }  from '../../Plugins/helpers'
import type { ColumnsType }           from 'antd/es/table'
import { Button, Space }              from 'antd'
import { Link, useSearchParams }      from 'react-router-dom'
import { useCookies }                 from 'react-cookie'
import { useAppSelector }             from '../../store/hooks'
import { UserType }                   from '../../types/globalTypes'
import FullTable                      from '../../components/Table/TableComponents/FullTable'
import UersTableRows                  from '../../components/DLCJournalComponents/UserManagementComponents/UersTableRows'
import RowMenu                        from '../../components/Table/TableComponents/RowMenu'

const TableColumns = () => {
  return(
    <>
      <th style={{ width: 220, padding: '12px 6px' }}>Prisijungimas</th>
      <th style={{ width: 220, padding: '12px 6px' }}>El. Paštas</th>
      <th style={{ width: 150, padding: '12px 6px' }}>Darbuotojas</th>
      <th style={{ width: 120, padding: '12px 6px' }}>Rolė</th>
      <th style={{ width: 100, padding: '12px 6px' }}>Statusas</th>
      <th style={{ width: 100, padding: '12px 6px' }}>Sukurta</th>
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
  const [users, setUsers] =                 React.useState<UserType[] | undefined>()
  const [cookies] =                         useCookies(['access_token'])
  const [searchParams, setSearchParams] =   useSearchParams()
  const page =                              searchParams.get('page')
  const limit =                             searchParams.get('limit')
  const filter =                            searchParams.get('filter')

  React.useEffect(() => {
    (async () => {
      try{
        const allUsers = await get(`allUsers?page=${page}&limit=${limit}&filter=${filter}`, cookies.access_token)
        setUsers(allUsers)
      }catch(err){
        console.log(err)
      }
    })()
  },[page, limit, filter, cookies.access_token])

  const userRemoved = (id: number) => {
    if(users){
      let appUsers = [...users]
      appUsers = appUsers.filter(x => x.id !== id)
      setUsers(appUsers)
    }
  }
  const deleteUser = async(id: number) => {
    const deletionDate = getCurrentDate()
    if(userRemoved){
      await get(`deleteUser/${id}`, cookies.access_token)
      await post(`changeUsersStatus/${id}`, {status: 'inactive'}, cookies.access_token)
      await post(`addDeletionDate/${id}`, {dateDeleted: deletionDate}, cookies.access_token)
      userRemoved(id)
    }
  }

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
            rowMenu={<RowMenu />} />
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

