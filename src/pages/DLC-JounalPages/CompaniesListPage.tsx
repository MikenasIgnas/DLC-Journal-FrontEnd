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
  const [position, setPosition] =   React.useState<PaginationPosition>('bottom')
  const [align, setAlign] =         React.useState<PaginationAlign>('center')
  const [loading, setLoading] =     React.useState(false)
  const [cookies] =                 useCookies(['access_token'])
  const [companies, setCompanies] = React.useState<CompaniesType[]>()

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
  },[])

  const companyTitle = companies?.map((el) => {
    return {title: el.CompanyName, id: el.id}
  })

  return (
    <div style={{width: '100%'}}>
      <CompanyAddition/>
      <List
        loading={loading}
        pagination={{ position, align }}
        dataSource={companyTitle}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src={<img src={`Images/companyLogo${index}.png`} alt='err' />} />
              }
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