import store                                                from './store'
import { TypedUseSelectorHook, useDispatch, useSelector }   from 'react-redux'

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
