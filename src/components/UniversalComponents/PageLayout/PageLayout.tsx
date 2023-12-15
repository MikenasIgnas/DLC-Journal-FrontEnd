/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                                                              from 'react'
import {ConfigProvider, Menu, MenuProps, Space }                          from 'antd'
import { Layout }                                                         from 'antd'
import { Link, useLocation, useNavigate, useSearchParams }                from 'react-router-dom'
import { clearFilleChecklistdData, get }                                  from '../../../Plugins/helpers'
import { useCookies }                                                     from 'react-cookie'
import {jwtDecode}                                                        from 'jwt-decode'
import { TokenType }                                                      from '../../../types/globalTypes'
import { useAppDispatch, useAppSelector }                                 from '../../../store/hooks'
import { setUserEmail, setUsername, setUsersRole }                        from '../../../auth/AuthReducer/reducer'
import PageContainer                                                      from '../../Table/TableComponents/PageContainer'
import Sider                                                              from 'antd/es/layout/Sider'
import {  LogoutOutlined, ReadOutlined, ScheduleOutlined, UserOutlined }  from '@ant-design/icons'
import SideBar                                                            from './SideBar'
import { Header } from 'antd/es/layout/layout'

const { Content, Footer } = Layout

type PageLayoutProps = {
  children: React.ReactNode,
}

type MenuItem = Required<MenuProps>['items'][number];

const PageLayout = ({children}:PageLayoutProps) => {
  const navigate                  = useNavigate()
  const dispatch                  = useAppDispatch()
  const [cookies, , removeCookie] = useCookies(['access_token'])
  const userName                  = useAppSelector((state)=> state.auth.username)
  const token                     = cookies.access_token
  const decodedToken:TokenType    = jwtDecode(token)
  const location                  = useLocation()
  const decodedPath               = decodeURIComponent(location.pathname)
  const pathParts                 = decodedPath.split('/')
  const selectedPart              = pathParts.filter(Boolean).pop()
  const pageTitle                 = selectedPart?.replace('_', ' ')
  const pageTitles                = ['Įmonių Sąrašas','Vizitai', 'Istorija','Darbuotojai','Darbuotojų Archyvas']
  const [collapsed, setCollapsed] = React.useState(false)
  const [searchParams]            = useSearchParams()
  const menuKey                   = searchParams.get('menuKey')
  React.useEffect(() => {
    (async () => {
      try{
        const user = await get(`FindUser/${decodedToken.id}`, cookies.access_token)
        if(!user.error){
          dispatch(setUsername(user.data.username))
          dispatch(setUserEmail(user.data.email))
          dispatch(setUsersRole(user.data.userRole))
        }
      }catch(err){
        console.log(err)
      }
    })()
  }, [userName])

  const userLogOut = async() => {
    const totalHistoryData = await get('getTotalAreasCount', cookies.access_token)
    removeCookie('access_token')
    clearFilleChecklistdData(totalHistoryData)
    navigate('/')
  }

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem
  }

  const siderItems: MenuItem[] = [
    getItem('DLC Žurnalas', 'sub1', <ReadOutlined />, [
      getItem(<Link to={'DLC Žurnalas?menuKey=1'} >Pradžia</Link>, '1'),
      getItem(<Link to={'DLC Žurnalas/Vizito_Registracija?menuKey=2'} >Vizito registracija</Link>, '2'),
      getItem(<Link to={'DLC Žurnalas/Vizitai?menuKey=3&page=1&limit=10'} >Vizitai</Link>, '3'),
      getItem(<Link to={'DLC Žurnalas/Įmonių_Sąrašas?menuKey=4'} >Įmonių sąrašas</Link>, '4'),
      getItem(<Link to={'DLC Žurnalas/Kolokacijos?menuKey=5&tabKey=1'} >Kolokacijos</Link>, '5'),
      getItem(<Link to={'DLC Žurnalas/Statistika?menuKey=6'} >Statistika</Link>, '6'),
    ]),
    getItem('DLC Checklistas', 'sub2', <ScheduleOutlined />, [
      getItem(<Link to={'DLC Checklistas?menuKey=7'} >Pradėti</Link>, '7'),
      getItem(<Link to={'DLC Checklistas/Istorija?menuKey=8&page=1&limit=10'} >Istorija</Link>, '8'),
    ]),
    getItem('Vartotojai', 'sub3', <UserOutlined />, [
      getItem(<Link to={'/Mano_Profilis?menuKey=9'} >Mano Profilis</Link>, '9'),
      getItem(<Link to={'/Sukurti_Darbuotoją?menuKey=10'} >Sukurti darbuotoją</Link>, '10'),
      getItem(<Link to={'/Visi_Darbuotojai?menuKey=11&page=1&limit=10'} >Visi darbuotojai</Link>, '11'),
      getItem(<Link to={'/Darbuotojų_Archyvas?menuKey=12&page=1&limit=10'} >Darbuotojų archyvas</Link>, '12'),
    ]),
  ]

  const headerItems: MenuItem[] = [
    getItem(
      <Link to={'/Mano_Profilis?menuKey=13'} className='UserDisplay'>Darbuotojas: {userName}</Link>
      , '13'),
  ]

  const headerItems2: MenuItem[] = [
    getItem(
      <LogoutOutlined style={{fontSize: '20px'}} className='LogOutIcon' onClick={userLogOut}/>,
      '14'),
  ]

  return (
    <Space direction='vertical' className='PageLayoutSpace' >
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              siderBg:      'white',
              triggerBg:    'white',
              triggerColor: 'black',
              lightSiderBg: 'red',
            },
          },
        }}
      >
        <Layout hasSider>
          <Sider
            style={{marginBottom: '50px'}}
            width={250}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className='PageLayoutSliderBody'>
              <div>
                <SideBar collapsed={collapsed}/>
                <Menu defaultSelectedKeys={['1']} selectedKeys={[`${menuKey}`]} mode='inline' items={siderItems} />
              </div>
            </div>
          </Sider>
          <Layout className='Layout'>
            <Header style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Menu selectedKeys={[`${menuKey}`]} items={headerItems} />
              <Menu selectedKeys={[`${menuKey}`]} items={headerItems2} />
            </Header>
            <Content className='PageLayoutContentLight'>
              {location.pathname === '/' ?
                <>{children}</> :
                <>
                  <PageContainer pageTitle={pageTitle && pageTitles.includes(pageTitle) ? pageTitle : '' }>
                    {children}
                  </PageContainer>
                </>
              }
              <Footer className='PageLayoutFooteLight'>
                  DLC Journal ©2023 Created by Data Logistics Center
              </Footer>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </Space>
  )
}
export default PageLayout