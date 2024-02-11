/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Descriptions, Form }                                   from 'antd'
import VisitDescriptionTitle                                    from '../VisitDescriptionTitle'
import { put }                                                  from '../../../../Plugins/helpers'
import { useAppDispatch, useAppSelector }                       from '../../../../store/hooks'
import VisitInformationItems                                    from '../../VisitiRegistrationComponents/VisitInformationItems'
import { CompaniesType, Sites, VisitPurpose, VisitsType, Permissions, Visitors, VisitStatus }       from '../../../../types/globalTypes'
import { useParams }                                            from 'react-router'
import { useCookies }                                           from 'react-cookie'
import { setEditVisitInformation }                              from '../../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'
import { useSearchParams }                                      from 'react-router-dom'

type VisitInformationFormProps = {
  visitData:    VisitsType | undefined
  sites:        Sites[] | undefined
  company:      CompaniesType | undefined
  visitPurpose: VisitPurpose[]
  permissions:  Permissions[]
  visitors:     Visitors[]
  visitStatus:  VisitStatus | undefined
}

const VisitInformationForm = ({ visitData, sites, company, visitPurpose, permissions, visitors, visitStatus }: VisitInformationFormProps) => {
  const [form]               = Form.useForm()
  const { id }               = useParams()
  const [cookies]            = useCookies(['access_token'])
  const dispatch             = useAppDispatch()
  const editVisitInformation = useAppSelector((state) => state.visitPageEdits.editVisitInformation)
  const items                = VisitInformationItems(visitData, editVisitInformation, sites, company, visitPurpose, permissions, visitors, visitStatus)
  const [searchParams]       = useSearchParams()
  const visitAddress         = searchParams.get('visitAddress')

  const saveChanges = async (values: any) => {
    dispatch(setEditVisitInformation(!editVisitInformation))
    if(editVisitInformation){
      await put('visit/visit', {id: id, visitPurpose: values.visitPurpose, siteId: visitAddress}, cookies.access_token)
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