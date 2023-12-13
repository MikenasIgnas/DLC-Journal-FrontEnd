/* eslint-disable max-len */
import React from 'react'
import { Box, ListItem, ListItemButton, ListItemContent, Typography } from '@mui/joy'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import List from '@mui/joy/List'
import { Link, useNavigate } from 'react-router-dom'
function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
      open: boolean;
      setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
  }) {
  const [open, setOpen] = React.useState(defaultExpanded)
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display:          'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition:       '0.2s ease',
          '& > *':          {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  )
}

type UnNestesListItemProps = {
    itemIcon:       React.ReactNode
    itemName:       string;
    nestedItems?:   {itemName:string, link:string}[]
    link?:    string;
}
const NestedListItem = ({itemIcon, itemName, nestedItems, link}:UnNestesListItemProps) => {
  const navigate = useNavigate()
  const openToggleButton = (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOpen(!open)
    if(link){
      navigate(`${itemName}`)
    }
  }
  return (
    <ListItem nested>
      <Toggler
        renderToggle={({ open, setOpen }) => (
          <ListItemButton onClick={() => openToggleButton(open, setOpen)}>
            {itemIcon}
            <ListItemContent>
              <Typography level='title-sm'>{itemName !== '' ? itemName : 'Darbuotojai'}</Typography>
            </ListItemContent>
            <KeyboardArrowDownIcon
              sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
            />
          </ListItemButton>
        )}
      >
        <List sx={{ gap: 0.5 }}>
          <nav>
            {nestedItems?.map((item, i) => (
              <ListItem key={i} sx={{ mt: 0.5 }}>
                <Link to={`${itemName}${item.link}`}>{item.itemName}</Link>
              </ListItem>
            ))}
          </nav>
        </List>
      </Toggler>
    </ListItem>
  )
}

export default NestedListItem