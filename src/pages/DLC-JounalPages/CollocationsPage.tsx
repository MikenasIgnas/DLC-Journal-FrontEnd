/* eslint-disable max-len */
import React                                from 'react'
import { useCookies }                       from 'react-cookie'
import { get }                              from '../../Plugins/helpers'
import { CollocationsType, CompaniesType }  from '../../types/globalTypes'
import { Card, Collapse, List }             from 'antd'

const CollocationsPage = () => {
  const [cookies] = useCookies(['access_token'])
  const [allCollocations, setAllCollocations] = React.useState<CollocationsType[]>()
  const [allCompanies, setAllCompanies]       = React.useState<CompaniesType[]>()
  React.useEffect(() => {
    (async () => {
      try{
        const companies = await get('getCompanies', cookies.access_token)
        const collocations = await get('getCollocations', cookies.access_token)
        setAllCollocations(collocations.data[0].colocations)
        setAllCompanies(companies.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  return (
    <div style={{display: 'flex', width: '100%'}}>
      {allCollocations?.map((el) =>
        <Card title={el.site} style={{width: '50%'}} key={el.id}>
          <List
            bordered
            dataSource={el.premises}
            renderItem={(item, i) => (
              <Collapse items={[{
                key:      i,
                label:    item.premiseName,
                children: <List dataSource={item.racks} renderItem={(item) => (<List.Item>{item}</List.Item>)}/>,
              }]} />
            )}
          />
        </Card>
      )}
    </div>
  )
}

export default CollocationsPage