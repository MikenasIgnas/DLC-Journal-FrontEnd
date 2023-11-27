/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  PossibleProblemsType,
  RouteType,
  AreaType,
  TodoType,
  HistoryDataType,
  ChecklistPhotosType,
} from '../../types/globalTypes'

interface PossibleProblemsReducerState {
  possibleProblems:       PossibleProblemsType[] | null;
  FilledData:             HistoryDataType[] | null;
  Routes:                 RouteType[] | null;
  Areas:                  AreaType[] | null;
  ToDo:                   TodoType[] | null;
  latestHistoryItemData:  HistoryDataType[] | null;
  problemCount:           number | null;
  checklistPhotos:        ChecklistPhotosType[] | null;
  latestPhotos:           ChecklistPhotosType[] | null;
}

const initialState: PossibleProblemsReducerState = {
  possibleProblems:      null,
  Routes:                null,
  Areas:                 null,
  ToDo:                  null,
  FilledData:            null,
  latestHistoryItemData: null,
  problemCount:          0,
  checklistPhotos:       null,
  latestPhotos:          null,
}

const fetchedDataReducer = createSlice({
  name:     'fetchedDataReducer',
  initialState,
  reducers: {
    setPossibleProblems(state, { payload }: PayloadAction<PossibleProblemsType[]>) {
      state.possibleProblems = payload
    },
    setRoute(state, { payload }: PayloadAction<RouteType[]>) {
      state.Routes = payload
    },
    setTodo(state, { payload }: PayloadAction<TodoType[]>) {
      state.ToDo = payload
    },
    setArea(state, { payload }: PayloadAction<AreaType[]>) {
      state.Areas = payload
    },
    setFilledData(state, { payload }: PayloadAction<HistoryDataType[]>) {
      state.FilledData = payload
    },
    setLatestHistoryItem(state, { payload }: PayloadAction<HistoryDataType[]>) {
      state.latestHistoryItemData = payload
    },
    setProblemCount(state, { payload }: PayloadAction<number>) {
      state.problemCount = payload
    },
    setChecklistPhotos(state, { payload }: PayloadAction<ChecklistPhotosType[]>) {
      state.checklistPhotos = payload
    },
    setLatestPhotos(state, { payload }: PayloadAction<ChecklistPhotosType[]>) {
      state.latestPhotos = payload
    },
    resetReducer() {
      return initialState
    },
  },
})

export const {
  setPossibleProblems,
  setRoute,
  setTodo,
  setArea,
  setFilledData,
  setLatestHistoryItem,
  resetReducer,
  setProblemCount,
  setChecklistPhotos,
  setLatestPhotos,
} = fetchedDataReducer.actions

export default fetchedDataReducer.reducer