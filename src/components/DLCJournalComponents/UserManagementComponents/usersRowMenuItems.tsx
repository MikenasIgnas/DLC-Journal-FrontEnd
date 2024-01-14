import { MenuProps } from 'antd'

const usersRowMenuItems = (isAdmin: boolean | null) => {

  const items: MenuProps['items'] = [
    {
      label:    'Archyvuoti',
      danger:   true,
      key:      '1',
      disabled: isAdmin ? false : true,
    },

  ]

  return items
}
export default usersRowMenuItems