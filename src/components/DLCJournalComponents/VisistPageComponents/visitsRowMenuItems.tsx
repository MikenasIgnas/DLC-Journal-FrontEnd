import { FilePdfOutlined, LoadingOutlined } from '@ant-design/icons'
import { MenuProps }                        from 'antd'

const visitsRowMenuItems = (loading: boolean | undefined, isSecurity: boolean | null) => {
  const items: MenuProps['items'] = [
    {
      label: 'Peržiūrėti',
      key:   '1',
    },
    {
      label: 'PDF',
      icon:  loading ? <LoadingOutlined/> : <FilePdfOutlined/>,
      key:   '2',
    },
    {
      label:    'Ištrinti',
      danger:   true,
      key:      '3',
      disabled: !isSecurity ? false : true,
    },

  ]

  return items
}
export default visitsRowMenuItems