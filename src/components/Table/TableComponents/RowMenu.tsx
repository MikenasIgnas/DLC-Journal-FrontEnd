/* eslint-disable max-len */
import React                                from 'react'
import { DownOutlined, FilePdfOutlined }    from '@ant-design/icons'
import { Space, type MenuProps, Dropdown }  from 'antd'

type RowMenuType ={
  navigate:           () => void;
  deleteItem?:        () => Promise<void>
  getSingleVisitPDF?: () => Promise<void>
}

const RowMenu = ({navigate, deleteItem, getSingleVisitPDF}: RowMenuType) => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if(key === '1'){
      navigate()
    }

    if(key === '2'){
      if(getSingleVisitPDF){
        getSingleVisitPDF()
      }
    }

    if(key === '3'){
      if(deleteItem){
        deleteItem()
      }
    }
  }

  const items: MenuProps['items'] = [
    {
      label: 'Peržiūrėti',
      key:   '1',
    },
    {
      label: 'PDF',
      icon:  <FilePdfOutlined/>,
      key:   '2',
    },
    {
      label:  'Ištrinti',
      danger: true,
      key:    '3',
    },

  ]
  return (
    <Dropdown menu={{ items, onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Veiksmai
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default RowMenu