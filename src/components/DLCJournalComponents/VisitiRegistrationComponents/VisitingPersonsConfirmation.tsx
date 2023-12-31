/* eslint-disable max-len */
import React                    from 'react'
import { Card, Checkbox, Form } from 'antd'
import { get }                  from '../../../Plugins/helpers'
import { useCookies }           from 'react-cookie'
import { useSearchParams }      from 'react-router-dom'

type CollocationsType = {
  [key: string]: string[]
}

const CollocationsSelect = () => {
  const [cookies] =                                         useCookies(['access_token'])
  const [searchParams] =                                    useSearchParams()
  const companyId =                                         searchParams.get('companyId')
  const addressId =                                         searchParams.get('addressId')
  const [companiesColocations, setCompaniesCollocations] =  React.useState<CollocationsType[]>()

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany =     await get(`SingleCompanyPage/${companyId}`, cookies.access_token)
        if(addressId === 'J13'){
          setCompaniesCollocations(singleCompany?.data?.companyInfo?.J13)
        }else{
          setCompaniesCollocations(singleCompany?.data?.companyInfo?.T72)
        }
      }catch(err){
        console.log(err)
      }
    })()
  },[addressId])

  return (
    <div style={{display: 'flex', justifyContent: 'space-around', height: '100%'}}>
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
  )
}

export default CollocationsSelect