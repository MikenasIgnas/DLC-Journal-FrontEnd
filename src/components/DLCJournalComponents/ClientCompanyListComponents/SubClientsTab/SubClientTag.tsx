/* eslint-disable max-len */
import { Tag }  from 'antd'
import { Link } from 'react-router-dom'

type SubClientTagProps = {
    parentCompanyId:  number;
    companyName:      string | undefined;
}

const SubClientTag = ({parentCompanyId, companyName}:SubClientTagProps ) => {
  return(
    <Tag color='green'><Link to={`/getSingleCompany?companyId=${parentCompanyId}`}>Pagrindinis Klientas: {companyName}</Link></Tag>
  )
}

export default SubClientTag