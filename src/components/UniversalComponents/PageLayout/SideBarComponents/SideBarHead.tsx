import React                 from 'react'
import { Typography, Box }   from '@mui/joy'
import IconButton            from '@mui/joy/IconButton'
import { useNavigate } from 'react-router'

const SideBarHead = () => {
  const navigate = useNavigate()

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton onClick={() => navigate('/')} variant='soft' color='primary' size='sm'>
          <img className='HomePageCover' src='../Images/Logo.png'/>
        </IconButton>
        <Typography level='title-md'>Data Logistics Center</Typography>
      </Box>
    </>
  )
}

export default SideBarHead