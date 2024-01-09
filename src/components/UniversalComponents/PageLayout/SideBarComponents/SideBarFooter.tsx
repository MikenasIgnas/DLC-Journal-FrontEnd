/* eslint-disable max-len */
import { Avatar, Box, IconButton, Typography }  from '@mui/joy'
import LogoutRoundedIcon                        from '@mui/icons-material/LogoutRounded'
import { useAppSelector }                       from '../../../../store/hooks'

type SideBarProps = {
  logOut: () => Promise<void>
}

const LoggedInUser = ({logOut}: SideBarProps) => {
  const employee  = useAppSelector((state) => state.auth.name)
  const userEmail = useAppSelector((state) => state.auth.userEmail)
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Avatar
        variant='outlined'
        size='sm'
      />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography level='title-sm'>{employee}</Typography>
        <Typography level='body-xs'>{userEmail}</Typography>
      </Box>
      <IconButton onClick={logOut} size='sm' variant='plain' color='neutral'>
        <LogoutRoundedIcon />
      </IconButton>
    </Box>
  )
}

export default LoggedInUser