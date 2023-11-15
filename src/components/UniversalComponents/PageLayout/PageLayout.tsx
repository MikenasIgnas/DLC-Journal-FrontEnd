/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                                          from 'react'
import { Space }                                      from 'antd'
import { Layout }                                     from 'antd'
import { useLocation, useNavigate, useSearchParams }  from 'react-router-dom'
import { clearFilleChecklistdData, get, post }        from '../../../Plugins/helpers'
import { useCookies }                                 from 'react-cookie'
import {jwtDecode}                                    from 'jwt-decode'
import { TokenType }                                  from '../../../types/globalTypes'
import { useAppDispatch, useAppSelector }             from '../../../store/hooks'
import { setUserEmail, setUsername, setUsersRole }    from '../../../auth/AuthReducer/reducer'
import { setDefaultTheme }                            from '../../../auth/ThemeReducer/ThemeReducer'
import SideBar                                        from './SideBar'
import PageContainer                                  from '../../Table/TableComponents/PageContainer'

const { Content, Footer } = Layout

type PageLayoutProps = {
  children:   React.ReactNode,
}

const PageLayout = ({children}:PageLayoutProps) => {
  const navigate =                          useNavigate()
  const dispatch =                          useAppDispatch()
  const [cookies, , removeCookie] =         useCookies(['access_token'])
  const defaultTheme =                      useAppSelector((state)=> state.theme.value)
  const userName =                          useAppSelector((state)=> state.auth.username)
  const token =                             cookies.access_token
  const decodedToken:TokenType =            jwtDecode(token)
  const isAdmin =                           decodedToken.userRole === 'admin' || decodedToken.userRole === 'SYSADMIN'
  const [searchParams] =                    useSearchParams()
  const tabUrlParam =                       searchParams.get('menu') as string
  const [isDesktop, setDesktop] =           React.useState(window.innerWidth > 650)
  const location =                          useLocation()
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

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650)
  }

  React.useEffect(() => {
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })

  const userLogOut = async() => {
    const totalHistoryData = await get('getTotalAreasCount', cookies.access_token)
    removeCookie('access_token')
    clearFilleChecklistdData(totalHistoryData)
    navigate('/')
  }

  const decodedPath = decodeURIComponent(location.pathname)
  const pathParts = decodedPath.split('/')
  const selectedPart = pathParts.filter(Boolean).pop()
  const pageTitle = selectedPart?.replace('_', ' ')
  const pageTitles = ['Įmonių Sąrašas','Vizitai', 'Istorija','Darbuotojai','Darbuotojų Archyvas']
  return (
    <Space direction='vertical' className='PageLayoutSpace' size={[0, 48]}>
      <Layout hasSider>
        <SideBar logOut={userLogOut}/>
        <Layout className='Layout'>
          <Content className={defaultTheme ? 'PageLayoutContentDark' : 'PageLayoutContentLight'}>
            {location.pathname === '/' ?
              <>{children}</> :
              <PageContainer pageTitle={pageTitle && pageTitles.includes(pageTitle) ? pageTitle : '' }>
                {children}
              </PageContainer>
            }
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



