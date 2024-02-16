/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                from 'react'

import {
  ClientsGuests,
  CollocationType,
  EmployeesType,
  VisitsType,
}
  from '../types/globalTypes'

import { useCookies }       from 'react-cookie'
import { useParams }        from 'react-router'
import { get }              from './helpers'
import { useSearchParams }  from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

const useSetSingleVisitData = () => {
  const [clientsGuests, setClientsGuests]                     = React.useState<ClientsGuests[]>([])
  const [carPlates, setCarPlates]                             = React.useState<string[]>([])
  const [cookies]                                             = useCookies(['access_token'])
  const [visitData, setVisitData]                             = React.useState<VisitsType[]>()
  const [companiesColocations, setCompaniesCollocations]      = React.useState<CollocationType[]>()
  const [updatedTransformedArray, setUpdatedTransformedArray] = React.useState<CollocationType[]>()
  const {id}                                                  = useParams()
  const [searchParams]                                        = useSearchParams()
  const visitAddress                                          = searchParams.get('visitAddress')
  const [clientsEmployees, setClientsEmployees]               = React.useState<EmployeesType[]>()
  const [selectedVisitors, setSelectedVisitors]               = React.useState<number[]>([])
  const editVisitInformation                                  = useAppSelector((state) => state.visitPageEdits.editVisitInformation)
  const editVisitors                                          = useAppSelector((state) => state.visitPageEdits.editVisitors)
  const editCollocations                                      = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const fetchData = async () => {
    try {
      const singleVisit   = await get(`getSingleVisit?visitId=${id}`, cookies.access_token)
      setVisitData(singleVisit.data)
      setCarPlates(singleVisit.data[0]?.carPlates)
      setClientsGuests(singleVisit.data[0]?.clientsGuests)
      const companyId = singleVisit.data[0]?.companyId
      const singleCompany = await get(`getSingleCompany?companyId=${companyId}`, cookies.access_token)
      const updatedArray: CollocationType[] = (Object.entries(singleVisit.data?.[0]?.visitCollocation || {}) as [string, string[]][])
        .map(([key, value]) => ({
          [key]: value,
        }))
      setUpdatedTransformedArray(updatedArray)
      if(visitAddress === 'J13'){
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.J13)
      }else{
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.T72)
      }
      const companiesEmployees =  await get(`getAllClientsEmployees?companyId=${companyId}`, cookies.access_token)
      const filteredArray = companiesEmployees.data.filter((visitor: any) =>
        !singleVisit.data[0].visitors.some(
          (filterItem: any) =>
            filterItem.selectedVisitor.employeeId === visitor.employeeId
        )
      )
      setClientsEmployees(filteredArray)
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [open, selectedVisitors, visitAddress, editVisitors, editVisitInformation, editCollocations])

  return {
    visitData,
    setVisitData,
    clientsEmployees,
    companiesColocations,
    updatedTransformedArray,
    clientsGuests,
    setClientsGuests,
    carPlates,
    setCarPlates,
    setSelectedVisitors,
    fetchData,
    selectedVisitors,
    id,
    cookies,
  }
}

export default useSetSingleVisitData