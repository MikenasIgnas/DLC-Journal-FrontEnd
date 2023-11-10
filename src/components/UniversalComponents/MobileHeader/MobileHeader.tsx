/* eslint-disable max-len */
import React                                            from 'react'
import { ConfigProvider, Drawer, Menu }                 from 'antd'
import { CloseOutlined, LogoutOutlined, MenuOutlined }  from '@ant-design/icons'
import { ItemType }                                     from 'antd/es/menu/hooks/useItems'
import { useAppSelector }                               from '../../../store/hooks'
import { Link }                                         from 'react-router-dom'

type MobileHeaderProps = {
  headerClass:  string,
  menuItems:    ItemType[],
  menuItems2:   ItemType[],
  Logout: () => Promise<void>,
}

const MobileHeader = ({menuItems2, Logout}: MobileHeaderProps) => {
  const width =           window.innerWidth
  const [open, setOpen] = React.useState(false)
  const userName =        useAppSelector((state)=> state.auth.username)
  const defaultTheme =    useAppSelector((state)=> state.theme.value)

  return (
    <div style={{
      backgroundColor: defaultTheme ? '#191919' : 'white',
      color:           defaultTheme ? 'white' : 'black',
      width:           '100%',
      display:         'flex',
      justifyContent:  'space-between',
      alignItems:      'center',
      padding:         '5px',
    }}>
      <div>
        <MenuOutlined style={{fontSize: '18px', padding: '15px' }} onClick={() => setOpen(true)} rev/>
      </div>
      <div style={{display: 'flex', alignItems: 'center', width: '230px', justifyContent: 'space-between'}}>
        <Link to={'/EditUsersProfile'}> {`Darbuotojas: ${userName}`}</Link>
        <LogoutOutlined style={{fontSize: '20px', paddingRight: '15px'}} onClick={Logout} rev/>
      </div>
      <ConfigProvider theme={{
        token: {
          colorIcon: defaultTheme ? 'white' : 'black',
          paddingLG: 0,
        },
      }}>
        <Drawer
          placement={'left'}
          onClose={() => setOpen(false)}
          open={open}
          closeIcon={<CloseOutlined rev style={{fontSize: '16px', marginLeft: '10px'}} />}
          style={{
            width:           width / 1.5,
            backgroundColor: defaultTheme ? '#191919' : 'white',
            color:           defaultTheme ? 'white' : 'black',
          }}
        >
          <ConfigProvider theme={{
            token: {
              controlItemBgActive: 'none',
            },
          }}>
            <Menu
              onClick={() => setOpen(false)}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              items={menuItems2}
              mode={'inline'}
            />
          </ConfigProvider>
        </Drawer>
      </ConfigProvider>
    </div>
  )
}

export default MobileHeader