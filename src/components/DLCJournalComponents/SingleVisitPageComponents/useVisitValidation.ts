/* eslint-disable max-len */
import React                              from 'react'
import { message }                        from 'antd'

import {
  get,
  post,
}                                         from '../../../Plugins/helpers'

import {
  Guest,
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

import {
  setDlcEmployee,
  setVisit,
  setVisitors,
}                                         from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'

const useVisitValidation = () => {
  const [cookies]                   = useCookies(['access_token'])
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading]       = React.useState(false)
  const editVisitInformation        = useAppSelector((state) => state.visitPageEdits.editVisitInformation)
  const editVisitors                = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const editCollocations            = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const { id }                      = useParams()
  const visitData                   = useAppSelector((state) => state.visit.visit)
  const visitingEmployees           = useAppSelector(selectVisitingCompanyEmplyees)
  const clientsGuests               = useAppSelector((state) => state.visit.guests)
  const editClientsGuests           = useAppSelector((state) => state.visitPageEdits.editClientsGuests)
  const dispatch                    = useAppDispatch()
  const hasValidId                  = (visitors: Visitors[]) => visitors?.every(obj => obj.visitorIdType)
  const hasSigned                   = (visitors: Visitors[]) => visitors?.every(obj => obj.signatures || obj.signed)
  const guestHasValidId             = (guest: Guest[]) => guest.every(obj => obj.idType)
  const hasGuestSigned              = (guest: Guest[]) => guest?.every(obj => obj.signatures || obj.signed)

  const validate = async (url: string, successMessage: string, visitStatuses: VisitStatus | undefined) => {
    const visitPurpose = visitData?.visitPurpose

    if (editVisitInformation || editVisitors || editCollocations || editClientsGuests) {
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

    if (!hasValidId(visitingEmployees) || !guestHasValidId(clientsGuests)) {
      messageApi.error({ type: 'error', content: 'Nepasirinktas dokumento tipas' })
      return
    }

    if (!hasSigned(visitingEmployees) || !hasGuestSigned(clientsGuests)) {
      messageApi.error({ type: 'error', content: 'Trūksta parašo' })
      return
    }

    try {
      setLoading(true)
      const signatures      = visitingEmployees.map(el => ({ signature: el.signatures, visitorId: el._id }))
      const guestSignatures = clientsGuests?.map((el) => ({ signature: el.signatures, id: el._id}))
      const res             = await post(url, {visitId: id, statusId: visitStatuses?._id, signatures, guestSignatures } ,cookies.access_token)
      const employee        = await get(`user?id=${res.dlcEmployee}`, cookies.access_token)
      const visitors        = await get(`visit/visitor?visitId=${id}`, cookies.access_token)
      setLoading(false)
      dispatch(setVisitors(visitors))
      dispatch(setVisit(res))
      dispatch(setDlcEmployee(employee))

      messageApi.success({
        type:    'success',
        content: successMessage,
      })

      window. scrollTo(0, 0)
    } catch (error) {
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }
  return { validate, contextHolder, loading }
}

export default useVisitValidation