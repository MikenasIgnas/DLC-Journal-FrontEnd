/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                                        from 'react'
import { Space }                                    from 'antd'
import { Layout }                                   from 'antd'
import { useNavigate, useSearchParams }             from 'react-router-dom'
import { clearFilleChecklistdData, get, post }      from '../../../Plugins/helpers'
import { useCookies }                               from 'react-cookie'
import jwt_decode                                   from 'jwt-decode'
import { TokenType }                                from '../../../types/globalTypes'
import { useAppDispatch, useAppSelector }           from '../../../store/hooks'
import { setUserEmail, setUsername, setUsersRole }  from '../../../auth/AuthReducer/reducer'
import { setDefaultTheme }                          from '../../../auth/ThemeReducer/ThemeReducer'
import SideBar                                      from './SideBar'

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
  const startChecklist = async() => {
    const totalHistoryData = await get('getTotalAreasCount', cookies.access_token)
    clearFilleChecklistdData(totalHistoryData)
    setIsHomePage(false)
  }

  const userLogOut = async() => {
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

  return (
    <Space direction='vertical' className='PageLayoutSpace' size={[0, 48]}>
      <Layout hasSider>
        <SideBar logOut={userLogOut}/>
        <Layout className='Layout'>
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




