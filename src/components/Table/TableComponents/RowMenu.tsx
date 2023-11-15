/* eslint-disable max-len */
import React                                             from 'react'
import { Divider, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy'
import IconButton                                        from '@mui/joy/IconButton'
import MoreHorizRoundedIcon                              from '@mui/icons-material/MoreHorizRounded'

const RowMenu = () => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size='sm' sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color='danger'>Delete</MenuItem>
      </Menu>
    </Dropdown>
  )
}

export default RowMenu