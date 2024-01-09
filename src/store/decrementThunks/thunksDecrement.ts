/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { AnyAction }                          from 'redux'
import { ThunkAction }                        from 'redux-thunk'
import { setProgressTracker, setRouteNumber } from '../../auth/RouteReducer/routeReducer'
import store                                  from '../store'

export type RootState = ReturnType<typeof store.getState>;
export type ThunkType<T = void> = ThunkAction<T, RootState, unknown, AnyAction>;

export const onDecrementProgressTracker = (): ThunkType<{ newRouteNumber: number, newProgressTracker: number }> => (dispatch: any, getState) => {
  const { route: { totalRoomsInArea, routeNumber, progressTracker } } = getState()

  let newRouteNumber = routeNumber
  let newProgressTracker = progressTracker
  if (routeNumber > 1 || (routeNumber === 1 && progressTracker > 1)) {
    if (progressTracker > 1) {
      newProgressTracker -= 1
      dispatch(setProgressTracker(progressTracker - 1))
    } else {
      newProgressTracker = totalRoomsInArea[routeNumber - 2]
      dispatch(setProgressTracker(totalRoomsInArea[routeNumber - 2]))
      newRouteNumber -= 1
      dispatch(setRouteNumber(routeNumber - 1))
    }
  }
  if (progressTracker === 1) {
    newProgressTracker = totalRoomsInArea[routeNumber - 2]
    dispatch(setProgressTracker(totalRoomsInArea[routeNumber - 2]))
  }
  return { newRouteNumber, newProgressTracker }
}