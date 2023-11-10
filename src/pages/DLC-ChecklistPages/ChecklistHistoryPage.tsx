/* eslint-disable max-len */
import React                                                                  from 'react'
import { Link, useSearchParams }                                              from 'react-router-dom'
import { Button, Input, InputRef, Space, Table, ConfigProvider, Pagination }  from 'antd'
import { get }                                                                from '../../Plugins/helpers'
import { HistoryDataType, TokenType }                                         from '../../types/globalTypes'
import { useAppSelector }                                                     from '../../store/hooks'
import { useCookies }                                                         from 'react-cookie'
import { ColumnsType }                                                        from 'antd/es/table'
import { ColumnType, FilterConfirmProps }                                     from 'antd/es/table/interface'
import { SearchOutlined }                                                     from '@ant-design/icons'
import Highlighter                                                            from 'react-highlight-words'
import jwt_decode                                                             from 'jwt-decode'
import PDFGenerator                                                           from '../../components/DLCChecklistComponents/PDFRENDERER/PDFGenerator'

const ChecklistHistoryPage = () => {
  type DataIndex = keyof HistoryDataType;
  const [cookies] =                                           useCookies(['access_token'])
  const decodedToken:TokenType =                              jwt_decode(cookies.access_token)
  const defaultPageTheme =                                    useAppSelector((state) => state.theme.value)
  const [filledData, setFilledData] =                         React.useState<HistoryDataType[]>([])
  const [loading, setLoading] =                               React.useState(false)
  const [searchText, setSearchText] =                         React.useState('')
  const [searchedColumn, setSearchedColumn] =                 React.useState('')
  const searchInput =                                         React.useRef<InputRef>(null)
  const [searchParams, setSearchParams] =                     useSearchParams()
  const [totalHistoryEntriesCount, setTotalHistoryEntries] =  React.useState<number| undefined>(undefined)
  const page =                                                searchParams.get('page')
  const limit =                                               searchParams.get('limit')

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const totalHistoryEntries = await get('totalHistoryEntries', cookies.access_token)
        const hisotoryData =        await get(`checklistHistoryData?page=${page}&limit=${limit}`, cookies.access_token)

        if(!hisotoryData.error && !totalHistoryEntries.error){
          setTotalHistoryEntries(totalHistoryEntries.data)
          setFilledData(hisotoryData.results)
          window.scrollTo(0, 0)
          setLoading(false)
        }
      }catch(err){
        console.log(err)
      }
    })()
  }, [page, totalHistoryEntriesCount, limit, cookies.access_token])

  const changePage = (page: number, pageSize: number) => {
    setSearchParams(`page=${page}&limit=${pageSize}&menu=2`)
  }

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<HistoryDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div className='UserTableSearchContainer' onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          className='UserTableSearchInput'
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined rev />}
            size='small'
            className='UserTableSearchButton'
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            className='UserTableSearchButton'
          >
            Reset
          </Button>
          <Button
            type='link'
            className='UserTableSearchButton'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            className='UserTableSearchButton'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),

    filterIcon: () => (
      <SearchOutlined rev className='FlterIcon' />
    ),

    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) || false,

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          if (searchInput.current) {
            searchInput.current.select()
          }
        }, 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
          className='DataHighlighter'
        />
      ) : (
        text
      ),
  })

  const userRemoved = (id:string) => {
    let historyItems = [...filledData]
    historyItems = historyItems.filter(x => x._id !== id)
    setFilledData(historyItems)
  }

  const delteHistoryItem = async(itemId:string) => {
    if(userRemoved){
      await get(`deleteHistoryItem/${itemId}`, cookies.access_token)
      userRemoved(itemId)
    }
  }

  const columns: ColumnsType<HistoryDataType> = [
    {
      title:     'ID',
      dataIndex: 'id',
      render:    (text, historyItem) => <div>{historyItem.id}</div>,
      sorter:    (a, b) => Number(a.id) - Number(b.id),
      ...getColumnSearchProps('id'),
    },
    {
      title:     'Darbuotojas',
      dataIndex: 'userName',
      render:    (text, user) => (
        <>
          {user.userRole === 'admin' || user.userRole === 'SYSADMIN' ?<Link to={`/SingleUserPage/${user.secret}`}>{user.userName}</Link>: <div>{user.userName}</div>}
        </>
      ),
      ...getColumnSearchProps('userName'),
    },
    {
      title:     'Pradėta',
      dataIndex: 'startDate',
      render:    (text, user) =>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>{user.startDate}</div>
          <div>{user.startTime}</div>
        </div>,
      sorter: (a, b) => {
        const dateA = new Date(a.startDate)
        const dateB = new Date(b.startDate)
        return dateA.getTime() - dateB.getTime()
      },
    },
    {
      title:     'Baigta',
      dataIndex: 'endDate',
      render:    (text, user) =>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>{user.endDate}</div>
          <div>{user.endTime}</div>
        </div>,
      sorter: (a, b) => {
        const dateA = new Date(a.endDate)
        const dateB = new Date(b.endDate)
        return dateA.getTime() - dateB.getTime()
      },
    },
    {
      title:     'Užtrukta',
      dataIndex: 'endDate',
      render:    (text, user) => {
        const [startHour, startMinute] = user.startTime.split(':').map(Number)
        const [endHour, endMinute] = user.endTime.split(':').map(Number)
        const difference = (endHour * 60 + endMinute) - (startHour * 60 + startMinute)
        const differenceString = `${Math.floor(difference / 60)}:${(difference % 60).toString().padStart(2, '0')}`
        return <div>{differenceString}</div>
      },
    },
    {
      title:     'Problemos',
      dataIndex: 'problemCount',
      render:    (text, user) => <div style={{color: user.problemCount > 0 ? 'red': 'green'}}>{user.problemCount}</div>,
      sorter:    (a, b) => a.problemCount - b.problemCount,
    },
    {
      title:  'Veiksmai',
      render: (text, user) =>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link to={`/singleHistoryUnit/${user.id}?tab=1`}>Peržiūreti</Link>
          { decodedToken.userRole === 'admin' || decodedToken.userRole === 'SYSADMIN' ?
            <>
              <Button type='link' onClick={()=>delteHistoryItem(user._id)} >Ištrinti</Button>
            </> : ''
          }
        </div>,
    },
  ]

  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
      <div
        style={{
          fontSize:             '20px',
          padding:              '16px 16px',
          color:                defaultPageTheme ? 'white' : 'black',
          width:                '99%',
          textAlign:            'center',
          borderTopRightRadius: '8px',
          borderTopLeftRadius:  '8px',
        }}>Istorija</div>
      <PDFGenerator/>
      <ConfigProvider theme={{
        token: {
          colorBgContainer: defaultPageTheme? '#1e1e1e': 'white',
          colorText:        defaultPageTheme? 'white': 'black',
        },
      }}>
        <Table
          rowKey={(record) =>record.id}
          scroll={{x: '5px'}}
          style={{overflowX: 'auto', width: '99%', borderTopRightRadius: '0px'}}
          columns={columns}
          dataSource={filledData}
          bordered
          loading={loading}
          pagination={false}
        />
        {totalHistoryEntriesCount !== undefined && (
          <Pagination
            defaultCurrent={Number(page)}
            onChange={changePage}
            total={totalHistoryEntriesCount}
            showSizeChanger
          />
        )}
      </ConfigProvider>
    </div>
  )
}

export default ChecklistHistoryPage

