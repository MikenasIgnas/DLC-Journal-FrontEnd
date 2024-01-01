/* eslint-disable max-len */
import { combineReducers }        from 'redux'
import authReducer                from '../auth/AuthReducer/reducer'
import routeReducer               from '../auth/RouteReducer/routeReducer'
import fetchedDataReducer         from '../auth/FetchedDataReducer/fetchedDataReducer'
import checklistDataReducer       from '../auth/FetchedDataReducer/ChecklistHistoryDataReducer'
import ModalStateReducer          from '../auth/ModalStateReducer/ModalStateReducer'
import addSubClientReducer        from '../auth/AddSubClientReducer/addSubClientReducer'
import collocationItemReducer     from '../auth/CollocationItemReducer/collocationItemReducer'

export default combineReducers({
  auth:                      authReducer,
  route:                     routeReducer,
  fetchedData:               fetchedDataReducer,
  checklistHistoryTableData: checklistDataReducer,
  modals:                    ModalStateReducer,
  isSubClientAdded:          addSubClientReducer,
  collocationItem:           collocationItemReducer,
})
