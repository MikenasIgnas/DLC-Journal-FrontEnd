/* eslint-disable max-len */
import React                        from 'react'
import { listItemButtonClasses }    from '@mui/joy/ListItemButton'
import HomeRoundedIcon              from '@mui/icons-material/HomeRounded'
import List                         from '@mui/joy/List'
import MenuBookIcon                 from '@mui/icons-material/MenuBook'
import ChecklistIcon                from '@mui/icons-material/Checklist'
import GroupRoundedIcon             from '@mui/icons-material/GroupRounded'
import SiderBarListItem             from '../SideBarComponents/SiderBarListItem'
import { Box }                      from '@mui/joy'

const usersMenuItems = [
  {itemName: 'Mano Profilis', link: '/EditUsersProfile'},
  {itemName: 'Sukurti Vartotoją', link: '/CreateUser'},
  {itemName: 'Visi darbuotojai', link: '/ManageUsers'},
  {itemName: 'Darbuotojų archyvas', link: '/UsersArchive'},
]
const dlcJournalMenuItems = [
  {itemName: 'Registruoti vizitą', link: '/VisitRegistration'},
  {itemName: 'Įmonių sąrašas', link: '/CompaniesList'},
  {itemName: 'Aktyvus vizitai', link: '/VisitsPage?page=1&limit=10'},
  {itemName: 'Pastabos', link: ''},
]
const dlcChecklistMenuItems = [
  {itemName: 'Pradėti', link: '/checklistStartPage'},
  {itemName: 'Istorija', link: '/checklistHistoryData'},
]
const SideBarBody = () => {
  return (
    <Box
      sx={{
        minHeight:                            0,
        overflow:                             'hidden auto',
        flexGrow:                             1,
        display:                              'flex',
        flexDirection:                        'column',
        [`& .${listItemButtonClasses.root}`]: {
          gap: 1.5,
        },
      }}
    >
      <List
        size='sm'
        sx={{
          gap:                       1,
          '--List-nestedInsetStart': '30px',
          '--ListItem-radius':       (theme) => theme.vars.radius.sm,
        }}
      >
        <SiderBarListItem itemName={'Pagrindinis'} itemIcon={<HomeRoundedIcon />} nested={false} link={'/'}/>
        <SiderBarListItem itemName={'DLC Žurnalas'} itemIcon={<MenuBookIcon />} nested={true} nestedItems={dlcJournalMenuItems}/>
        <SiderBarListItem itemName={'DLC Checklistas'} itemIcon={<ChecklistIcon />} nested={true} nestedItems={dlcChecklistMenuItems}/>
        <SiderBarListItem itemName={'Users'} itemIcon={<GroupRoundedIcon />} nested={true} nestedItems={usersMenuItems}/>
      </List>
    </Box>
  )
}

export default SideBarBody