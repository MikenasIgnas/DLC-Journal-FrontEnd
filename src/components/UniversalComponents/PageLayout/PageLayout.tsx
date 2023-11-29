/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                                        from 'react'
import { Button, ConfigProvider, Menu, MenuProps, Space }   from 'antd'
import { Layout }                                   from 'antd'
import { Link, useLocation, useNavigate }           from 'react-router-dom'
import { clearFilleChecklistdData, get }            from '../../../Plugins/helpers'
import { useCookies }                               from 'react-cookie'
import {jwtDecode}                                  from 'jwt-decode'
import { TokenType }                                from '../../../types/globalTypes'
import { useAppDispatch, useAppSelector }           from '../../../store/hooks'
import { setUserEmail, setUsername, setUsersRole }  from '../../../auth/AuthReducer/reducer'
import { setDefaultTheme }                          from '../../../auth/ThemeReducer/ThemeReducer'
import PageContainer                                from '../../Table/TableComponents/PageContainer'
import Sider                                        from 'antd/es/layout/Sider'
import {  ReadOutlined, ScheduleOutlined, UserOutlined }                            from '@ant-design/icons'
import SideBarHead                                  from './SideBarComponents/SideBarHead'
const { Content, Footer } = Layout

type PageLayoutProps = {
  children:   React.ReactNode,
}

const PageLayout = ({children}:PageLayoutProps) => {
  const navigate =                  useNavigate()
  const dispatch =                  useAppDispatch()
  const [cookies, , removeCookie] = useCookies(['access_token'])
  const defaultTheme =              useAppSelector((state)=> state.theme.value)
  const userName =                  useAppSelector((state)=> state.auth.username)
  const token =                     cookies.access_token
  const decodedToken:TokenType =    jwtDecode(token)
  const location =                  useLocation()
  const decodedPath =               decodeURIComponent(location.pathname)
  const pathParts =                 decodedPath.split('/')
  const selectedPart =              pathParts.filter(Boolean).pop()
  const pageTitle =                 selectedPart?.replace('_', ' ')
  const pageTitles =                ['Įmonių Sąrašas','Vizitai', 'Istorija','Darbuotojai','Darbuotojų Archyvas']
  const [collapsed, setCollapsed] = React.useState(false)
  React.useEffect(() => {
    (async () => {
      try{
        const user = await get(`FindUser/${decodedToken.id}`, cookies.access_token)
        if(!user.error){
          dispatch(setUsername(user.data.username))
          dispatch(setUserEmail(user.data.email))
          dispatch(setUsersRole(user.data.userRole))
          dispatch(setDefaultTheme(user.data.defaultTheme))
        }
      }catch(err){
        console.log(err)
      }
    })()
  }, [userName])
  type MenuItem = Required<MenuProps>['items'][number];
  const userLogOut = async() => {
    const totalHistoryData = await get('getTotalAreasCount', cookies.access_token)
    removeCookie('access_token')
    clearFilleChecklistdData(totalHistoryData)
    navigate('/')
  }
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem
  }
  const items: MenuItem[] = [
    getItem('DLC Žurnalas', 'sub1', <ReadOutlined />, [
      getItem(<Link to={'DLC Žurnalas'} >Pradžia</Link>, '1'),
      getItem(<Link to={'DLC Žurnalas/Vizito_Registracija'} >Vizito registracija</Link>, '2'),
      getItem(<Link to={'DLC Žurnalas/Įmonių_Sąrašas'} >Įmonių sąrašas</Link>, '3'),
      getItem(<Link to={'DLC Žurnalas/Vizitai?page=1&limit=10'} >Vizitai</Link>, '4'),
      getItem(<Link to={'DLC Žurnalas/Statistika'} >Statistika</Link>, '5'),
    ]),
    getItem('DLC Checklistas', 'sub2', <ScheduleOutlined />, [
      getItem(<Link to={'DLC Checklistas'} >Pradėti</Link>, '6'),
      getItem(<Link to={'DLC Checklistas/Istorija?page=1&limit=10'} >Istorija</Link>, '7'),
    ]),
    getItem('Vartotojai', 'sub3', <UserOutlined />, [
      getItem(<Link to={'/Mano_Profilis'} >Mano Profilis</Link>, '8'),
      getItem(<Link to={'/Sukurti_Darbuotoją'} >Sukurti darbuotoją</Link>, '9'),
      getItem(<Link to={'/Visi_Darbuotojai?page=1&limit=10'} >Visi darbuotojai</Link>, '10'),
      getItem(<Link to={'/Darbuotojų_Archyvas?page=1&limit=10'} >Darbuotojų archyvas</Link>, '11'),
    ]),
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
            },
          },
        }}
      >
        <Layout hasSider>
          <Sider style={{height: '100vh'}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <SideBarHead collapsed={collapsed}/>
            <Menu defaultSelectedKeys={['1']} mode='inline' items={items} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Button onClick={userLogOut}>Atsijungti</Button>
            </div>
          </Sider>
          <Layout className='Layout'>
            <Content className={defaultTheme ? 'PageLayoutContentDark' : 'PageLayoutContentLight'}>
              {location.pathname === '/' ?
                <>{children}</> :
                <>
                  <PageContainer pageTitle={pageTitle && pageTitles.includes(pageTitle) ? pageTitle : '' }>
                    {children}
                  </PageContainer>
                  <Footer className={defaultTheme ? 'PageLayoutFooterDark': 'PageLayoutFooteLight'}>
                  Premises Checklist ©2023 Created by Data Logistics Center
                  </Footer>
                </>
              }
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </Space>
  )
}
export default PageLayout



