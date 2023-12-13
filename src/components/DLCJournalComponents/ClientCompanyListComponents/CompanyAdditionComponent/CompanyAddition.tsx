/* eslint-disable max-len */
import React                                from 'react'
import { AppstoreAddOutlined }              from '@ant-design/icons'
import { Button}                            from 'antd'
import CompanyAdditionModal                 from './CompanyAdditionModal'
import { CollocationsType }                 from '../../../../types/globalTypes'
import { useAppDispatch, useAppSelector }   from '../../../../store/hooks'
import { setOpenCompaniesAdditionModal }    from '../../../../auth/ModalStateReducer/ModalStateReducer'

type CompanyAdditionProps = {
  postUrl:            string;
  additionModalTitle: string;
  collocations:       CollocationsType[] | undefined
}
const CompanyAddition = ({postUrl, additionModalTitle, collocations}:CompanyAdditionProps) => {
  const dispatch                    = useAppDispatch()
  const openCompaniesAdditionModal  = useAppSelector((state) => state.modals.openCompaniesAdditionModal)
  return (
    <div>
      <Button
        style={{display: 'flex', margin: 'auto', marginTop: '10px'}}
        icon={<AppstoreAddOutlined rev='' />}
        onClick={()=> dispatch(setOpenCompaniesAdditionModal(true))}>
          Pridėti įmonę
      </Button>
      {openCompaniesAdditionModal && <CompanyAdditionModal
        postUrl={postUrl}
        additionModalTitle={additionModalTitle}
        collocations={collocations}
      />
      }
    </div>
  )
}

export default CompanyAddition