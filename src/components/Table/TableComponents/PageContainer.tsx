import React               from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline         from '@mui/joy/CssBaseline'
import Box                 from '@mui/joy/Box'
import Typography          from '@mui/joy/Typography'
import BreadcrumbsLinks    from '../../UniversalComponents/BreadcrumbsLinks'

type PageContainerProps = {
  children:   React.ReactNode
  pageTitle:  string | undefined;
}

const PageContainer = ({children, pageTitle}:PageContainerProps) => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box
          component='main'
          className='MainContent'
          sx={{
            px: {
              xs: 2,
              md: 6,
            },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: {
              xs: 2,
              sm: 2,
              md: 3,
            },
            flex:          1,
            display:       'flex',
            flexDirection: 'column',
            minWidth:      0,
            gap:           1,
          }}
        >

          <BreadcrumbsLinks/>
          <Box
            sx={{
              display:        'flex',
              my:             1,
              gap:            1,
              flexDirection:  { xs: 'column', sm: 'row' },
              alignItems:     { xs: 'start', sm: 'center' },
              flexWrap:       'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level='h2'>{pageTitle}</Typography>
          </Box>
          {children}
        </Box>
      </Box>
    </CssVarsProvider>
  )
}

export default PageContainer