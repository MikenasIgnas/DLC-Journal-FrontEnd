/* eslint-disable max-len */
import React     from 'react'
import { Tag }  from 'antd'
import { get } from '../../../Plugins/helpers'
import { useCookies } from 'react-cookie'
import { CompaniesType } from '../../../types/globalTypes'
import { Link } from 'react-router-dom'

type SubClientTagProps = {
    parentCompanyId: string;
}

const SubClientTag = ({parentCompanyId}:SubClientTagProps ) => {
  const [parentCompany, setParentCompany] = React.useState<CompaniesType>()
  const [cookies] =                         useCookies()

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany = await get(`SingleCompanyPage/${parentCompanyId}`, cookies.access_token)
        setParentCompany(singleCompany.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  return(
    <Tag color='green'><Link to={`/SingleCompanyPage/${parentCompanyId}`}>Pagrindinis Klientas: {parentCompany?.companyInfo.companyName}</Link></Tag>
  )

}

export default SubClientTag