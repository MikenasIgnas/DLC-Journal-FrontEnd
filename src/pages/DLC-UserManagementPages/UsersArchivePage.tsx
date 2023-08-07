/* eslint-disable max-len */
import React            from 'react'
import UsersTable       from '../../components/UsersTable/UsersTable'
import { get }          from '../../Plugins/helpers'
import { useCookies }   from 'react-cookie'
import { ColumnsType }  from 'antd/es/table'
import { UserType }     from '../../types/globalTypes'


const UsersArchivePage = () => {
  const [users, setUsers] =     React.useState<UserType[]>([])
  const [loading, setLoading] = React.useState(false)
  const [cookies] =             useCookies(['access_token'])

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const allArchivedUsers = await get('getArchivedUsers', cookies.access_token)
        if(!allArchivedUsers.error){
          setUsers(allArchivedUsers.data)
        }
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    })()
  },[])


  const deletenDateColumn: ColumnsType<UserType> = [
    {
      title:     'Deteled',
      dataIndex: 'dateDeleted',
      render:    (text, user) => <div>{user.dateDeleted}</div>,
      sorter:    (a, b) => a.dateDeleted.length - b.dateDeleted?.length,
    },
  ]

  return (
    <UsersTable loading={loading} users={users} deletenDateColumn={deletenDateColumn} tableName={'Darbuotojų Archyvas'}/>
  )

}

export default UsersArchivePage