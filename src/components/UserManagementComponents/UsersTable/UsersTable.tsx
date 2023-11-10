/* eslint-disable max-len */
import { Button, ConfigProvider, Input, InputRef, Space, Table }  from 'antd'
import React                                      from 'react'
import { ColumnType, FilterConfirmProps }         from 'antd/es/table/interface'
import type { ColumnsType }                       from 'antd/es/table'
import { SearchOutlined }                         from '@ant-design/icons'
import Highlighter                                from 'react-highlight-words'
import { UserType }                               from '../../../types/globalTypes'
import { useAppSelector }                         from '../../../store/hooks'

type DataIndex = keyof UserType;

type UsersTableProps = {
  users:              UserType[];
  actionButtons?:     ColumnsType<UserType>;
  deletenDateColumn?: ColumnsType<UserType>;
  tableName:           string;
  userRemoved?:       (secret: string) => void;
  loading:            boolean
}

const UsersTable = ({users, actionButtons,deletenDateColumn, tableName, loading}:UsersTableProps) => {
  const [searchText, setSearchText] =           React.useState('')
  const [searchedColumn, setSearchedColumn] =   React.useState('')
  const searchInput =                           React.useRef<InputRef>(null)
  const defaultPageTheme =                      useAppSelector((state) => state.theme.value)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<UserType> => ({
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
            icon={<SearchOutlined rev/>}
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
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
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
  const columns: ColumnsType<UserType> = [
    {
      title:     'ID',
      dataIndex: 'key',
      render:    (text, user) => <div>{user.key}</div>,
      sorter:    (a, b) => Number(a.key) - Number(b.key),
      ...getColumnSearchProps('key'),
    },

    {
      title:     'Prisijungimas',
      dataIndex: 'email',
      render:    (text, user) => <div>{user.email}</div>,
      sorter:    (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email'),
    },

    {
      title:     'El.Paštas',
      dataIndex: 'email',
      render:    (text, user) => <div>{user.email}</div>,
      sorter:    (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email'),
    },

    {
      title:     'Darbuotojas',
      dataIndex: 'username',
      render:    (text, user) => <div>{user.username}</div>,
      sorter:    (a, b) => a.username.length - b.username.length,
      ...getColumnSearchProps('username'),
    },

    {
      title:     'Role',
      dataIndex: 'userRole',
      render:    (text, user) => <div>{user.userRole}</div>,
      sorter:    (a, b) => a.userRole.length - b.userRole.length,
      ...getColumnSearchProps('userRole'),
    },

    {
      title:     'Status',
      dataIndex: 'status',
      render:    (text, user) => <div className={user.status ==='active'? 'ActiveUser':'InactiveUser'}>{user.status}</div>,
      sorter:    (a, b) => a.status.length - b.status.length,
    },

    {
      title:     'Created',
      dataIndex: 'dateCreated',
      render:    (text, user) => <div>{user.dateCreated}</div>,
      sorter:    (a, b) => a.dateCreated.length - b.dateCreated.length,
      ...getColumnSearchProps('dateCreated'),
    },
  ]

  if (actionButtons) {
    columns.push(...actionButtons)
  }

  if(deletenDateColumn){
    columns.push(...deletenDateColumn)
  }

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
        }}>{tableName}
      </div>
      <ConfigProvider theme={{
        token: {
          colorBgContainer: defaultPageTheme? '#1e1e1e': 'white',
          colorText:        defaultPageTheme? 'white': 'black',
        },
      }}>
        <Table
          rowKey={(record) =>record.key}
          scroll={{x: '5px'}}
          columns={columns}
          style={{overflowX: 'auto', width: '99%'}}
          dataSource={users}
          loading={loading}
          bordered />
      </ConfigProvider>
    </div>

  )
}

export default UsersTable