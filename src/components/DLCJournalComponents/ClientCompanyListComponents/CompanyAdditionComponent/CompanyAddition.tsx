/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import { AppstoreAddOutlined } from '@ant-design/icons'
import { Button} from 'antd'
import React from 'react'
import CompanyAdditionModal from './CompanyAdditionModal'

type CompanyAdditionProps = {
  setIsCompanyAdded: React.Dispatch<React.SetStateAction<boolean>>
}
const CompanyAddition = ({setIsCompanyAdded}:CompanyAdditionProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  return (
    <div>
      <Button style={{display: 'flex', margin: 'auto', marginTop: '10px'}} icon={<AppstoreAddOutlined />} onClick={()=> setIsModalOpen(true)}>Pridėti įmonę</Button>
      {isModalOpen && <CompanyAdditionModal setIsCompanyAdded={setIsCompanyAdded} setIsModalOpen={setIsModalOpen}/>}
    </div>
  )
}

export default CompanyAddition