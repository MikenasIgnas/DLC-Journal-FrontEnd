import Divider          from '@mui/joy/Divider'
import LoggedInUser     from './SideBarComponents/SideBarFooter'
import SideBarHead      from './SideBarComponents/SideBarHead'
import SideBarBody      from './SideBarComponents/SideBarBody'
import SideBarContainer from './SideBarComponents/SideBarContainer'

type SideBarProps = {
    logOut: () => Promise<void>
}

const SideBar = ({logOut}: SideBarProps) => {
  return (
    <SideBarContainer>
      <SideBarHead/>
      <SideBarBody/>
      <Divider />
      <LoggedInUser logOut={logOut}/>
    </SideBarContainer>
  )
}

export default SideBar