/* eslint-disable max-len */
import React                                                                from 'react'
import { Card, Form, message, theme }                                       from 'antd'
import VisitRegistrationForm                                                from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitRegistrationForm'
import { convertUTCtoLocalDateTime, getCurrentDate, getCurrentTime, post }  from '../../Plugins/helpers'
import { useCookies }                                                       from 'react-cookie'
import { useNavigate }                                                      from 'react-router'
import SuccessMessage                                                       from '../../components/UniversalComponents/SuccessMessage'
import { useSearchParams }                                                  from 'react-router-dom'
import { VisitsType }                                                       from '../../types/globalTypes'

const VisitRegistrationPage= () => {
  const [form]                            = Form.useForm()
  const { token }                         = theme.useToken()
  const [cookies]                         = useCookies(['access_token'])
  const navigate                          = useNavigate()
  const [clientsGuests, setClientsGuests] = React.useState<string[]>([])
  const [carPlates, setCarPlates]         = React.useState<string[]>([])
  const [messageApi, contextHolder]       = message.useMessage()
  const [searchParams]                    = useSearchParams()
  const companyId                         = searchParams.get('companyId')
  const [checkedList, setCheckedList]     = React.useState<{ [key: string]: string[] }>({})


  const registerVisit = async(values: VisitsType) => {
    const visitPurpose = localStorage.getItem('visitPurpose')
    if(companyId && (values?.visitors && values?.visitors.length > 0)){
      values.visitPurpose = visitPurpose ? JSON.parse(visitPurpose) : []
      values.visitCollocation = checkedList
      values.visitStatus = 'processing'
      values.creationDate = getCurrentDate()
      values.creationTime = getCurrentTime()
      values.clientsGuests = clientsGuests
      values.carPlates = carPlates
      values.scheduledVisitTime = convertUTCtoLocalDateTime(values.scheduledVisitTime)
      values.companyId = Number(companyId)

      const res = await post('postVisitDetails', values, cookies.access_token )
      if(!res.error){
        localStorage.clear()
        navigate(`/DLC Žurnalas/Vizitai/${res.data}?visitAddress=${values.visitAddress}`)
      }
    }else{
      messageApi.error({
        type:    'error',
        content: 'Nepasirinkti įmonės darbuotojai',
      })
    }
  }

  const contentStyle: React.CSSProperties = {
    lineHeight:      '260px',
    color:           token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius:    token.borderRadiusLG,
    border:          `1px dashed ${token.colorBorder}`,
    marginTop:       16,
    width:           '100%',
  }

  const onkeydown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }
  return (
    <div style={contentStyle}>
      <Card style={{width: '100% '}}>
        <Form form={form} onFinish={registerVisit} onKeyDown={onkeydown}>
          <VisitRegistrationForm
            setCheckedList={setCheckedList}
            checkedList={checkedList}
            form={form}
            setClientsGuests={setClientsGuests}
            clientsGuests={clientsGuests}
            setCarPlates={setCarPlates}
            carPlates={carPlates}
          />
        </Form>
      </Card>
      <SuccessMessage contextHolder={contextHolder} />
    </div>
  )
}

export default VisitRegistrationPage