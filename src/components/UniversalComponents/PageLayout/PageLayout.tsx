/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                                          from 'react'
import { Space }                                      from 'antd'
import { Layout }                                     from 'antd'
import { useLocation, useNavigate }                   from 'react-router-dom'
import { clearFilleChecklistdData, get }              from '../../../Plugins/helpers'
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

  const userLogOut = async() => {
    const totalHistoryData = await get('getTotalAreasCount', cookies.access_token)
    removeCookie('access_token')
    clearFilleChecklistdData(totalHistoryData)
    navigate('/')
  }

  return (
    <Space direction='vertical' className='PageLayoutSpace' >
      <Layout hasSider>
        <SideBar logOut={userLogOut}/>
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
    </Space>
  )
}
export default PageLayout



