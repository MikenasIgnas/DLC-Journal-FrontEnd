/* eslint-disable max-len */
import React                      from 'react'
import { put }                    from '../../../Plugins/helpers'
import { useCookies }             from 'react-cookie'
import {
  Button,
  Empty,
  Form,
  message,
}                                 from 'antd'
import { Guest, VisitsType}                   from '../../../types/globalTypes'
import VisitorsList               from './VisitorsList'
import VisitPurposeList           from './VisitPurposeList'
import VisitorAdditionList        from './VisitorAdditionList'
import CarPlatesItemList          from './CarPlatesItemList'
import ClientsGuestsItemList      from './ClientsGuestsItemList'
import { useNavigate }            from 'react-router'
import SuccessMessage             from '../../UniversalComponents/SuccessMessage'

import {
  useAppDispatch,
  useAppSelector,
}                                 from '../../../store/hooks'

import { setCompanyEmployees}     from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'
import { useSearchParams }        from 'react-router-dom'
import VisitSitesSelectors        from './VisitSitesSelectors'
import VisitRegistrationRacksList from './VisitRegistrationRacksList'
import { selectVisitingCompanyEmplyees } from '../../../auth/VisitorEmployeeReducer/selectors'

const VisitRegistrationForm = () => {
  const [cookies]                         = useCookies(['access_token'])
  const [form]                            = Form.useForm()
  const navigate                          = useNavigate()
  const [messageApi, contextHolder]       = message.useMessage()
  const [clientsGuests, setClientsGuests] = React.useState<Guest[] | undefined>([])
  const [carPlates, setCarPlates]         = React.useState<string[] | undefined>([])
  const companyEmployees                  = useAppSelector((state) => state.visit.companyEmployees)
  const dispatch                          = useAppDispatch()
  const [searchParams]                    = useSearchParams()
  const visitStatus                       = useAppSelector((state) => state.visit.visitStatus)
  const siteId                            = searchParams.get('siteId')
  const companyId                         = searchParams.get('companyId')
  const visitId                           = searchParams.get('_id')
  const checkedList                       = useAppSelector((state) => state.racks.checkedList)
  const visitingEmployees                 = useAppSelector(selectVisitingCompanyEmplyees)

  React.useEffect(() => {
    form.resetFields()
  },[])

  const registerVisit = async (values: VisitsType) => {
    const visitPurpose = localStorage.getItem('visitPurpose')
    const preparedStatus = visitStatus.find((el) => el.name === 'Paruošti')

    if (!visitId) {
      return
    }

    if (visitingEmployees.length < 1) {
      messageApi.error({
        type:    'error',
        content: 'Nepasirinkti įmonės darbuotojai',
      })
      return
    }

    if (!visitPurpose || JSON.parse(visitPurpose).length < 1) {
      messageApi.error({
        type:    'error',
        content: 'Nepasirinktas vizito tikslas',
      })
      return
    }
    if (checkedList.length < 1) {
      messageApi.error({
        type:    'error',
        content: 'Nepasirinktos spintos',
      })
      return
    }

    const selectedPermissions = JSON.parse(visitPurpose)

    const visitValues = {
      id:                 visitId,
      companyId,
      racks:              checkedList,
      carPlates,
      guests:             clientsGuests,
      siteId,
      visitPurpose:       selectedPermissions,
      statusId:           preparedStatus?._id,
      sendEmail:          true,
      scheduledVisitTime: values.scheduledVisitTime,
    }

    try {
      await put('visit/visit', visitValues, cookies.access_token)
      localStorage.clear()
      form.resetFields()
      messageApi.success({
        type:    'success',
        content: 'Išsaugota',
      })
      window.scrollTo(0, 0)
      navigate(`/DLC Žurnalas/Vizitai/${visitId}?siteId=${siteId}&_id=${visitId}&companyId=${companyId}`)
    } catch (error) {
      if (error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  const onkeydown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  const resetForm = () => {
    form.resetFields()
    dispatch(setCompanyEmployees([]))
    setClientsGuests([])
    setCarPlates([])
    localStorage.removeItem('visitPurpose')
  }

  return (
    <>
      <Form form={form} onFinish={registerVisit} onKeyDown={onkeydown} initialValues={{visitingClient: companyId, siteId: siteId}}>
        <div>
          <VisitSitesSelectors/>
          <VisitorAdditionList/>
          {companyEmployees && companyEmployees?.length <= 0 && <Empty description='Darbuotojų nėra' image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          <VisitorsList/>
          <VisitPurposeList/>
          <VisitRegistrationRacksList/>
        </div>
        <ClientsGuestsItemList list={clientsGuests} setListItems={setClientsGuests}/>
        <CarPlatesItemList list={carPlates} setList={setCarPlates}/>
        <div className='VisitRegistrationButtonContainer'>
          <Button htmlType='submit'>Registruoti</Button>
          <Button style={{marginLeft: '20px'}} onClick={resetForm}> Išvalyti</Button>
        </div>
        <SuccessMessage contextHolder={contextHolder} />
      </Form>
    </>
  )
}

export default VisitRegistrationForm