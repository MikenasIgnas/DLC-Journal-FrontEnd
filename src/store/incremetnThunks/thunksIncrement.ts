/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import { setProgressTracker, setRouteNumber } from '../../auth/RouteReducer/routeReducer'
import { ThunkType }                          from '../decrementThunks/thunksDecrement'

export const onIncrementProgressTracker = (): ThunkType<{ newRouteNumber: number, newProgressTracker: number }> => (dispatch, getState) => {
  const { route: { totalRoomsInArea, routeNumber, progressTracker } } = getState()

  let newRouteNumber = routeNumber
  let newProgressTracker = progressTracker
  if (routeNumber < totalRoomsInArea.length) {
    if (totalRoomsInArea[routeNumber - 1] > progressTracker) {
      dispatch(setProgressTracker(progressTracker + 1))
      newProgressTracker += 1
    } else {
      dispatch(setRouteNumber(routeNumber + 1))
      newProgressTracker = 1
      newRouteNumber += 1
    }
  }

  return { newRouteNumber, newProgressTracker }
}