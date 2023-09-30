/* eslint-disable max-len */
import { Card } from 'antd'
import React from 'react'
import { EmployeesType } from '../../../types/globalTypes'
import { useCookies } from 'react-cookie'
import { get } from '../../../Plugins/helpers'
import { useSearchParams } from 'react-router-dom'


type VisitPurposeForm = {
    setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const VisitPurposeForm = ({setCurrent}: VisitPurposeForm) => {


  const [clientsEmployee, setClientsEmployee] = React.useState<EmployeesType>()
  const [cookies] = useCookies(['access_token'])
  const [searchParams] = useSearchParams()
  const companyId = searchParams.get('companyId')
  const employeeId = searchParams.get('employeeId')

  React.useEffect(() => {
    (async () => {
      const clientsEmployee =  await get(`getClientsEmployee?companyId=${companyId}&employeeId=${employeeId}`, cookies.access_token)
      setClientsEmployee(clientsEmployee.data)
    })()
  }, [])

  const handleCardClick = (value: string) => {
    const puppose = {
      visitPurpose: value,
    }
    localStorage.setItem('visitDetails2', JSON.stringify(puppose))
    setCurrent(2)
  }

  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between' }}>
      {clientsEmployee?.permissions.map((el, i) => <Card key={i} hoverable={true} onClick={() => handleCardClick(el)}>{el}</Card>)}
    </div>
  )
}

export default VisitPurposeForm