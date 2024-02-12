/* eslint-disable max-len */
import { createSelector } from '@reduxjs/toolkit'
import { EmployeesType, Permissions, RootState, VisitorEmployee, Visitors } from '../../types/globalTypes'

const selectVisitAllCompanyEmployees  = (state: RootState) => state.visit.companyEmployees
const selectVisitVisitors             = (state: RootState) => state.visit.visitor
const selectVisitorPermissions        = (state: RootState) => state.visit.permissions

const filterNonVisitingEmployees = (companyEmployess: EmployeesType[], visitors: Visitors[]) => {
  const filteredCompanyEmployess = companyEmployess.filter((el) => !visitors.some((item) => item.employeeId === el._id))
  return filteredCompanyEmployess
}

const filterVisitingEmployees = (companyEmployess: EmployeesType[], visitors: Visitors[]) => {
  const filteredCompanyEmployess: VisitorEmployee[] = []
  for (let index = 0; index < visitors.length; index++) {
    const element = visitors[index]
    const employee = companyEmployess.find((el) => el._id === element.employeeId)
    if(employee){
      filteredCompanyEmployess.push({ ...element, employee})
    }
  }
  return filteredCompanyEmployess
}

const filterVisitorsPermissions = (permissions: Permissions[], companyEmployee?: EmployeesType) => {
  const filterdPermissions: Permissions[] = []
  if(companyEmployee){
    for (let index = 0; index < companyEmployee?.permissions?.length; index++) {
      const element = companyEmployee.permissions[index]
      const employeePermission = permissions?.find((el) => el._id === element)
      if(employeePermission){
        filterdPermissions.push(employeePermission)
      }
    }
  }
  return filterdPermissions
}

export const selectNonVisitingCompanyEmplyees = createSelector(
  [selectVisitAllCompanyEmployees, selectVisitVisitors],
  filterNonVisitingEmployees
)

export const selectVisitingCompanyEmplyees = createSelector(
  [selectVisitAllCompanyEmployees, selectVisitVisitors],
  filterVisitingEmployees
)

const findCompanyEmployee = (companyEmployees: EmployeesType[], id: string) => {
  const employee = companyEmployees.find((el) => el._id === id)
  return employee
}

export const selectCompanyEmployee = createSelector(
  [selectVisitAllCompanyEmployees, (_: RootState, id: string) => id],
  findCompanyEmployee
)

export const selectVisitorsPermissions = createSelector(
  [selectVisitorPermissions , selectCompanyEmployee],
  filterVisitorsPermissions
)


const filterAllSelectedVisitorsPermissions = (permission: Permissions[], companyEmployess: VisitorEmployee[]) => {
  const allEmployeePermissions: string[] = []

  for (let index = 0; index < companyEmployess?.length; index++) {
    const element = companyEmployess?.[index].employee.permissions
    element.map((el) => {
      if(!allEmployeePermissions.includes(el)){
        allEmployeePermissions.push(el)
      }
    })
  }



  const uniquePermissions:Permissions[] = []
  for (let index = 0; index < allEmployeePermissions?.length; index++) {
    const element = allEmployeePermissions?.[index]
    const result = permission.find((el) => el._id === element)
    if(result){
      uniquePermissions.push(result)
    }
  }

  return uniquePermissions
}


export const selectAllSelectedVisitorPermissions = createSelector(
  [selectVisitorPermissions , selectVisitingCompanyEmplyees],
  filterAllSelectedVisitorsPermissions
)

