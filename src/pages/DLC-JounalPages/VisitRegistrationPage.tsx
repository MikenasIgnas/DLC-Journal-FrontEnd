/* eslint-disable max-len */
import React                                    from 'react'
import { Button, Card, Form, message, theme }   from 'antd'
import VisitRegistrationForm                    from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitRegistrationForm'
import { getCurrentDate, getCurrentTime, post } from '../../Plugins/helpers'
import { useCookies }                           from 'react-cookie'
import { useNavigate }                          from 'react-router'
import SuccessMessage from '../../components/UniversalComponents/SuccessMessage'
import { useSearchParams } from 'react-router-dom'


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

  const registerVisit = async(values: any) => {
    const visitPurpose = localStorage.getItem('visitPurpose')
    if(companyId && visitPurpose && JSON.parse(visitPurpose).length > 0){
      values.visitPurpose = JSON.parse(visitPurpose)
      values.visitStatus = 'processing'
      values.creationDate = getCurrentDate()
      values.creationTime = getCurrentTime()
      values.clientsGuests = clientsGuests
      values.carPlates = carPlates
      values.companyId = companyId
      const res = await post('postVisitDetails', values, cookies.access_token )
      if(!res.error){
        localStorage.clear()
        console.log('asd')
        navigate(`/DLC Žurnalas/Vizitai/${res.data}`)
      }
    }else{
      messageApi.error({
        type:    'error',
        content: 'Nepasirinktas vizito tikslas',
      })
    }
  }
  const contentStyle: React.CSSProperties = {
    lineHeight:      '260px',
    textAlign:       'center',
    color:           token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius:    token.borderRadiusLG,
    border:          `1px dashed ${token.colorBorder}`,
    marginTop:       16,
    width:           '100%',
  }
  return (
    <div style={contentStyle}>
      <Card style={{width: '100% '}}>
        <Form form={form} onFinish={registerVisit}>
          <VisitRegistrationForm
            form={form}
            setClientsGuests={setClientsGuests}
            clientsGuests={clientsGuests}
            setCarPlates={setCarPlates}
            carPlates={carPlates}
          />
          <Button htmlType='submit'>Registruoti</Button>
        </Form>
      </Card>
      <SuccessMessage contextHolder={contextHolder} />
    </div>
  )
}

export default VisitRegistrationPage