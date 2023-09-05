/* eslint-disable no-constant-condition */
/* eslint-disable max-len */
import { Avatar, Button, List }                 from 'antd'
import React                                    from 'react'
import { get }                                  from '../../Plugins/helpers'
import { useCookies }                           from 'react-cookie'
import { CollocationsType, CompaniesType }      from '../../types/globalTypes'
import { Link }                                 from 'react-router-dom'
import { PaginationAlign, PaginationPosition }  from 'antd/es/pagination/Pagination'
import CompanyAddition                          from '../../components/DLCJournalComponents/ClientCompanyListComponents/CompanyAdditionComponent/CompanyAddition'
import SubClientTag                             from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClientTag'

const CompaniesListPage = () => {
  const [loading, setLoading] =               React.useState(false)
  const [cookies] =                           useCookies(['access_token'])
  const [companies, setCompanies] =           React.useState<CompaniesType[]>([])
  const [isCompanyAdded, setIsCompanyAdded] = React.useState(false)
  const position: PaginationPosition =        'bottom'
  const align: PaginationAlign =              'center'
  const [collocations, setCollocations] =     React.useState<CollocationsType[]>()

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const allComapnies = await get('getCompanies', cookies.access_token)
        const collocations = await get('getCollocations', cookies.access_token)
        setCollocations(collocations.data[0].colocations)
        if(!allComapnies.error){
          setCompanies(allComapnies.data)
        }
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    })()
  },[isCompanyAdded])

  const companyRemoved = (id:string) => {
    let newCompaniesList = [...companies]
    newCompaniesList = newCompaniesList.filter(x => x?.id !== id)
    setCompanies(newCompaniesList)
  }

  const delteCompany = async(companyId: string) => {
    await get(`deleteCompany/${companyId}`, cookies.access_token)
    companyRemoved(companyId)
  }

  return (
    <div style={{width: '97%'}}>
      <CompanyAddition postUrl={'addCompany'} collocations={collocations} setIsCompanyAdded={setIsCompanyAdded} additionModalTitle={'Pridėkite įmonę'}/>
      <List
        loading={loading}
        pagination={{ position, align }}
        dataSource={companies}
        renderItem={(item) => {
          return(
            <List.Item
              style={{width: '100%'}}
              actions={[
                <Link key={item.id} to={`/SingleCompanyPage/${item.id}`}>peržiūrėti</Link>,
                <Button key={item.id} onClick={() => delteCompany(item.id)} type='link'>ištrinti</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={<img
                  src={`../CompanyLogos/${item.companyInfo.companyPhoto !== '' ? item.companyInfo.companyPhoto : 'noImage.jpg'}` }
                  alt='err' />}
                />}
                title={<Link to={`/SingleCompanyPage/${item.id}`}>{item.companyInfo.companyName}</Link>}
                description={item?.companyInfo?.companyDescription}
              />
              {item?.parentCompanyId ? <SubClientTag parentCompanyId={item.parentCompanyId}/> : ''}
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default CompaniesListPage