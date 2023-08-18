/* eslint-disable max-len */
import { Avatar, Button, List }   from 'antd'
import React              from 'react'
import { get }            from '../../Plugins/helpers'
import { useCookies }     from 'react-cookie'
import { CompaniesType }  from '../../types/globalTypes'
import { Link }           from 'react-router-dom'
import CompanyAddition    from '../../components/companyAdditionComponent/CompanyAddition'

type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';

const App: React.FC = () => {
  const [position, setPosition] =             React.useState<PaginationPosition>('bottom')
  const [align, setAlign] =                   React.useState<PaginationAlign>('center')
  const [loading, setLoading] =               React.useState(false)
  const [cookies] =                           useCookies(['access_token'])
  const [companies, setCompanies] =           React.useState<CompaniesType[]>([])
  const [isCompanyAdded, setIsCompanyAdded] = React.useState(false)

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

  const companyTitle = companies?.map((el) => {
    return {title: el.companyInfo.companyName, id: el.id, photo: el.companyInfo.companyPhoto, description: el.companyInfo.companyDescription}
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
        dataSource={companyTitle}
        renderItem={(item) => {

          console.log(item)
          return(
            <List.Item
              actions={[
                <Link key={item.id} to={`/SingleCompanyPage/${item.id}`}>peržiūrėti</Link>,
                <Button key={item.id} onClick={() => delteCompany(item.id)} type='link'>ištrinti</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={<img src={`../CompanyLogos/${item.title}Logo${item.id}.jpeg`} alt='err' />} />}
                title={<Link to={`/SingleCompanyPage/${item.id}`}>{item.title}</Link>}
                description={item.description}
              />
            </List.Item>
          )
        }
        }
      />
    </div>
  )
}

export default App