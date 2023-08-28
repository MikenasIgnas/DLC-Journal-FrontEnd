/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                                                          from 'react'
import { Button, Col, ConfigProvider, MenuProps, Row, Space, Switch } from 'antd'
import { Layout, Menu }                                               from 'antd'
import { Link, useNavigate, useSearchParams }                         from 'react-router-dom'
import { clearFilleChecklistdData, get, post }                        from '../../../Plugins/helpers'
import { useCookies }                                                 from 'react-cookie'
import jwt_decode                                                     from 'jwt-decode'
import { TokenType }                                                  from '../../../types/globalTypes'
import { useAppDispatch, useAppSelector }                             from '../../../store/hooks'
import { setUsername, setUsersRole }                                  from '../../../auth/AuthReducer/reducer'
import { setDefaultTheme }                                            from '../../../auth/ThemeReducer/ThemeReducer'
import MobileHeader                                                   from '../MobileHeader/MobileHeader'
import { HistoryOutlined, HomeOutlined, LeftOutlined, RightOutlined, SettingOutlined, TeamOutlined, UnorderedListOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label:      React.ReactNode,
  key:        React.Key,
  icon?:      React.ReactNode,
  children?:  MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

type PageLayoutProps = {
  children:   React.ReactNode,
}

const PageLayout = ({children}:PageLayoutProps) => {
  const navigate =                          useNavigate()
  const dispatch =                          useAppDispatch()
  const [cookies, , removeCookie] =         useCookies(['access_token'])
  const [collapsed, setCollapsed] =         React.useState(true)
  const [username, setusersName] =          React.useState('')
  const defaultTheme =                      useAppSelector((state)=> state.theme.value)
  const userName =                          useAppSelector((state)=> state.auth.username)
  const token =                             cookies.access_token
  const decodedToken:TokenType =            jwt_decode(token)
  const isAdmin =                           decodedToken.userRole === 'admin' || decodedToken.userRole === 'SYSADMIN'
  const [searchParams] =                    useSearchParams()
  const tabUrlParam =                       searchParams.get('menu') as string
  const [isDesktop, setDesktop] =           React.useState(window.innerWidth > 650)
  const [isHomePage, setIsHomePage] =       React.useState(true)
  React.useEffect(() => {
    (async () => {
      try{
        const user = await get(`FindUser/${decodedToken.secret}`, cookies.access_token)
        if(!user.error){
          setusersName(user.data.username)
          dispatch(setUsername(user.data.username))
          dispatch(setUsersRole(user.data.userRole))
          dispatch(setDefaultTheme(user.data.defaultTheme))
        }
      }catch(err){
        console.log(err)
      }
    })()
  }, [userName])

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650)
  }

  React.useEffect(() => {
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })
  const startChecklist = async() => {
    const totalHistoryData = await get('getTotalAreasCount', cookies.access_token)
    clearFilleChecklistdData(totalHistoryData)
    setIsHomePage(false)
  }

  const Logout = async() => {
    const totalHistoryData = await get('getTotalAreasCount', cookies.access_token)
    removeCookie('access_token')
    clearFilleChecklistdData(totalHistoryData)
    navigate('/')
  }

  const changeTheme = async(value: boolean) => {
    const defaultTheme = {
      defaultPageTheme: value,
    }
    const res = await post(`updateUsersTheme/${decodedToken.secret}`, defaultTheme, cookies.access_token)
    if(!res.error){
      dispatch(setDefaultTheme(!res.data.value.defaultTheme))
    }
  }
  const navigateHome = () => {
    navigate('/')
    setIsHomePage(true)
  }
  const menuItems =  React.useMemo(() => [
    getItem(<Link to={'/checklistStartPage?menu=1'} onClick={startChecklist} >DLC Checklist</Link>, '1'),
    getItem(<Link to={'/DLCJournalStartPage?menu=12'} >DLC Žurnalas</Link>, '12'),
  ],[username])

  const checklistMenuItems =  React.useMemo(() => [
    getItem(<HomeOutlined style={{fontSize: '25px'}} onClick={navigateHome} />, '3'),
    getItem(<Link to={'/checklistStartPage?menu=1'} onClick={startChecklist} > Start Checklist </Link>, '1'),
    getItem(<Link to={'/checklistHistoryData?page=1&limit=10&menu=2'}> Checklist History </Link>, '2'),
  ],[username])

  const menuItems2 = React.useMemo(() => [
    isAdmin ? getItem('Manage Users', '3', <TeamOutlined />, [
      getItem(<Link to={'/ManageUsers?menu=4'}>All Users</Link>, '4', <UserOutlined />),
      getItem(<Link to={'/CreateUser?menu=7'}>Create User</Link>, '7', <UserAddOutlined />),
      getItem(<Link to={'/UsersArchive?menu=8'}>Users Archive</Link>, '8', <UserAddOutlined />),
    ]) : null,
    getItem(<Link to={'/EditUsersProfile?menu=5'}> {`Darbuotojas: ${userName}`}</Link>, '5'),
    getItem(<Button onClick={Logout}>Log Out</Button>, '6'),
  ], [username, isAdmin])

  const subMenuItems: MenuItem[] = React.useMemo(() => [
    getItem(<Link onClick={startChecklist} to={'/?menu=1'}>Checklist</Link>, '1',<UnorderedListOutlined />),
    getItem(<Link to={'/checklistHistoryData?page=1&limit=10&menu=2'} >Checklist History</Link>, '2', <HistoryOutlined/>),
    isAdmin ? getItem(<div>Manage Users</div>, '3', <TeamOutlined/>, [
      getItem(<Link to={'/ManageUsers?menu=4'}>All Users</Link>,'4',<UserOutlined/>),
      getItem(<Link to={'/CreateUser?menu=7'}>Create User</Link>,'7',<UserAddOutlined/>),
      getItem(<Link to={'/UsersArchive?menu=8'}>Users Archive</Link>,'8',<UserAddOutlined/>),
    ]) : null,
    getItem(<Link to={'/EditUsersProfile?menu=5'}>Account Settings</Link>, '5',<SettingOutlined/>),
    getItem(<Switch onChange={changeTheme} checked={defaultTheme ? true : false } checkedChildren='Dark' unCheckedChildren='Light'/>,'99'),
  ],[username, defaultTheme])

  return (
    <Space direction='vertical' className='PageLayoutSpace' size={[0, 48]}>
      <Layout hasSider>
        {
          isDesktop ?
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{backgroundColor: defaultTheme ? '#191919': 'white'}}
              trigger={
                <div style={{backgroundColor: defaultTheme ? '#191919': 'white'}}>
                  {collapsed
                    ? <RightOutlined style={{color: defaultTheme ? 'white': '#191919'}} />
                    : <LeftOutlined style={{color: defaultTheme ? 'white': '#191919'}} />}
                </div>
              }>
              <div className={collapsed ? 'LogoImage2' : 'LogoImage'} />
              <ConfigProvider theme={{
                token: {
                  controlItemBgActive: 'none',
                  colorText:           defaultTheme ? 'white' : 'black',
                  colorBgElevated:     defaultTheme ? '#001529' : '',
                },
              }}>

                <Menu
                  selectedKeys={[tabUrlParam]}
                  className='PageLayoutSliderMenu'
                  mode='inline'
                  items={subMenuItems}
                  style={{backgroundColor: defaultTheme ? '#191919': 'white', color: defaultTheme ? 'white': '#191919' }}
                />
              </ConfigProvider>
            </Sider> :
            null
        }
        <Layout className='Layout'>
          <ConfigProvider theme={{
            token: {
              colorBgContainer: defaultTheme ? '#191919' : 'white',
              colorText:        defaultTheme ? 'white' : 'black',
            },
          }}>
            { isDesktop
              ?
              <Header className='PageLayoutHeaedrMenu'>
                <Row justify={'space-between'}>
                  <Col span={12}>
                    <Menu
                      selectedKeys={[tabUrlParam]}
                      mode='horizontal'
                      items={isHomePage ? menuItems : checklistMenuItems}
                    />
                  </Col>
                  <Col span={12}>
                    <ConfigProvider theme={{
                      token: {
                        controlItemBgActive: 'none',
                        colorText:           defaultTheme ? 'white' : 'black',
                        colorBgElevated:     defaultTheme ? '#001529' : '',
                      },
                    }}>
                      <Menu
                        selectedKeys={[tabUrlParam]}
                        className='MenuItem'
                        mode='horizontal'
                        items={menuItems2}
                      />
                    </ConfigProvider>
                  </Col>
                </Row>
              </Header>
              : <MobileHeader Logout={Logout} menuItems2={subMenuItems} headerClass={'PageLayoutHeaedrMenu'} menuItems={isHomePage ? menuItems : checklistMenuItems}/>
            }
          </ConfigProvider>
          <Content className={defaultTheme ? 'PageLayoutContentDark' : 'PageLayoutContentLight'}>
            {children}
          </Content>
          <Footer className={defaultTheme ? 'PageLayoutFooterDark': 'PageLayoutFooteLight'}>
           Premises Checklist ©2023 Created by Data Logistics Center
          </Footer>
        </Layout>
      </Layout>
    </Space>
  )
}
export default PageLayout




