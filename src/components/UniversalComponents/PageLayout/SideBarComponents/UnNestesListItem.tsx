import React from 'react'
import {ListItem, ListItemButton, ListItemContent, Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom'

type UnNestesListItemProps = {
    itemIcon:   React.ReactNode
    itemName:   string
    link?:       string;
}

const UnNestesListItem = ({itemIcon, itemName, link}: UnNestesListItemProps) => {
  const navigate = useNavigate()
  return (
    <ListItem>
      <ListItemButton onClick={() => navigate(`${link}`)}>
        {itemIcon}
        <ListItemContent>
          <Typography level='title-sm'>{itemName}</Typography>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  )
}

export default UnNestesListItem