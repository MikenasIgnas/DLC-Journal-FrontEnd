import { MenuProps } from 'antd'

const archivedUsersRowMenuItems = (isAdmin: boolean | null) => {
  const items: MenuProps['items'] = [
    {
      label:    'Ištrinti',
      danger:   true,
      key:      '3',
      disabled: isAdmin ? false : true,
    },

  ]

  return items
}
export default archivedUsersRowMenuItems