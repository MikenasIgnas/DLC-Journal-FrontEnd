/* eslint-disable max-len */
import { combineReducers }      from 'redux'
import authReducer              from '../auth/AuthReducer/reducer'
import routeReducer             from '../auth/RouteReducer/routeReducer'
import fetchedDataReducer       from '../auth/FetchedDataReducer/fetchedDataReducer'
import ThemeReducer             from '../auth/ThemeReducer/ThemeReducer'
import checklistDataReducer     from '../auth/FetchedDataReducer/ChecklistHistoryDataReducer'
import VisitorsPermissionsReduces from '../auth/VisitorsPermissionsReducer/VisitorsPermissionsReduces'

export default combineReducers({
  auth:                      authReducer,
  route:                     routeReducer,
  fetchedData:               fetchedDataReducer,
  theme:                     ThemeReducer,
  checklistHistoryTableData: checklistDataReducer,
  permissions:               VisitorsPermissionsReduces,
})
