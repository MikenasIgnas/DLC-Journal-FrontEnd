import React                        from 'react'
import { Input, Typography, Box }   from '@mui/joy'
import BrightnessAutoRoundedIcon    from '@mui/icons-material/BrightnessAutoRounded'
import IconButton                   from '@mui/joy/IconButton'
import SearchRoundedIcon            from '@mui/icons-material/SearchRounded'

const SideBarHead = () => {
  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant='soft' color='primary' size='sm'>
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level='title-md'>Data Logistics Center</Typography>
      </Box>
      <Input size='sm' startDecorator={<SearchRoundedIcon />} placeholder='Search' />
    </>
  )
}

export default SideBarHead