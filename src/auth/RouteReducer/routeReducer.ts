import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RouteReducer {
    routeNumber:      number,
    progressTracker:  number,
    totalRoomsInArea: number[],
}

const initialState: RouteReducer = {
  routeNumber:      1,
  progressTracker:  1,
  totalRoomsInArea: [3, 2, 6, 2, 3, 7, 1],
}

const routeSlice = createSlice({
  name:     'route',
  initialState,
  reducers: {
    setRouteNumber(state, { payload }: PayloadAction<number>) {
      state.routeNumber = payload
      state.progressTracker = 1
    },
    setProgressTracker(state, { payload }: PayloadAction<number>) {
      state.progressTracker = payload
    },
  },
})

export const {
  setRouteNumber,
  setProgressTracker,
} = routeSlice.actions

export default routeSlice.reducer
