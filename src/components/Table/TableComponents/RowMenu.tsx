/* eslint-disable max-len */
import React                                from 'react'
import { DownOutlined}                      from '@ant-design/icons'
import { Space, type MenuProps, Dropdown }  from 'antd'
import { ItemType }                         from 'antd/es/menu/hooks/useItems'

type RowMenuType ={
  navigate:     () => void;
  deleteItem?:  () => Promise<void>
  generatePDF?: () => Promise<void>
  items:        ItemType[]
}

const RowMenu = ({navigate, deleteItem, generatePDF, items}: RowMenuType) => {
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