/* eslint-disable no-constant-condition */
/* eslint-disable max-len */
import { Avatar, Button, List }                 from 'antd'
import React                                    from 'react'
import { get }                                  from '../../Plugins/helpers'
import { useCookies }                           from 'react-cookie'
import { CompaniesType }                        from '../../types/globalTypes'
import { Link }                                 from 'react-router-dom'
import CompanyAddition                          from '../../components/companyAdditionComponent/CompanyAddition'
import { PaginationAlign, PaginationPosition }  from 'antd/es/pagination/Pagination'

const App: React.FC = () => {
  const [loading, setLoading] =               React.useState(false)
  const [cookies] =                           useCookies(['access_token'])
  const [companies, setCompanies] =           React.useState<CompaniesType[]>([])
  const [isCompanyAdded, setIsCompanyAdded] = React.useState(false)
  const position: PaginationPosition =        'bottom'
  const align: PaginationAlign =              'center'

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const allComapnies = await get('getCompanies', cookies.access_token)
        if(!allComapnies.error){
          setCompanies(allComapnies.data)
        }
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    })()
  },[isCompanyAdded])

  const company = companies?.map((el) => {
    return {
      title:       el.companyInfo.companyName,
      id:          el.id,
      photo:       el.companyInfo.companyPhoto,
      description: el.companyInfo.companyDescription,
    }
  })

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
      <CompanyAddition setIsCompanyAdded={setIsCompanyAdded}/>
      <List
        loading={loading}
        pagination={{ position, align }}
        dataSource={company}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link key={item.id} to={`/SingleCompanyPage/${item.id}`}>peržiūrėti</Link>,
              <Button key={item.id} onClick={() => delteCompany(item.id)} type='link'>ištrinti</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={<img
                src={`../CompanyLogos/${item.photo !== '' ? item.photo : 'noImage.jpg'}` }
                alt='err' />}
              />}
              title={<Link to={`/SingleCompanyPage/${item.id}`}>{item.title}</Link>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default App