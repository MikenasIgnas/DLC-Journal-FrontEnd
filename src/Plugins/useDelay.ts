import React from 'react'

type TimeoutType = ReturnType<typeof setTimeout>

const timer = 600

export default () => {
  const searchTimeout = React.useRef<TimeoutType>()

  React.useEffect(() => {
    return () => {
      if(searchTimeout.current){
        clearTimeout(searchTimeout.current)
      }
    }
  },[])

  const setSearch = React.useCallback((method: () => void, timeoutTimer?: number) => {
    if(searchTimeout.current){
      clearTimeout(searchTimeout.current)
    }
    searchTimeout.current = setTimeout(() => {
      method()
    }, timeoutTimer ? timeoutTimer : timer)
  }, [])

  return setSearch
}