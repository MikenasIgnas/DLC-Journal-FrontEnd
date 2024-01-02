/* eslint-disable max-len */
import React                from 'react'
import { Tag }              from 'antd'
import { CompanyInfoType }  from '../../../../types/globalTypes'
import { Link }             from 'react-router-dom'
import useFetch             from '../../../../customHooks/useFetch'

type SubClientTagProps = {
    parentCompanyId: number;
}
type CompaniesType = {
  data:{
    _id: string;
    id: number;
    parentCompanyId?: number | undefined;
    wasMainClient?: boolean | undefined;
    companyInfo: CompanyInfoType;
  }
}
const SubClientTag = ({parentCompanyId}:SubClientTagProps ) => {
  const parentCompany = useFetch<CompaniesType>(`getSingleCompany?companyId=${parentCompanyId}`)
  const companyName = parentCompany?.data?.companyInfo.companyName
  return(
    <Tag color='green'><Link to={`/getSingleCompany?companyId=${parentCompanyId}`}>Pagrindinis Klientas: {companyName}</Link></Tag>
  )
}

export default SubClientTag