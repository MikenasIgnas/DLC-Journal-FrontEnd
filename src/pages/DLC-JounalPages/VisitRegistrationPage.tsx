/* eslint-disable max-len */
import React                                    from 'react'
import { Button, Card, Form, message, theme }   from 'antd'
import VisitRegistrationForm                    from '../../components/DLCJournalComponents/VisitiRegistrationComponents/VisitRegistrationForm'
import { getCurrentDate, getCurrentTime, post } from '../../Plugins/helpers'
import { useCookies }                           from 'react-cookie'
import { useNavigate }                          from 'react-router'
import SuccessMessage                           from '../../components/UniversalComponents/SuccessMessage'
import { useSearchParams }                      from 'react-router-dom'
import { EmployeesType }                        from '../../types/globalTypes'

type CollocationType = {
  [key:string] :        string[]
}

type VisitStatusType = 'success' | 'processing' | 'error' | 'default' | 'warning' | undefined;

type VisitorsType = {
 idType: string;
 selectedVisitor:EmployeesType
}

type VisitsType = {
    id:               string;
    visitPurpose:     string[];
    visitStatus:      VisitStatusType;
    visitors:         VisitorsType[];
    dlcEmployees:     string;
    visitAddress:     string;
    visitingClient:   string;
    clientsGuests:    string[];
    carPlates:        string[];
    signature:        string;
    visitCollocation: CollocationType
    visitorsIdType:   string;
    creationDate:     string;
    creationTime:     string;
    startDate:        string;
    startTime:        string;
    endDate:          string;
    endTime:          string;
    companyId:        number;
}
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

  const registerVisit = async(values: VisitsType) => {
    const visitPurpose = localStorage.getItem('visitPurpose')
    if(companyId && (values?.visitors && values?.visitors.length > 0) ){
      values.visitPurpose = visitPurpose ? JSON.parse(visitPurpose) : null
      values.visitStatus = 'processing'
      values.creationDate = getCurrentDate()
      values.creationTime = getCurrentTime()
      values.clientsGuests = clientsGuests
      values.carPlates = carPlates
      values.companyId = Number(companyId)
      const res = await post('postVisitDetails', values, cookies.access_token )
      console.log(values)
      if(!res.error){
        localStorage.clear()
        navigate(`/DLC Žurnalas/Vizitai/${res.data}?visitAddress=${values.visitAddress}`)
      }
      console.log(values)
    }else{
      messageApi.error({
        type:    'error',
        content: 'Nepasirinkti įmonės darbuotojai',
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