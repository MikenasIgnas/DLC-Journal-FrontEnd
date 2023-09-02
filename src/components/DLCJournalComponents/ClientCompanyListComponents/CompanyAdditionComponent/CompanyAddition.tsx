/* eslint-disable max-len */
import React                    from 'react'
import { AppstoreAddOutlined }  from '@ant-design/icons'
import { Button}                from 'antd'
import CompanyAdditionModal     from './CompanyAdditionModal'
import { CollocationsType }     from '../../../../types/globalTypes'

type CompanyAdditionProps = {
  postUrl:            string;
  additionModalTitle: string;
  setIsCompanyAdded:  React.Dispatch<React.SetStateAction<boolean>>
  collocations:       CollocationsType[] | undefined
}
const CompanyAddition = ({postUrl, additionModalTitle, collocations, setIsCompanyAdded}:CompanyAdditionProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  return (
    <div>
      <Button style={{display: 'flex', margin: 'auto', marginTop: '10px'}} icon={<AppstoreAddOutlined />} onClick={()=> setIsModalOpen(true)}>Pridėti įmonę</Button>
      {isModalOpen && <CompanyAdditionModal postUrl={postUrl} additionModalTitle={additionModalTitle} collocations={collocations} setIsCompanyAdded={setIsCompanyAdded} setIsModalOpen={setIsModalOpen}/>}
    </div>
  )
}

export default CompanyAddition