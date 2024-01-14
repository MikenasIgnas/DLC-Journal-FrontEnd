/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Descriptions, Form }                                   from 'antd'
import VisitDescriptionTitle                                    from '../VisitDescriptionTitle'
import { convertUTCtoLocalDate, convertUTCtoLocalTime, post }   from '../../../../Plugins/helpers'
import { useAppDispatch, useAppSelector }                       from '../../../../store/hooks'
import { setEditVisitInformation }                              from '../../../../auth/SingleVisitPageEditsReducer/SingleVisitPageEditsReducer'
import VisitInformationItems                                    from '../../VisitiRegistrationComponents/VisitInformationItems'
import useSetUsersData                                          from '../../../../Plugins/useSetUsersData'
import { VisitsType }                                           from '../../../../types/globalTypes'
import { useParams }                                            from 'react-router'
import { useCookies }                                           from 'react-cookie'

type VisitInformationFormProps = {
  visitData: VisitsType[] | undefined
  fetchData: () => Promise<void>
}

const VisitInformationForm = ({ visitData, fetchData }: VisitInformationFormProps) => {
  const [form]               = Form.useForm()
  const { id }               = useParams()
  const [cookies]            = useCookies(['access_token'])
  const dispatch             = useAppDispatch()
  const { users }            = useSetUsersData(false)
  const editVisitInformation = useAppSelector((state) => state.visitPageEdits.editVisitInformation)
  const items                = VisitInformationItems(visitData, editVisitInformation, users)

  const saveChanges = async (values: any) => {
    dispatch(setEditVisitInformation(!editVisitInformation))
    if(editVisitInformation){
      const localtStartDate = convertUTCtoLocalDate(values.startDate)
      const localEndDate = convertUTCtoLocalDate(values.endDate)
      const localStartTime = convertUTCtoLocalTime(values?.startTime)
      const localEndTime = convertUTCtoLocalTime(values?.endTime)
      values.startDate = localtStartDate
      values.endDate = localEndDate
      values.startTime = localStartTime
      values.endTime = localEndTime
      await post(`updateVisitInformation?visitId=${id}`, values, cookies.access_token)
      await fetchData()
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