/* eslint-disable max-len */
import React                                from 'react'
import { Button, Form, Select, message }    from 'antd'
import { useForm }                          from 'antd/es/form/Form'
import { post }                             from '../../../Plugins/helpers'
import { useCookies }                       from 'react-cookie'
import SignatureCanvas                      from 'react-signature-canvas'
import { useNavigate }                      from 'react-router-dom'
import SuccessMessage from '../../UniversalComponents/SuccessMessage'

type VisitorsIdentificationType = {
  signature: string | undefined;
  visitorsIdType: string;
}

const VisitingPersonsConfirmation = () => {
  const [form] =                      useForm()
  const [cookies] =                   useCookies(['access_token'])
  const signatureCanvasRef =          React.useRef<SignatureCanvas>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const navigate =                    useNavigate()

  const finishVisitRegistration = async(visitorsIdentification:VisitorsIdentificationType) => {
    const visitDetails = localStorage.getItem('visitDetails')
    const visitDetails2 = localStorage.getItem('visitDetails2')
    const signatureImage = signatureCanvasRef.current?.toDataURL()
    visitorsIdentification.signature = signatureImage
    if(visitDetails && visitDetails2){
      const visitInfo = JSON.parse(visitDetails)
      const visitGoal = JSON.parse(visitDetails2)
      const visitationDetails = {
        visitInfo,
        visitGoal,
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
    <Form form={form} onFinish={finishVisitRegistration}>
      <div>
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
          penColor='green'
          canvasProps={{width: 500, height: 200, style: {backgroundColor: 'white'}}}
          ref = {signatureCanvasRef}
        />
        <Button htmlType='submit'>Registruoti</Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>
      <SuccessMessage contextHolder={contextHolder}/>
    </Form>
  )
}

export default VisitingPersonsConfirmation