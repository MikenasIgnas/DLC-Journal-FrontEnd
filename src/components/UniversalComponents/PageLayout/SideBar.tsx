/* eslint-disable max-len */
import IconButton       from '@mui/joy/IconButton'
import { useNavigate }  from 'react-router'
import { Typography }   from 'antd'

type SideBarHeadProps = {
  collapsed: boolean;
}

const SideBar = ({collapsed}:SideBarHeadProps) => {
  const navigate = useNavigate()

  return (
    <>
      <div style={{ display: 'flex', gap: 1, alignItems: 'center', margin: '10px', justifyContent: 'center' }}>
        <IconButton onClick={() => navigate('/DLC Žurnalas?menuKey=1')} variant='soft' color='primary' size='sm'>
          <img className='HomePageCover' src='../Images/Logo.png'/>
        </IconButton>
        {!collapsed && <Typography >Data Logistics Center</Typography> }
      </div>
    </>
  )
}

export default SideBar