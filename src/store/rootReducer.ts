import { combineReducers }      from 'redux'
import authReducer              from '../auth/AuthReducer/reducer'
import routeReducer             from '../auth/RouteReducer/routeReducer'
import fetchedDataReducer       from '../auth/FetchedDataReducer/fetchedDataReducer'
import ThemeReducer             from '../auth/ThemeReducer/ThemeReducer'
import visitsDataReducer        from '../auth/FetchedDataReducer/VisitsDataReducer'
import checklistDataReducer     from '../auth/FetchedDataReducer/ChecklistHistoryDataReducer'
import usersDataReducer         from '../auth/FetchedDataReducer/UsersDataReducer'

export default combineReducers({
  auth:                      authReducer,
  route:                     routeReducer,
  fetchedData:               fetchedDataReducer,
  theme:                     ThemeReducer,
  visitTableData:            visitsDataReducer,
  checklistHistoryTableData: checklistDataReducer,
  usersTableData:            usersDataReducer,
})
