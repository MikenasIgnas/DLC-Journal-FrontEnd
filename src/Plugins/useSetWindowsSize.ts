import React from 'react'

const useSetWindowsSize = () => {
  const [windowSize, setWindowSize] = React.useState<number>(window.screen.width)


  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.screen.width)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export default useSetWindowsSize