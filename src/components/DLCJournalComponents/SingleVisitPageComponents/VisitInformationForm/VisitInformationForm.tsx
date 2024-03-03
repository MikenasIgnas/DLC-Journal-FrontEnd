/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Descriptions,
  Form,
  message,
}                                   from 'antd'
import { put }                      from '../../../../Plugins/helpers'
import {
  useAppDispatch,
  useAppSelector,
}                                   from '../../../../store/hooks'
import { useParams }                from 'react-router'
import { useCookies }               from 'react-cookie'
import { setEditVisitInformation }  from '../../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'
import { useSearchParams }          from 'react-router-dom'
import SuccessMessage               from '../../../UniversalComponents/SuccessMessage'
import VisitDescriptionTitle        from '../VisitDescriptionTitle'
import VisitInformationItems        from '../../VisitiRegistrationComponents/VisitInformationItems'


const VisitInformationForm = () => {
  const [form]                      = Form.useForm()
  const { id }                      = useParams()
  const [cookies]                   = useCookies(['access_token'])
  const dispatch                    = useAppDispatch()
  const editVisitInformation        = useAppSelector((state) => state.visitPageEdits.editVisitInformation)
  const items                       = VisitInformationItems(editVisitInformation)
  const [searchParams]              = useSearchParams()
  const siteId                      = searchParams.get('siteId')
  const [messageApi, contextHolder] = message.useMessage()

  const saveChanges = async (values: any) => {
    dispatch(setEditVisitInformation(!editVisitInformation))
    if(editVisitInformation){
      try{
        const updataValues = {
          id:           id,
          visitPurpose: values.visitPurpose,
          siteId:       siteId,
          startDate:    values.startDate,
          endDate:      values.endDate,
        }

        await put('visit/visit', updataValues, cookies.access_token)

        messageApi.success({
          type:    'success',
          content: 'Išsaugota',
        })
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    }
  }

  return (
    <Form form={form} onFinish={saveChanges}>
      <Descriptions
        style={{backgroundColor: '#f9f9f9', margin: '10px', padding: '10px'}}
        title={<VisitDescriptionTitle/>}
        items={items}
      />
      <SuccessMessage contextHolder={contextHolder}/>
    </Form>
  )
}

export default VisitInformationForm