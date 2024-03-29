/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
import React                            from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage                        from './pages/LoginPage'
import NotFoundPage                     from './pages/NotFoundPage'
import ChecklistHistoryPage             from './pages/DLC-ChecklistPages/ChecklistHistoryPage'
import ChecklistStartPage               from './pages/DLC-ChecklistPages/ChecklistStartPage'
import ChecklistRoutesPage              from './pages/DLC-ChecklistPages/ChecklistRoutesPage'
import SingleHistoryPage                from './pages/DLC-ChecklistPages/SingleHistoryPage'
import CreateUserPage                   from './pages/DLC-UserManagementPages/CreateUserPage'
import ManageUsersPage                  from './pages/DLC-UserManagementPages/ManageUsersPage'
import SingleUserPage                   from './pages/DLC-UserManagementPages/SingleUserPage'
import PageLayout                       from './components/UniversalComponents/PageLayout/PageLayout'
import UsersArchivePage                 from './pages/DLC-UserManagementPages/UsersArchivePage'
import { useCookies }                   from 'react-cookie'
import { TokenType }                    from './types/globalTypes'
import DLCJournalStartPage              from './pages/DLC-JounalPages/JournalStartPage'
import VisitRegistrationPage            from './pages/DLC-JounalPages/VisitRegistrationPage'
import CompaniesListPage                from './pages/DLC-JounalPages/CompaniesListPage'
import SingleCompanyPage                from './pages/DLC-JounalPages/SingleCompanyPage'
import VisitsPage                       from './pages/DLC-JounalPages/VisitsPage'
import SingleVisitPage                  from './pages/DLC-JounalPages/SingleVisitPage'
import axios                            from 'axios'
import { jwtDecode }                    from 'jwt-decode'
import StatisticsPage                   from './pages/DLC-JounalPages/StatisticsPage'
import CollocationsPage                 from './pages/DLC-JounalPages/CollocationsPage'
import SendRecoveryCodePage             from './pages/SendRecoveryCodePage'
import RecoveryCodeConfirmationPage     from './pages/RecoveryCodeConfirmationPage'
import PasswordResetPage                from './pages/PasswordResetPage'

const Routing = () => {
  const [cookies, , removeCookie]   = useCookies(['access_token'])

  React.useEffect(() => {
    (async () => {
      const token = cookies.access_token
      if (token) {
        try {
          const decodedToken: TokenType = jwtDecode(token)
          const expirationTime  = decodedToken.exp * 1000
          const currentTime     = Date.now()
          const timeRemaining   = expirationTime - currentTime
          if (timeRemaining <= 0) {
            localStorage.clear()
            removeCookie('access_token')
          } else {
            axios.defaults.headers.common['Authorization'] = token
            window.setTimeout(() => {
              localStorage.clear()
              removeCookie('access_token')
            }, timeRemaining)
          }
        } catch (error) {
          if(error instanceof Error){
            alert(error.message)
          }
        }
      }
    })()
  }, [cookies.access_token, removeCookie])

  return (
    <BrowserRouter>
      {cookies.access_token
        ? (
          <PageLayout>
            <Routes>
              <Route path='DLC Žurnalas' element={<DLCJournalStartPage />}/>
              <Route path='DLC Žurnalas/Vizito_Registracija' element={<VisitRegistrationPage/>}/>
              <Route path='DLC Žurnalas/Įmonių_Sąrašas' element={<CompaniesListPage/>}/>
              <Route path='DLC Žurnalas/Vizitai' element={<VisitsPage/>}/>
              <Route path='DLC Žurnalas/Vizitai/:id' element={<SingleVisitPage/>}/>
              <Route path='/DLC Žurnalas/Įmonių_Sąrašas/:id' element={<SingleCompanyPage/>}/>
              <Route path='/DLC Žurnalas/Statistika' element={<StatisticsPage/>}/>
              <Route path='/DLC Žurnalas/Kolokacijos' element={<CollocationsPage/>}/>

              <Route path='DLC Checklistas' element={<ChecklistStartPage/>}/>
              <Route path='DLC Checklistas/Istorija' element={<ChecklistHistoryPage/>}/>
              <Route path='DLC Checklistas/Istorija/:id' element={(<SingleHistoryPage/>)}/>
              <Route path='DLC Checklistas/Checklistas' element={<ChecklistRoutesPage/>}/>

              <Route path='/Darbuotojų_Archyvas' element={<UsersArchivePage/>}/>
              <Route path='/Visi_Darbuotojai' element={<ManageUsersPage/>}/>
              <Route path='/Mano_Profilis/:id' element={<SingleUserPage/>}/>
              <Route path='/Visi_Darbuotojai/:id' element={<SingleUserPage/>}/>
              <Route path='/Darbuotojų_Archyvas/:id' element={<SingleUserPage/>}/>
              <Route path='/Sukurti_Darbuotoją' element={<CreateUserPage/>}/>
            </Routes>
          </PageLayout>
        )
        : (
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/SendRecoveryCodePage' element={<SendRecoveryCodePage/>} />
            <Route path='/RecoveryCodeConfirmationPage' element={<RecoveryCodeConfirmationPage/>} />
            <Route path='/PasswordResetPage' element={<PasswordResetPage/>} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        )}
    </BrowserRouter>
  )
}

export default Routing