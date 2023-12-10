/* eslint-disable max-len */
import React                                             from 'react'
import { Divider, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy'
import IconButton                                        from '@mui/joy/IconButton'
import MoreHorizRoundedIcon                              from '@mui/icons-material/MoreHorizRounded'

type RowMenuType ={
  navigate:     () => void;
  deleteItem?:  () => Promise<void>
}

const RowMenu = ({navigate, deleteItem}: RowMenuType) => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size='sm' sx={{ minWidth: 140 }}>
        <MenuItem onClick={navigate}>Peržiūrėti</MenuItem>
        <Divider />
        {
          deleteItem ? <MenuItem onClick={deleteItem} color='danger'>Ištrinti</MenuItem> : null
        }
      </Menu>
    </Dropdown>
  )
}

export default RowMenu