import Divider          from '@mui/joy/Divider'
import LoggedInUser     from './SideBarComponents/SideBarFooter'
import SideBarBody      from './SideBarComponents/SideBarBody'
import SideBarContainer from './SideBarComponents/SideBarContainer'

type SideBarProps = {
    logOut: () => Promise<void>
}

const SideBar = ({logOut}: SideBarProps) => {
  return (
    <SideBarContainer>
      <SideBarBody/>
      <Divider />
      <LoggedInUser logOut={logOut}/>
    </SideBarContainer>
  )
}

export default SideBar