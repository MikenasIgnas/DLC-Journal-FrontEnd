/* eslint-disable max-len */
import React                from 'react'
import { useCookies }       from 'react-cookie'
import { get }              from '../../Plugins/helpers'
import { Avatar, List }     from 'antd'
import VisitListItemTitle   from '../../components/DLCJournalComponents/VisitHistoryComponents/VisitListItemTitle'
import { useNavigate } from 'react-router-dom'

type VisitsType = {
    id: string;
    visitGoal: {
        visitPurpose: string;
    }
    visitInfo: {
      visitingClient: string;
      visitAddress: string;
        premises: string;
        colocation: string;
        clientsEmployees:string;
        dlcEmployees: string;
    }
    visitorsId: {
        visitorsIdType: string;
        signature: string;
    }
}

const VisitsPage = () => {
  const [cookies] =             useCookies(['access_token'])
  const [loading, setLoading] = React.useState(false)
  const [visits, setVisits] =   React.useState<VisitsType[]>()
  const navigate =              useNavigate()

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const visits = await get('getVisits', cookies.access_token)
        console.log(visits.data)
        setVisits(visits.data)
        setLoading(false)
      }catch(err){
        console.log(err)
      }

    })()
  }, [])

  return (
    <div style={{width: '100%', padding: '10px', cursor: 'pointer'}} >
      {/* <List
        loading={loading}
        dataSource={visits}
        renderItem={(item, index) => (
          <List.Item onClick={() => navigate(`/SingleVisitPage/${item.id}`)} className='VisitListItem'>
            <List.Item.Meta
              style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              avatar={
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div>{item.id}</div>
                  <Avatar src={<img src={`Images/companyLogo${index}.png`} alt='err' />} />
                </div>
              }
              title={<VisitListItemTitle visitorsName = {item.visitInfo.employee} itemId={item.id} title={item.visitInfo.company}/>}
            />
          </List.Item>
        )}
      /> */}
      <List
        size='large'
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={visits}
        renderItem={(item) => <List.Item>{item?.visitInfo?.visitingClient}</List.Item>}
      />
    </div>
  )
}

export default VisitsPage