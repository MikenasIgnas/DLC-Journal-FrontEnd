/* eslint-disable max-len */
import React                                                                  from 'react'
import { Link, useSearchParams }                                              from 'react-router-dom'
import { Button, Input, InputRef, Space, Table, ConfigProvider, Pagination, Badge }  from 'antd'
import { get }                                                                from '../../Plugins/helpers'
import { VisitsType }                                                         from '../../types/globalTypes'
import { useAppSelector }                                                     from '../../store/hooks'
import { useCookies }                                                         from 'react-cookie'
import { ColumnsType }                                                        from 'antd/es/table'
import { ColumnType, FilterConfirmProps }                                     from 'antd/es/table/interface'
import { SearchOutlined }                                                     from '@ant-design/icons'
import Highlighter                                                            from 'react-highlight-words'

const ChecklistHistoryPage = () => {
  type DataIndex = keyof VisitsType;
  const [cookies] =                                   useCookies(['access_token'])
  const defaultPageTheme =                            useAppSelector((state) => state.theme.value)
  const [loading, setLoading] =                       React.useState(false)
  const [searchText, setSearchText] =                 React.useState('')
  const [searchedColumn, setSearchedColumn] =         React.useState('')
  const searchInput =                                 React.useRef<InputRef>(null)
  const [searchParams, setSearchParams] =             useSearchParams()
  const [totalVisitsEntries, setTotalVisitsEntries] = React.useState<number| undefined>(undefined)
  const page =                                        searchParams.get('page')
  const limit =                                       searchParams.get('limit')
  const [visits, setVisits] =                         React.useState<VisitsType[]>()

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const totalVisitsEntries = await get('totalVisitsEntries', cookies.access_token)
        const visitsData =  await get(`visitsData?page=${page}&limit=${limit}`, cookies.access_token)
        setVisits(visitsData.results)
        setTotalVisitsEntries(totalVisitsEntries.data)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    })()
  }, [page, limit, cookies.access_token])
  console.log(visits)
  const changePage = (page: number, pageSize: number) => {
    setSearchParams(`page=${page}&limit=${pageSize}&menu=2`)
  }
  console.log(visits)
  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<VisitsType> => ({
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

  const columns: ColumnsType<VisitsType> = [
    {
      title:     'ID',
      dataIndex: 'id',
      render:    (text, visitItem) => <div>{visitItem.id}</div>,
      sorter:    (a, b) => Number(a.id) - Number(b.id),
      ...getColumnSearchProps('id'),
    },
    {
      title:     'Statusas',
      dataIndex: 'visitStatus',
      render:    (text, visitItem) =>
        <Badge
          status={visitItem?.visitStatus}
          text={
            visitItem?.visitStatus === 'success' && 'Aktyvus' ||
            visitItem?.visitStatus === 'error' && 'Baigtas' ||
            visitItem?.visitStatus === 'processing' && 'Paruoštas'
          }/>,
      sorter: (a, b) => Number(a.visitStatus) - Number(b.visitStatus),
    },
    {
      title:     'Įmonė',
      dataIndex: 'userName',
      render:    (text, visitItem) => (
        <>
          <Link to={`/SingleVisitPage/${visitItem.id}`}>{visitItem?.visitInfo?.visitingClient}</Link>
        </>
      ),
    },
    {
      title:  'Vizito tikslas',
      render: (text, visitItem) =>
        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          {visitItem?.visitGoal?.map((el, i) => <div key={i}>{el}</div>)}
        </div>,
    },
    {
      title:     'Darbuotojas',
      dataIndex: 'endDate',
      render:    (text, visitItem) =>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>{visitItem?.visitInfo?.clientsEmployees}</div>
        </div>,
    },
    {
      title:     'Lydintysis',
      dataIndex: 'endDate',
      render:    (text, visitItem) =>
        <div>{visitItem?.visitInfo?.dlcEmployees}</div>,
    },
    {
      title:     'Visito adresas',
      dataIndex: 'problemCount',
      render:    (text, visitItem) => <div>{visitItem?.visitInfo?.visitAddress === '1' ? 'J13' : 'T72'}</div>,
    },
    {
      title:  'Veiksmai',
      render: (text, visitItem) =>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link to={`/SingleVisitPage/${visitItem.id}`}>Peržiūreti</Link>
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
        }}/>
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
          dataSource={visits}
          bordered
          loading={loading}
          pagination={false}
        />
        {totalVisitsEntries !== undefined && (
          <Pagination
            defaultCurrent={Number(page)}
            onChange={changePage}
            total={totalVisitsEntries}
            showSizeChanger
          />
        )}
      </ConfigProvider>
    </div>
  )
}

export default ChecklistHistoryPage

