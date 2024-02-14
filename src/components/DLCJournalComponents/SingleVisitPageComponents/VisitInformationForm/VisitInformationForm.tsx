/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Descriptions, Form }             from 'antd'
import VisitDescriptionTitle              from '../VisitDescriptionTitle'
import { put }                            from '../../../../Plugins/helpers'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import VisitInformationItems              from '../../VisitiRegistrationComponents/VisitInformationItems'
import { useParams }                      from 'react-router'
import { useCookies }                     from 'react-cookie'
import { setEditVisitInformation }        from '../../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'
import { useSearchParams }                from 'react-router-dom'


const VisitInformationForm = () => {
  const [form]               = Form.useForm()
  const { id }               = useParams()
  const [cookies]            = useCookies(['access_token'])
  const dispatch             = useAppDispatch()
  const editVisitInformation = useAppSelector((state) => state.visitPageEdits.editVisitInformation)
  const items                = VisitInformationItems(editVisitInformation)
  const [searchParams]       = useSearchParams()
  const siteId               = searchParams.get('siteId')

  const saveChanges = async (values: any) => {
    dispatch(setEditVisitInformation(!editVisitInformation))
    if(editVisitInformation){
      await put('visit/visit', {id: id, visitPurpose: values.visitPurpose, siteId: siteId}, cookies.access_token)
    }
  }

  return (
    <Form form={form} onFinish={saveChanges}>
      <Descriptions
        style={{backgroundColor: '#f9f9f9', margin: '10px', padding: '10px'}}
        title={<VisitDescriptionTitle/>}
        items={items}
      />
    </Form>
  )
}

export default VisitInformationForm