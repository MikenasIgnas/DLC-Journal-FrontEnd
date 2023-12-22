/* eslint-disable max-len */
import React                                              from 'react'
import { DownOutlined, FilePdfOutlined, LoadingOutlined } from '@ant-design/icons'
import { Space, type MenuProps, Dropdown }                from 'antd'

type RowMenuType ={
  navigate:     () => void;
  deleteItem?:  () => Promise<void>
  generatePDF?: () => Promise<void>
  loading?:     boolean
}

const RowMenu = ({navigate, deleteItem, generatePDF, loading}: RowMenuType) => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if(key === '1'){
      navigate()
    }
    if(key === '2'){
      if(generatePDF){
        generatePDF()
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
      icon:  loading ? <LoadingOutlined/> : <FilePdfOutlined/>,
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