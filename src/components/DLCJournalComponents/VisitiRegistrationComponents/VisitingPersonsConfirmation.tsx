/* eslint-disable max-len */
import React                                                from 'react'
import { Button, Card, Checkbox, Form, Select, message, theme }   from 'antd'
import { useForm }                                          from 'antd/es/form/Form'
import { get, getCurrentDate, getCurrentTime, post }                                        from '../../../Plugins/helpers'
import { useCookies }                                       from 'react-cookie'
import SignatureCanvas                                      from 'react-signature-canvas'
import { useNavigate, useSearchParams }                     from 'react-router-dom'
import SuccessMessage                                       from '../../UniversalComponents/SuccessMessage'

type VisitorsIdentificationType = {
  signature: string | undefined;
  visitorsIdType: string;
}

type CollocationsType = {
  [key: string]: string[]
}

type VisitingPersonsConfirmationProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const VisitingPersonsConfirmation = ({ setCurrent }: VisitingPersonsConfirmationProps) => {
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
  const { token } =                                         theme.useToken()

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany =     await get(`SingleCompanyPage/${companyId}`, cookies.access_token)
        if(addressId === 'J13'){
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
    const visitDetails =               localStorage.getItem('visitDetails')
    const selectedButtons =            localStorage.getItem('selectedButtons')
    const signatureImage =             signatureCanvasRef.current?.toDataURL()
    visitorsIdentification.signature = signatureImage

    if(visitDetails && selectedButtons){
      const visitationDetails = {
        visitStatus,
        ...JSON.parse(visitDetails),
        visitPurpose: JSON.parse(selectedButtons),
        ...visitorsIdentification,
        creationDate: getCurrentDate(),
        creationTime: getCurrentTime(),
      }

      messageApi.success({
        type:    'success',
        content: 'Išsaugota',
      })

      const res = await post('postVisitDetails', visitationDetails, cookies.access_token)
      console.log(res.data)
      localStorage.clear()
      if(!res.error){
        setTimeout(() =>{
          navigate(`/DLC Žurnalas/Vizitai/${res.data}`)
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

  const contentStyle: React.CSSProperties = {
    lineHeight:      '260px',
    textAlign:       'center',
    color:           token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius:    token.borderRadiusLG,
    border:          `1px dashed ${token.colorBorder}`,
    marginTop:       16,
  }

  const prevPage = () => {
    setCurrent(1)
  }
  return (
    <div style={contentStyle}>
      <Form
        form={form}
        onFinish={finishVisitRegistration}
        style={{backgroundColor: 'white', height: '88%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
          <div>
            <div style={{display: 'flex'}}>
              {companiesColocations?.map((el, i) => {
                const objEntries = Object.entries(el)
                return(
                  <Card style={{margin: '10px'}} key={i} title={objEntries[0][0]}>
                    <Form.Item name={['visitCollocation', objEntries[0][0]]}>
                      <Checkbox.Group options={objEntries[0][1]} key={i}/>
                    </Form.Item>
                  </Card>
                )})
              }
            </div>
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
              canvasProps={{width: 500, height: 200, style: {backgroundColor: '#f4f4f4'}}}
              ref = {signatureCanvasRef}
            />
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px'}}>
            <Button onClick={() => setVisitStatus('processing')} htmlType='submit'>Registruoti</Button>
            <Button onClick={handleClear}>Clear</Button>
            <Button onClick={prevPage}>Atgal</Button>
          </div>
        </div>
        <SuccessMessage contextHolder={contextHolder}/>
      </Form>
    </div>
  )
}

export default VisitingPersonsConfirmation