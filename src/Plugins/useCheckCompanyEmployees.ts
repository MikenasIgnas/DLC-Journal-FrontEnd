import { Form } from 'antd'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { VisitorsType } from '../types/globalTypes'

const useCheckCompanyEmployees = () => {
  const form                      = Form.useFormInstance()
  const visitors: VisitorsType[]  = form.getFieldValue('visitors')
  const [searchParams]            = useSearchParams()
  const companyId                 = searchParams.get('companyId')
  const [isCompaniesEmployees, setIsCompaniesEmployees] = React.useState<boolean | null>(null)
  React.useEffect(() => {
    visitors?.map(el => {
      if(el.selectedVisitor.companyId !== companyId){
        setIsCompaniesEmployees(false)
      }else{
        setIsCompaniesEmployees(true)
      }
    })
  },[companyId])

  return isCompaniesEmployees
}

export default useCheckCompanyEmployees