/* eslint-disable max-len */
import { Button }                           from 'antd'
import React                                from 'react'
import { EmployeesType }                    from '../../../types/globalTypes'
import { useSearchParams }                  from 'react-router-dom'
import { ToggleButtonGroup, ToggleButton }  from '@mui/material'
import useFetch                             from '../../../customHooks/useFetch'

type VisitPurposeForm = {
    setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const VisitPurposeForm = ({setCurrent}: VisitPurposeForm) => {
  const [searchParams] = useSearchParams()
  const companyId = searchParams.get('companyId')
  const employeeId = searchParams.get('employeeId')
  const clientsEmployee = useFetch<EmployeesType>(`getClientsEmployee?companyId=${companyId}&employeeId=${employeeId}`)
  const visitPurposeArray: string[] = []

  const handleCardClick = (value: string) => {
    visitPurposeArray.push(value)
    const puppose: { visitPurpose: string[] }  = {
      visitPurpose: visitPurposeArray,
    }
    const uniqueVisitPurpose = puppose.visitPurpose.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    const resultObject = {
      visitPurpose: uniqueVisitPurpose,
    }
  }
  const [alignment, setAlignment] = React.useState<string[]>([])

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string[],
  ) => {
    localStorage.setItem('visitDetails2', JSON.stringify(newAlignment))
    setAlignment(newAlignment)
  }
  const goNext = () => {
    setCurrent(2)
  }
  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between' }}>
      <ToggleButtonGroup
        color='primary'
        aria-label='Platform'
        value={alignment}
        onChange={handleChange}
      >
        {clientsEmployee?.permissions.map((el, i) => <ToggleButton key={i} value={el}>{el}</ToggleButton>)}
      </ToggleButtonGroup>
      <Button onClick={goNext}>Next</Button>
    </div>
  )
}

export default VisitPurposeForm