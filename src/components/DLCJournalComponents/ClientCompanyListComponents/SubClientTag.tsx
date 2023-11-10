/* eslint-disable max-len */
import React              from 'react'
import { Tag }            from 'antd'
import { CompaniesType }  from '../../../types/globalTypes'
import { Link }           from 'react-router-dom'
import useFetch           from '../../../customHooks/useFetch'

type SubClientTagProps = {
    parentCompanyId: string;
}

const SubClientTag = ({parentCompanyId}:SubClientTagProps ) => {
  const parentCompany = useFetch<CompaniesType>(`SingleCompanyPage/${parentCompanyId}`)
  return(
    <Tag color='green'><Link to={`/SingleCompanyPage/${parentCompanyId}`}>Pagrindinis Klientas: {parentCompany?.companyInfo.companyName}</Link></Tag>
  )
}

export default SubClientTag