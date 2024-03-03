/* eslint-disable max-len */
import { Tag }            from 'antd'
import { Link }           from 'react-router-dom'
import { CompaniesType }  from '../../../../types/globalTypes'
import useFetch           from '../../../../customHooks/useFetch'

type SubClientTagProps = {
    parentCompanyId:  string;
}

const SubClientTag = ({parentCompanyId}:SubClientTagProps ) => {
  const parentCompany = useFetch<CompaniesType>(`company/company?id=${parentCompanyId}`)
  return(
    <>
      {parentCompany &&
      <Tag color='green'>
        <Link to={`/DLC Žurnalas/Įmonių_Sąrašas/${parentCompanyId}`}>Pagrindinis Klientas:
          {parentCompany?.name}
        </Link>
      </Tag>
      }
    </>
  )
}

export default SubClientTag