/* eslint-disable max-len */
import { AppstoreAddOutlined }              from '@ant-design/icons'
import { Button}                            from 'antd'
import CompanyAdditionModal                 from './CompanyAdditionModal'
import { CollocationsType }                 from '../../../../types/globalTypes'
import { useAppDispatch }                   from '../../../../store/hooks'
import { setOpenCompaniesAdditionModal }    from '../../../../auth/ModalStateReducer/ModalStateReducer'

type CompanyAdditionProps = {
  postUrl:            string;
  additionModalTitle: string;
  collocations:       CollocationsType[] | undefined
}
const CompanyAddition = ({postUrl, additionModalTitle, collocations}:CompanyAdditionProps) => {
  const dispatch                    = useAppDispatch()

  return (
    <div>
      <Button
        icon={<AppstoreAddOutlined rev='' />}
        onClick={()=> dispatch(setOpenCompaniesAdditionModal(true))}>
          Pridėti įmonę
      </Button>
      <CompanyAdditionModal
        postUrl={postUrl}
        additionModalTitle={additionModalTitle}
        collocations={collocations}
      />
    </div>
  )
}

export default CompanyAddition