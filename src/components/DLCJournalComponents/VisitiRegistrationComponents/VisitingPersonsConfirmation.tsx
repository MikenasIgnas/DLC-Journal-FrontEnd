/* eslint-disable max-len */
import React                                        from 'react'
import { Button, Checkbox, Form, Select, message }  from 'antd'
import { useForm }                                  from 'antd/es/form/Form'
import { get, post }                                from '../../../Plugins/helpers'
import { useCookies }                               from 'react-cookie'
import SignatureCanvas                              from 'react-signature-canvas'
import { useNavigate, useSearchParams }             from 'react-router-dom'
import SuccessMessage                               from '../../UniversalComponents/SuccessMessage'

type VisitorsIdentificationType = {
  signature: string | undefined;
  visitorsIdType: string;
}

type CollocationsType = {
  [key: string]: string[]
}

const VisitingPersonsConfirmation = () => {
  const [form] =                                            useForm()
  const [cookies] =                                         useCookies(['access_token'])
  const signatureCanvasRef =                                React.useRef<SignatureCanvas>(null)
  const [messageApi, contextHolder] =                       message.useMessage()
  const navigate =                                          useNavigate()
  const [searchParams] =                                    useSearchParams()
  const companyId =                                         searchParams.get('companyId')
  const addressId =                                         searchParams.get('addressId')
  const [companiesColocations, setCompaniesCollocations] =  React.useState<CollocationsType[]>()
  const [visitStatus, setVisitStatus] =                     React.useState('')

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany =     await get(`SingleCompanyPage/${companyId}`, cookies.access_token)
        if(addressId === '1'){
          setCompaniesCollocations(singleCompany.data.companyInfo.J13)
        }else{
          setCompaniesCollocations(singleCompany.data.companyInfo.T72)
        }
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  const finishVisitRegistration = async(visitorsIdentification:VisitorsIdentificationType) => {
    const visitDetails = localStorage.getItem('visitDetails')
    const visitDetails2 = localStorage.getItem('visitDetails2')
    const signatureImage = signatureCanvasRef.current?.toDataURL()
    visitorsIdentification.signature = signatureImage
    if(visitDetails ){
      const visitInfo = JSON.parse(visitDetails)
      // const visitGoal = JSON.parse(visitDetails2)
      const visitationDetails = {
        visitStatus: visitStatus,
        visitInfo,
        // visitGoal,
        visitorsIdentification,
      }
      messageApi.success({
        type:    'success',
        content: 'Išsaugota',
      })
      const res = await post('postVisitDetails', visitationDetails, cookies.access_token)
      if(!res.error){
        setTimeout(() =>{
          navigate('/DLCJournalStartPage')
        },1000)
      }else{
        messageApi.success({
          type:    'error',
          content: 'Nepavyko išsaugoti',
        })
      }
    }
  }

  const handleClear = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear()
    }
  }

  return (
    <Form
      form={form}
      onFinish={finishVisitRegistration}
      style={{backgroundColor: 'white', height: '88%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
        <div>
          {companiesColocations?.map((el, i) => {
            const objEntries = Object.entries(el)
            return(
              <div key={i}>
                <div>{objEntries[0][0]}</div>
                <Form.Item name={['visitCollocation', objEntries[0][0]]}>
                  <Checkbox.Group options={objEntries[0][1]} key={i}/>
                </Form.Item>
              </div>
            )})
          }
          <Form.Item name='visitorsIdType'>
            <Select style={{width: '100%'}}
              options={[
                {
                  value: 'Pasas', label: 'Pasas',
                },
                {
                  value: 'Tapatybės Kortelė', label: 'Tapatybės Kortelė',
                },
                {
                  value: 'Darbuotojo Pažymėjimas', label: 'Darbuotojo Pažymėjimas',
                },
              ]}/>
          </Form.Item>
          <SignatureCanvas
            penColor='black'
            canvasProps={{width: 500, height: 200, style: {backgroundColor: 'lightgrey'}}}
            ref = {signatureCanvasRef}
          />
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px'}}>
          <Button onClick={() => setVisitStatus('success')} htmlType='submit'>Registruoti</Button>
          <Button onClick={() => setVisitStatus('processing')} htmlType='submit'>Paruošti</Button>
          <Button onClick={handleClear}>Clear</Button>
        </div>
      </div>
      <SuccessMessage contextHolder={contextHolder}/>
    </Form>
  )
}

export default VisitingPersonsConfirmation