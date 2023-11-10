/* eslint-disable max-len */
// /* eslint-disable max-len */
import React                                    from 'react'
import { useParams }                            from 'react-router-dom'
import { Button, Image }                        from 'antd'
import { Badge, ConfigProvider, Descriptions }  from 'antd'
import type { DescriptionsProps }               from 'antd'
import { useCookies }                           from 'react-cookie'
import { get }                                  from '../../Plugins/helpers'

type CollocationType = {
  [key:string] :        string[]
}

type VisitStatusType = 'success' | 'processing' | 'error' | 'default' | 'warning' | undefined;

type VisitsType = {
    id:                 string;
    visitGoal:          string[];
    visitStatus:        VisitStatusType;
    visitInfo: {
      clientsEmployees: string;
      dlcEmployees:     string;
      visitAddress:     string;
      visitingClient:   string;
      escortNames:      string[];
    }
    visitorsId: {
      signature:        string;
      visitCollocation: CollocationType
      visitorsIdType:   string;
    }
}

const SingleVisitPage: React.FC = () => {
  const [cookies] =                     useCookies(['access_token'])
  const [visitData, setVisitData] =     React.useState<VisitsType[] | undefined>()
  const {id} =                          useParams()
  const [visitStatus, setVisitStatus] = React.useState<string | undefined>('')

  React.useEffect(() => {
    (async () => {
      try{
        const response = await get(`getSingleVisit/${id}`, cookies.access_token)
        setVisitData(response.data)
      }catch(err){
        console.log(err)
      }
    })()
  }, [visitStatus])

  const items: DescriptionsProps['items'] = [
    {
      key:      '1',
      label:    '',
      span:     4,
      children:
      <ConfigProvider theme ={{
        components: {
          Badge: {
            statusSize: 10,
          },
        },
      }}>
        <Badge
          status={visitData?.[0]?.visitStatus}
          text={
            visitData?.[0]?.visitStatus === 'success' && 'Pradėtas' ||
            visitData?.[0]?.visitStatus === 'processing' && 'Paruoštas' ||
            visitData?.[0]?.visitStatus === 'error' && 'Baigtas'
          }/>
      </ConfigProvider>,
    },
    {
      key:      '2',
      label:    'Įmonė',
      span:     2,
      children: visitData?.[0]?.visitInfo?.visitingClient,
    },
    {
      key:      '3',
      span:     2,
      label:    'Duomenų centras',
      children: visitData?.[0].visitInfo?.visitAddress === '1' ? 'J13' : 'T72',
    },
    {
      key:      '4',
      label:    'Atvykstantis asmuo',
      children: visitData?.[0]?.visitInfo?.clientsEmployees,
    },
    {
      key:      '5',
      label:    'Vizito tikslas',
      children: visitData?.[0]?.visitGoal?.map((el, i) => <div key={i}>{el}</div>),
    },
    {
      key:      '6',
      label:    'Palyda',
      span:     2,
      children: visitData?.[0]?.visitInfo?.escortNames?.map((el, i) => <div key={i}>{el}</div>),
    },
    {
      key:      '7',
      label:    'Dokumento tipas',
      children: visitData?.[0].visitorsId.visitorsIdType,
    },
    {
      key:      '8',
      label:    'Kolokacijos',
      children: <div>{Object.keys(visitData?.[0].visitorsId?.visitCollocation || {})?.map((key)=> (
        <div key={key}>
          <div>{key}</div>
          {visitData?.[0].visitorsId?.visitCollocation[key]?.map((value) => (
            <div key={value}>{value}</div>
          ))}
        </div>
      ))}</div>,
    },
    {
      key:      '9',
      label:    'Parašas',
      children: <Image width={200} src={visitData?.[0]?.visitorsId?.signature}/>,
    },
    {
      key:      '10',
      label:    'Lydintysis',
      children: visitData?.[0]?.visitInfo?.dlcEmployees,
    },
  ]

  const changeVisitsState = async(url: string) => {
    const res = await get(`${url}?visitId=${id}`, cookies.access_token)
    setVisitData(res.data)
    setVisitStatus(res.data[0].visitStatus)

  }

  return(
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Descriptions layout='vertical' bordered items={items} column={4}/>
      <div>
        <Button onClick={async () => changeVisitsState('startVisit')}>Pradėti vizitą</Button>
        <Button onClick={async () => changeVisitsState('prepareVisit')}>Paruošti vizitą vizitą</Button>
        <Button onClick={async () => changeVisitsState('endVisit')}>Baigti vizitą</Button>
      </div>
    </div>
  )
}

export default SingleVisitPage