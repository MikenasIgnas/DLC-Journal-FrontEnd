/* eslint-disable max-len */
import { AppstoreAddOutlined }              from '@ant-design/icons'
import { Button}                            from 'antd'
import CompanyAdditionModal                 from './CompanyAdditionModal'
import { useAppDispatch }                   from '../../../../store/hooks'
import { setOpenCompaniesAdditionModal }    from '../../../../auth/ModalStateReducer/ModalStateReducer'
import useFetchSites                        from '../../../../Plugins/useFetchSites'

type CompanyAdditionProps = {
  postUrl:            string;
  additionModalTitle: string;
}
const CompanyAddition = ({postUrl, additionModalTitle}:CompanyAdditionProps) => {
  const dispatch = useAppDispatch()
  useFetchSites()
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
      />
    </div>
  )
}

export default CompanyAddition