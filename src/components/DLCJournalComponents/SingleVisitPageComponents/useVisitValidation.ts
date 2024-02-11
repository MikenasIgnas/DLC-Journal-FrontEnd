/* eslint-disable max-len */
import { message }                from 'antd'
import { post }                   from '../../../Plugins/helpers'
import { VisitStatus, Visitors, VisitsType }   from '../../../types/globalTypes'
import { useAppSelector }         from '../../../store/hooks'
import { useParams }              from 'react-router'
import { useCookies }             from 'react-cookie'

const useVisitValidation = () => {
  const [cookies]                   = useCookies(['access_token'])
  const [messageApi, contextHolder] = message.useMessage()
  const editVisitInformation        = useAppSelector((state) => state.visitPageEdits.editVisitInformation)
  const editVisitors                = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const editCollocations            = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const { id }                      = useParams()
  const hasValidId                  = (visitors: Visitors[]) => visitors?.every(obj => obj.visitorIdType)
  const validate = async (visitData: VisitsType | undefined, visitors: Visitors[], url: string, successMessage: string, visitStatuses: VisitStatus | undefined, fetchData: () => Promise<void> ) => {
    const visitPurpose = visitData?.visitPurpose
    if (editVisitInformation || editVisitors || editCollocations) {
      messageApi.error({ type: 'error', content: 'Neišsaugoti duomenys' })
      return
    }

    if (!visitors?.length) {
      messageApi.error({ type: 'error', content: 'Nepasirinkti įmonės darbuotojai' })
      return
    }

    if (!visitPurpose?.length) {
      messageApi.error({ type: 'error', content: 'Nepasirinktas vizito tikslas' })
      return
    }

    if (!hasValidId(visitors)) {
      messageApi.error({ type: 'error', content: 'Nepasirinktas dokumento tipas' })
      return
    }

    try {
      const res = await post(url, {visitId: id, statusId: visitStatuses?._id } ,cookies.access_token)
      if (!res.error) {
        messageApi.success({
          type:    'success',
          content: successMessage,
        })
        await fetchData()
      } else {
        messageApi.error({
          type:    'error',
          content: 'Klaida vykdant užklausą',
        })
      }
    } catch (error) {
      messageApi.error({
        type:    'error',
        content: 'Serverio klaida',
      })
    }
  }
  return { validate, contextHolder }
}

export default useVisitValidation