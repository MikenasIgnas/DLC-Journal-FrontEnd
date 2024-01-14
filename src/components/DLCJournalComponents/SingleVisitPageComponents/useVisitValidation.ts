/* eslint-disable max-len */
import { useParams }                from 'react-router'
import { useCookies }               from 'react-cookie'
import { message }                  from 'antd'
import { get }                      from '../../../Plugins/helpers'
import { VisitorsType, VisitsType } from '../../../types/globalTypes'

const useVisitValidation = () => {
  const { id }                      = useParams()
  const [cookies]                   = useCookies(['access_token'])
  const [messageApi, contextHolder] = message.useMessage()

  const hasValidId    = (visitors: VisitorsType[]) => visitors?.every(obj => obj.idType)
  const hasSignatures = (visitors: VisitorsType[]) => visitors?.every(obj => obj.signature)

  const validate = async (visitData: VisitsType[] | undefined, isEdit: boolean, fetchData: () => Promise<void>, url: string, successMessage: string) => {
    const visitors              = visitData?.[0]?.visitors
    const visitPurpose          = visitData?.[0]?.visitPurpose

    if (isEdit) {
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

    if (!hasSignatures(visitors)) {
      messageApi.error({ type: 'error', content: 'Trūksta parašo' })
      return
    }

    try {
      const res = await get(`${url}?visitId=${id}`, cookies.access_token)
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