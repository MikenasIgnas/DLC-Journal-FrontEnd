/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import { AppstoreAddOutlined } from '@ant-design/icons'
import { Button} from 'antd'
import React from 'react'
import AdditionModal from './AdditionModal'

const CompanyAddition = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <div>
      <Button icon={<AppstoreAddOutlined />} onClick={()=> setIsModalOpen(true)}>Pridėti įmonę</Button>
      {isModalOpen && <AdditionModal setIsModalOpen={setIsModalOpen}/>}
    </div>
  )
}

export default CompanyAddition

// const company = {
//   J13: {
//     DC5: ['S1.1'],
//   },
//   T72: {

//     DC5: ['S1.1'],
//   },

// }