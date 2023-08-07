import React from 'react'
import { useCookies } from 'react-cookie'
import { get } from '../../Plugins/helpers'
import { useParams } from 'react-router-dom'
import { Card, Image } from 'antd'
type VisitsType = {
    id: string;
    visitGoal: {
        visitPurpose: string;
    }
    visitInfo: {
        company: string;
        location: string;
        premises: string;
        colocation: string;
        employee:string;
        DLCEmployee: string;
    }
    visitorsId: {
        visitorsIdType: string;
        signature: string;
    }
}
const SingleVisitPage = () => {
  const [singleVisitData, setSingleVisitData] = React.useState<VisitsType[]>()
  const [cookies] = useCookies(['access_token'])
  const {id} = useParams()
  React.useEffect(() => {
    (async () => {
      try{
        const visitData = await get(`getSingleVisit/${id}`, cookies.access_token)
        setSingleVisitData(visitData.data)
      }catch(err){
        console.log(err)
      }

    })()
  }, [])

  return (
    <Card title='Card title' bordered={false} style={{ width: 300 }}>
      {singleVisitData?.map((el) =>
        <div key={el.id}>
          <p>{el.visitGoal.visitPurpose}</p>
          <p>{el.visitInfo.DLCEmployee}</p>
          <p>{el.visitInfo.colocation}</p>
          <p>{el.visitInfo.company}</p>
          <p>{el.visitInfo.employee}</p>
          <p>{el.visitInfo.location}</p>
          <p>{el.visitInfo.premises}</p>
          <p>{el.visitorsId.visitorsIdType}</p>
          <Image
            width={200}
            src={el.visitorsId.signature}
          />
        </div>
      )}
    </Card>
  )
}

export default SingleVisitPage