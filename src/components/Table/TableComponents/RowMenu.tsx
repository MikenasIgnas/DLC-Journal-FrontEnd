/* eslint-disable max-len */
import { DownOutlined}                      from '@ant-design/icons'
import { Space, type MenuProps, Dropdown }  from 'antd'
import { ItemType }                         from 'antd/es/menu/hooks/useItems'

type RowMenuType ={
  deleteItem?:  () => Promise<void>
  generatePDF?: () => Promise<void>
  endVisit?:    () => Promise<void>
  items:        ItemType[]
}

const RowMenu = ({ deleteItem, generatePDF, items, endVisit }: RowMenuType) => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (endVisit){
      if(key === '1'){
        endVisit()
      }
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