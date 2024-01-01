import { MenuProps } from 'antd'

const checklistHistoryRowMenuItems = () => {
  const items: MenuProps['items'] = [
    {
      label: 'Peržiūrėti',
      key:   '1',
    },
    {
      label:  'Ištrinti',
      danger: true,
      key:    '3',
    },

  ]

  return items
}
export default checklistHistoryRowMenuItems