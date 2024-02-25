/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                 from 'react'
import {
  ConfigProvider,
  Menu,
  MenuProps,
  Space,
  message,
}                            from 'antd'
import { Layout }            from 'antd'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
}                             from 'react-router-dom'
import {
  clearFilleChecklistdData,
  get,
}                             from '../../../Plugins/helpers'
import { useCookies }         from 'react-cookie'
import {jwtDecode}            from 'jwt-decode'
import { TokenType }          from '../../../types/globalTypes'
import {
  useAppDispatch,
  useAppSelector,
}                             from '../../../store/hooks'
import {
  setUserEmail,
  setEmployeeName,
  setUsersRole,
  setIsAdmin,
  setIsSecurity,
}                             from '../../../auth/AuthReducer/reducer'
import PageContainer          from '../../Table/TableComponents/PageContainer'
import Sider                  from 'antd/es/layout/Sider'
import {
  LogoutOutlined,
  MenuOutlined,
  ReadOutlined,
  ScheduleOutlined,
  UserOutlined,
}                             from '@ant-design/icons'
import SideBar                from './SideBar'
import { Header }             from 'antd/es/layout/layout'
import useSetWindowsSize      from '../../../Plugins/useSetWindowsSize'
import SuccessMessage         from '../SuccessMessage'

const { Content, Footer } = Layout

type PageLayoutProps = {
  children: React.ReactNode,
}

type MenuItem = Required<MenuProps>['items'][number];

const PageLayout = ({children}:PageLayoutProps) => {
  const navigate                    = useNavigate()
  const [cookies, , removeCookie]   = useCookies(['access_token'])
  const token                       = cookies.access_token
  const decodedToken:TokenType      = jwtDecode(token)
  const location                    = useLocation()
  const decodedPath                 = decodeURIComponent(location.pathname)
  const pathParts                   = decodedPath.split('/')
  const selectedPart                = pathParts.filter(Boolean).pop()
  const pageTitle                   = selectedPart?.replace('_', ' ')
  const pageTitles                  = ['Įmonių Sąrašas','Vizitai', 'Istorija','Darbuotojai','Darbuotojų Archyvas']
  const [collapsed, setCollapsed]   = React.useState(false)
  const [searchParams]              = useSearchParams()
  const menuKey                     = searchParams.get('menuKey')
  const siteId                      = searchParams.get('siteId')
  const employee                    = useAppSelector((state)=> state.auth.name)
  const dispatch                    = useAppDispatch()
  const isAdmin                     = useAppSelector((state) => state.auth.isAdmin)
  const isSecurity                  = useAppSelector((state) => state.auth.isSecurity)
  const windowSize                  = useSetWindowsSize()
  const [messageApi, contextHolder] = message.useMessage()

  React.useEffect(() => {
    (async () => {
      try{
        const user = await get(`user?id=${decodedToken.userId}`, cookies.access_token)
        dispatch(setEmployeeName(user.name))
        dispatch(setIsAdmin(user.isAdmin))
        dispatch(setIsSecurity(user.isSecurity))
        dispatch(setUserEmail(user.email))
        dispatch(setUsersRole(user.userRole))
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    })()
  }, [])


  const userLogOut = async() => {
    try{
      const totalHistoryData = await get('getTotalAreasCount', cookies.access_token)
      removeCookie('access_token')
      clearFilleChecklistdData(totalHistoryData)
      navigate('/')
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  const getItem = (
    label:      React.ReactNode,
    key:        React.Key,
    icon?:      React.ReactNode,
    children?:  MenuItem[],
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
      getItem(<Link to={siteId ? `DLC Žurnalas?menuKey=1&siteId=${siteId}` : 'DLC Žurnalas?menuKey=1'} >Pradžia</Link>, '1'),
      !isSecurity ? getItem(<Link to={'DLC Žurnalas/Vizito_Registracija?menuKey=2'} >Vizito registracija</Link>, '2'): null,
      !isSecurity ? getItem(<Link to={'DLC Žurnalas/Vizitai?menuKey=3&page=1&limit=10&descending=true'} >Vizitai</Link>, '3'): null,
      !isSecurity ? getItem(<Link to={'DLC Žurnalas/Įmonių_Sąrašas?menuKey=4&page=1&limit=10&descending=true'} >Įmonių sąrašas</Link>, '4'): null,
      !isSecurity ? getItem(<Link to={'DLC Žurnalas/Kolokacijos?menuKey=5&tabKey=1'} >Kolokacijos</Link>, '5'): null,
      !isSecurity ? getItem(<Link to={'DLC Žurnalas/Statistika?menuKey=6'} >Statistika</Link>, '6'): null,
    ]),

    !isSecurity ? getItem('DLC Checklistas', 'sub2', <ScheduleOutlined />, [
      getItem(<Link to={'DLC Checklistas?menuKey=7'} >Pradėti</Link>, '7'),
      getItem(<Link to={'DLC Checklistas/Istorija?menuKey=8&page=1&limit=10&tableSorter=desc'} >Istorija</Link>, '8'),
    ]): null,

    !isSecurity ? getItem('Vartotojai', 'sub3', <UserOutlined />, [
      getItem(<Link to={`/Mano_Profilis/${decodedToken.userId}?menuKey=9`} >Mano Profilis</Link>, '9'),
      isAdmin ? getItem(<Link to={'/Sukurti_Darbuotoją?menuKey=10'} >Sukurti darbuotoją</Link>, '10') : null,
      getItem(<Link to={'/Visi_Darbuotojai?menuKey=11&page=1&limit=10&tableSorter=desc'} >Visi darbuotojai</Link>, '11'),
      getItem(<Link to={'/Darbuotojų_Archyvas?menuKey=12&page=1&limit=10&tableSorter=desc'} >Darbuotojų archyvas</Link>, '12'),
    ]): null,
  ]

  const logedInUserHeaderItem: MenuItem[] = [
    getItem(
      <Link to={`/Mano_Profilis/${decodedToken.userId}?menuKey=13`} className='UserDisplay'>Darbuotojas: {employee}</Link>
      , '13'),
  ]

  const logOutHeaderItem: MenuItem[] = [
    getItem(
      <LogoutOutlined style={{fontSize: '20px'}} className='LogOutIcon' onClick={userLogOut}/>,
      '14'),
  ]

  const MobileHeaderItems: MenuProps['items'] = [
    {
      label:    'Menu',
      key:      'SubMenu',
      icon:     <MenuOutlined />,
      children: [
        {
          type:     'group',
          label:    'Žurnalas',
          children: [
            getItem(<Link to={'DLC Žurnalas?menuKey=1'} >Pradžia</Link>, '1'),
            getItem(<Link to={'DLC Žurnalas/Vizito_Registracija?menuKey=2'} >Vizito registracija</Link>, '2'),
            getItem(<Link to={'DLC Žurnalas/Vizitai?menuKey=3&page=1&limit=10&descending=true'} >Vizitai</Link>, '3'),
            getItem(<Link to={'DLC Žurnalas/Įmonių_Sąrašas?menuKey=4&page=1&limit=10&descending=true'} >Įmonių sąrašas</Link>, '4'),
            getItem(<Link to={'DLC Žurnalas/Kolokacijos?menuKey=5&tabKey=1'} >Kolokacijos</Link>, '5'),
            getItem(<Link to={'DLC Žurnalas/Statistika?menuKey=6'} >Statistika</Link>, '6'),
          ],
        },
        {
          type:     'group',
          label:    'Checklistas',
          children: [
            getItem(<Link to={'DLC Checklistas?menuKey=7'} >Pradėti</Link>, '7'),
            getItem(<Link to={'DLC Checklistas/Istorija?menuKey=8&page=1&limit=10&tableSorter=desc'} >Istorija</Link>, '8'),
          ],
        },
        {
          type:     'group',
          label:    'Vartotojai',
          children: [
            getItem(<Link to={`/Mano_Profilis/${decodedToken.userId}?menuKey=9`} >Mano Profilis</Link>, '9'),
            isAdmin ? getItem(<Link to={'/Sukurti_Darbuotoją?menuKey=10'} >Sukurti darbuotoją</Link>, '10') : null,
            getItem(<Link to={'/Visi_Darbuotojai?menuKey=11&page=1&limit=10&tableSorter=desc'} >Visi darbuotojai</Link>, '11'),
            getItem(<Link to={'/Darbuotojų_Archyvas?menuKey=12&page=1&limit=10&tableSorter=desc'} >Darbuotojų archyvas</Link>, '12'),
          ],
        },
      ],
    },
  ]

  return (
    <Space direction='vertical' className='PageLayoutSpace' >
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              siderBg:       'white',
              triggerBg:     'white',
              triggerColor:  'black',
              headerPadding: 0,
            },
          },
        }}
      >
        <Layout hasSider>
          {
            windowSize > 600 &&
              <Sider
                width={250}
                style={{ marginBottom: '50px', overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <div className='PageLayoutSliderBody'>
                  <div>
                    <SideBar collapsed={collapsed}/>
                    <Menu defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']} selectedKeys={[`${menuKey}`]} mode='inline' items={siderItems} />
                  </div>
                </div>
              </Sider>
          }
          <Layout style={{marginLeft: collapsed ? '78px' : '250px'}} className='Layout'>
            {
              windowSize > 600 ?
                <Header className='Header'>
                  <Menu selectedKeys={[`${menuKey}`]} items={logedInUserHeaderItem} />
                  <Menu selectedKeys={[`${menuKey}`]} items={logOutHeaderItem} />
                </Header>
                :
                <Header className='Header'>
                  <Menu selectedKeys={[`${menuKey}`]} items={MobileHeaderItems} />
                  <Menu selectedKeys={[`${menuKey}`]} items={logedInUserHeaderItem} />
                  <Menu selectedKeys={[`${menuKey}`]} items={logOutHeaderItem} />
                </Header>
            }
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
      <SuccessMessage contextHolder={contextHolder}/>
    </Space>
  )
}
export default PageLayout