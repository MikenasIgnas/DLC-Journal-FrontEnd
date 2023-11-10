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
import EditUsersProfilePage             from './pages/DLC-UserManagementPages/EditUsersProfilePage'
import SingleUserPage                   from './pages/DLC-UserManagementPages/SingleUserPage'
import PageLayout                       from './components/UniversalComponents/PageLayout/PageLayout'
import UsersArchivePage                 from './pages/DLC-UserManagementPages/UsersArchivePage'
import { useCookies }                   from 'react-cookie'
import jwt_decode                       from 'jwt-decode'
import { TokenType }                    from './types/globalTypes'
import DLCJournalStartPage              from './pages/DLC-JounalPages/JournalStartPage'
import VisitRegistrationPage            from './pages/DLC-JounalPages/VisitRegistrationPage'
import HomePage                         from './pages/HomePage'
import CompaniesListPage                from './pages/DLC-JounalPages/CompaniesListPage'
import SingleCompanyPage                from './pages/DLC-JounalPages/SingleCompanyPage'
import VisitsPage                       from './pages/DLC-JounalPages/VisitsPage'
import SingleVisitPage                  from './pages/DLC-JounalPages/SingleVisitPage'
import SingleClientsEmployeePage        from './pages/DLC-JounalPages/SingleClientsEmployeePage'
import axios                            from 'axios'
import TableContainer                   from './components/Table/TableComponents/TableContainer'

const Routing = () => {
  const [cookies, , removeCookie] = useCookies(['access_token'])

  React.useEffect(() => {
    (async () => {
      const token = cookies.access_token
      if (token) {
        try {
          const decodedToken: TokenType = jwt_decode(token)
          const expirationTime =  decodedToken.exp * 1000
          const currentTime =     Date.now()
          const timeRemaining =   expirationTime - currentTime
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
          console.log('Invalid token', error)
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
              <Route path='/' element={<HomePage />} />
              <Route path='checklistStartPage' element={<ChecklistStartPage/>}/>
              <Route path='checklistHistoryData' element={<ChecklistHistoryPage/>}/>
              <Route path='singleHistoryUnit/:id' element={(<SingleHistoryPage/>)}/>
              <Route path='ChecklistRoutes' element={<ChecklistRoutesPage/>}/>
              <Route path='DLCJournalStartPage' element={<DLCJournalStartPage/>}/>
              <Route path='VisitRegistration' element={<VisitRegistrationPage/>}/>
              <Route path='CompaniesList' element={<CompaniesListPage/>}/>
              <Route path='VisitsPage' element={<VisitsPage/>}/>
              <Route path='SingleVisitPage/:id' element={<SingleVisitPage/>}/>
              <Route path='TestTable' element={<TableContainer/>}/>
              <Route path='SingleCompanyPage/:id' element={<SingleCompanyPage/>}/>
              <Route path='SingleClientsEmployeePage' element={<SingleClientsEmployeePage/>}/>
              <Route path='CreateUser' element={<CreateUserPage/>}/>
              <Route path='UsersArchive' element={<UsersArchivePage/>}/>
              <Route path='ManageUsers' element={<ManageUsersPage/>}/>
              <Route path='EditUsersProfile' element={<EditUsersProfilePage/>}/>
              <Route path='SingleUserPage/:secret' element={<SingleUserPage/>}/>
            </Routes>
          </PageLayout>
        )
        : (
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        )}
    </BrowserRouter>
  )
}

export default Routing
