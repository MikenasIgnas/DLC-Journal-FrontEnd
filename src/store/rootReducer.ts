/* eslint-disable max-len */
import { combineReducers }        from 'redux'
import authReducer                from '../auth/AuthReducer/reducer'
import routeReducer               from '../auth/RouteReducer/routeReducer'
import fetchedDataReducer         from '../auth/FetchedDataReducer/fetchedDataReducer'
import ThemeReducer               from '../auth/ThemeReducer/ThemeReducer'
import checklistDataReducer       from '../auth/FetchedDataReducer/ChecklistHistoryDataReducer'
import VisitorsPermissionsReduces from '../auth/VisitorsPermissionsReducer/VisitorsPermissionsReduces'
import ModalStateReducer          from '../auth/ModalStateReducer/ModalStateReducer'
import addSubClientReducer        from '../auth/AddSubClientReducer/addSubClientReducer'

export default combineReducers({
  auth:                      authReducer,
  route:                     routeReducer,
  fetchedData:               fetchedDataReducer,
  theme:                     ThemeReducer,
  checklistHistoryTableData: checklistDataReducer,
  permissions:               VisitorsPermissionsReduces,
  modals:                    ModalStateReducer,
  isSubClientAdded:          addSubClientReducer,
})
