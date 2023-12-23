/* eslint-disable max-len */
import React                        from 'react'
import { Box, Link }                from '@mui/joy'
import { useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumbs }              from '@mui/joy'
import ChevronRightRoundedIcon      from '@mui/icons-material/ChevronRightRounded'
import HomeRoundedIcon              from '@mui/icons-material/HomeRounded'

const BreadcrumbsLinks = () => {
  const location    = useLocation()
  const navigate    = useNavigate()
  const decodedPath = decodeURIComponent(location.pathname)
  const pathParts   = decodedPath.split('/')
  const lastPath = pathParts[pathParts.length - 1]
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Breadcrumbs size='sm' aria-label='breadcrumbs' separator={false} sx={{ pl: 0 }}>
        <Link
          underline='none'
          color='neutral'
          aria-label='Home'
          onClick={() => navigate('/')}
        >
          <HomeRoundedIcon />
        </Link>
        {pathParts.map((el, index) => {
          return(
            <>
              {
                lastPath !== el ?
                  <Link
                    key={index}
                    onClick={() => navigate(pathParts.slice(0, index + 1).map(encodeURIComponent).join('/')+ '?page=1&limit=10')}
                  >
                    {index > 0 && <ChevronRightRoundedIcon key={index} fontSize='medium' />}
                    {decodeURIComponent(el)}
                  </Link>
                  :
                  <>
                    {index > 0 && <ChevronRightRoundedIcon key={index} fontSize='medium' />}
                    <div key={index}>{el}</div>
                  </>
              }
            </>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}

export default BreadcrumbsLinks