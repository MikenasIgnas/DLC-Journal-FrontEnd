/* eslint-disable max-len */
import React                         from 'react'
import { get, getCurrentDate, post } from '../../Plugins/helpers'
import UsersTable                    from '../../components/UserManagementComponents/UsersTable/UsersTable'
import type { ColumnsType }          from 'antd/es/table'
import { Button, Space }             from 'antd'
import { Link }                      from 'react-router-dom'
import { useCookies }                from 'react-cookie'
import { useAppSelector }            from '../../store/hooks'
import { UserType }                  from '../../types/globalTypes'

const ManageUsersPage = () => {
  const [users, setUsers] =       React.useState<UserType[]>([])
  const [loading, setLoading] =   React.useState(false)
  const [cookies] =               useCookies(['access_token'])

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const allUsers = await get('getAllUsers', cookies.access_token)
        setUsers(allUsers.data)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  const userRemoved = (secret:string) => {
    let appUsers = [...users]
    appUsers = appUsers.filter(x => x.secret !== secret)
    setUsers(appUsers)
  }

  const deleteUser = async( secret:string) => {
    const deletionDate = getCurrentDate()
    if(userRemoved){
      await get(`deleteUser/${secret}`, cookies.access_token)
      await post(`changeUsersStatus/${secret}`, {status: 'inactive'}, cookies.access_token)
      await post(`addDeletionDate/${secret}`, {dateDeleted: deletionDate}, cookies.access_token)
      userRemoved(secret)
    }
  }

  const loggedInUserRole = useAppSelector((state)=> state.auth.usersRole)
  const actionButtons: ColumnsType<UserType> = [
    {
      title:  'Action',
      key:    '8',
      render: (_, user) => (
        <Space style={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}} key={user._id} size='middle'>
          {user.status === 'active' && loggedInUserRole === 'SYSADMIN'
            ?
            <>
              <Link to={`/SingleUserPage/${user.secret}`}>Edit</Link>
              <Button onClick={() => deleteUser(user.secret)}>Delete</Button>
            </>
            : null
          }
          {user.status === 'active' && loggedInUserRole === 'admin' && user.userRole === 'admin' || loggedInUserRole === 'admin' && user.userRole === 'user'
            ?
            <>
              <Link to={`/SingleUserPage/${user.secret}`}>Edit</Link>
              <Button onClick={()=>deleteUser(user.secret)}>Delete</Button>
            </>
            : ''
          }
          {user.status === 'active' && user.userRole === 'user' && '' }
        </Space>
      ),
    },
  ]
  return (
    <UsersTable loading={loading} userRemoved={userRemoved} users={users} actionButtons={actionButtons} tableName={'Darbuotojai'}/>
  )
}

export default ManageUsersPage

