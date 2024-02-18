/* eslint-disable max-len */
import { useSearchParams }      from 'react-router-dom'
import FullTable                from '../../components/Table/TableComponents/FullTable'
import UersTableRows            from '../../components/DLCJournalComponents/UserManagementComponents/UersTableRows'
import { getCurrentDate, post } from '../../Plugins/helpers'
import { useCookies }           from 'react-cookie'
import useSetAllUsersData       from '../../Plugins/useSetAllUsersData'
import { useAppSelector }       from '../../store/hooks'
import { message }              from 'antd'
import SuccessMessage from '../../components/UniversalComponents/SuccessMessage'


const ManageUsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cookies]                       = useCookies(['access_token'])
  const page                            = searchParams.get('page')
  const { users, setUsers, count }      = useSetAllUsersData(false)
  const isAdmin                         = useAppSelector((state) => state.auth.isAdmin)
  const [messageApi, contextHolder]     = message.useMessage()

  const tableColumnNames = [
    {itemName: 'Prisijungimas', itemWidth: 270, itemValue: 'username'},
    {itemName: 'El. Paštas', itemWidth: 270, itemValue: 'email'},
    {itemName: 'Darbuotojas', itemWidth: 150, itemValue: 'username'},
    {itemName: 'Rolė', itemWidth: 120, itemValue: 'userRole'},
    {itemName: 'Statusas', itemWidth: 100, itemValue: 'status'},
    {itemName: 'Sukurta', itemWidth: 100, itemValue: 'dateCreated'},
    {itemName: null, itemWidth: 0, itemValue: null},
    {itemName: 'Peržiūrėti', itemWidth: 100, itemValue: 'dateCreated'},
    isAdmin ? {itemName: 'Archyvuoti', itemWidth: 120, itemValue: 'dateCreated'} : null,
  ]

  const TableColumns = () => {
    return(
      <>
        {tableColumnNames.map((el, i) => (
          <th key={i} style={{ width: el?.itemWidth, padding: '12px 6px' }}>{el?.itemName}</th>
        ))}
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
  const disableUser = async(id:string) => {
    try{

      const statusItems = {
        id:           id,
        isDisabled:   true,
        disabledDate: getCurrentDate(),
      }
      await post('user/changeStatus', statusItems, cookies.access_token)

      const tableItemRemoved = (id:string) => {
        if(users){
          let newTableItems = [...users]
          newTableItems = newTableItems.filter(x => x._id !== id)
          setUsers(newTableItems)
        }
      }

      if(tableItemRemoved){
        await post('user/changeStatus', statusItems, cookies.access_token)
        tableItemRemoved(id)
      }

      messageApi.success({
        type:    'success',
        content: 'Išsaugota',
      })
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  return (
    <>
      <FullTable
        currentPage={page}
        setSearchParams={setSearchParams}
        tableColumns={<TableColumns />}
        documentCount={count}
        tableSorter={tableSorter}
        tableRows={users?.map((item, index) => (
          <UersTableRows
            key={item?._id}
            id={index + 1}
            item={item}
            deleteItem={disableUser}
            deleteButtonText={'Archyvuoti'}
          />
        ))}
      />
      <SuccessMessage contextHolder={contextHolder}/>
    </>
  )
}

export default ManageUsersPage