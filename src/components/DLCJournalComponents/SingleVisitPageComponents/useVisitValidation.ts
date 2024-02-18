/* eslint-disable max-len */
import { message }                        from 'antd'
import { post }                           from '../../../Plugins/helpers'
import {
  VisitStatus,
  Visitors,
}                                         from '../../../types/globalTypes'
import {
  useAppDispatch,
  useAppSelector,
}                                         from '../../../store/hooks'
import { useParams }                      from 'react-router'
import { useCookies }                     from 'react-cookie'
import { selectVisitingCompanyEmplyees }  from '../../../auth/VisitorEmployeeReducer/selectors'
import { setVisit }                       from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'

const useVisitValidation = () => {
  const [cookies]                   = useCookies(['access_token'])
  const [messageApi, contextHolder] = message.useMessage()
  const editVisitInformation        = useAppSelector((state) => state.visitPageEdits.editVisitInformation)
  const editVisitors                = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const editCollocations            = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const { id }                      = useParams()
  const visitData                   = useAppSelector((state) => state.visit.visit)
  const visitingEmployees           = useAppSelector(selectVisitingCompanyEmplyees)
  const dispatch                    = useAppDispatch()
  const hasValidId                  = (visitors: Visitors[]) => visitors?.every(obj => obj.visitorIdType)

  const validate = async (url: string, successMessage: string, visitStatuses: VisitStatus | undefined) => {
    const visitPurpose = visitData?.visitPurpose
    if (editVisitInformation || editVisitors || editCollocations) {
      messageApi.error({ type: 'error', content: 'Neišsaugoti duomenys' })
      return
    }

    if (!visitingEmployees?.length) {
      messageApi.error({ type: 'error', content: 'Nepasirinkti įmonės darbuotojai' })
      return
    }

    if (!visitPurpose?.length) {
      messageApi.error({ type: 'error', content: 'Nepasirinktas vizito tikslas' })
      return
    }

    if (!hasValidId(visitingEmployees)) {
      messageApi.error({ type: 'error', content: 'Nepasirinktas dokumento tipas' })
      return
    }

    try {
      const res = await post(url, {visitId: id, statusId: visitStatuses?._id } ,cookies.access_token)
      messageApi.success({
        type:    'success',
        content: successMessage,
      })
      dispatch(setVisit(res))
    } catch (error) {
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }
  return { validate, contextHolder }
}

export default useVisitValidation