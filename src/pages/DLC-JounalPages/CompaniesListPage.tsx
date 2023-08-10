/* eslint-disable max-len */
import { Avatar, List }   from 'antd'
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
  const [companies, setCompanies] =           React.useState<CompaniesType[]>()
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
    return {title: el.companyInfo.companyName, id: el.id, photo: el.companyInfo.companyPhoto}
  })

  return (
    <div style={{width: '100%'}}>
      <CompanyAddition setIsCompanyAdded={setIsCompanyAdded}/>
      <List
        loading={loading}
        pagination={{ position, align }}
        dataSource={companyTitle}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={<img src={item.photo} alt='err' />} />}
              title={<Link to={`/SingleCompanyPage/${item.id}`}>{item.title}</Link>}
              description='Ant Design, a design language for background applications, is refined by Ant UED Team'
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default App