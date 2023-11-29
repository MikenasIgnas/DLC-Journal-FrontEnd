/* eslint-disable max-len */
// /* eslint-disable max-len */
import React                                    from 'react'
import { useParams }                            from 'react-router-dom'
import { Button, Image }                        from 'antd'
import { Badge, ConfigProvider, Descriptions }  from 'antd'
import type { DescriptionsProps }               from 'antd'
import { useCookies }                           from 'react-cookie'
import { get }                                  from '../../Plugins/helpers'
import { EmployeesType } from '../../types/globalTypes'

type CollocationType = {
  [key:string] :        string[]
}

type VisitStatusType = 'success' | 'processing' | 'error' | 'default' | 'warning' | undefined;

type VisitorsType = {
 idType: string;
 selectedVisitor:EmployeesType
}


type VisitsType = {
    id:               string;
    visitPurpose:     string[];
    visitStatus:      VisitStatusType;
    visitors: VisitorsType[];
    dlcEmployees:     string;
    visitAddress:     string;
    visitingClient:   string;
    clientsGuests:      string[];
    carPlates:      string[];
    signature:        string;
    visitCollocation: CollocationType
    visitorsIdType:   string;
    creationDate:     string;
    creationTime:     string;
    startDate:        string;
    startTime:        string;
    endDate:          string;
    endTime:          string;
}

const SingleVisitPage = () => {
  const [cookies] = useCookies(['access_token'])
  const [visitData, setVisitData] = React.useState<VisitsType[] | undefined>(undefined)

  const items: DescriptionsProps['items'] = [
    {
      key:   '1',
      label: '',
      span:  4,
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
      children: visitData?.[0]?.visitingClient,
    },
    {
      key:      '3',
      span:     2,
      label:    'Duomenų centras',
      children: visitData?.[0]?.visitAddress === '1' ? 'J13' : 'T72',
    },
    {
      key:      '4',
      label:    'Atvykstantis asmuo',
      children: visitData?.[0]?.visitors?.map((el) => `${el?.selectedVisitor?.name} ${' '} ${el?.selectedVisitor?.lastName}`),
    },
    {
      key:      '5',
      label:    'Vizito tikslas',
      children: visitData?.[0]?.visitPurpose?.map((el, i) => <div key={i}>{el}</div>),
    },
    {
      key:      '6',
      label:    'Palyda',
      span:     2,
      children: visitData?.[0]?.clientsGuests?.map((el, i) => <div key={i}>{el}</div>),
    },
    {
      key:      '7',
      label:    'Dokumento tipas',
      children: visitData?.[0]?.visitors.map((el) => el.idType),
    },
    {
      key:      '8',
      label:    'Kolokacijos',
      children: <div>{Object.keys(visitData?.[0]?.visitCollocation || {})?.map((key)=> (
        <div key={key}>
          <div>{key}</div>
          {visitData?.[0]?.visitCollocation[key]?.map((value) => (
            <div key={value}>{value}</div>
          ))}
        </div>
      ))}</div>,
    },
    {
      key:      '9',
      label:    'Parašas',
      children: <Image width={200} src={visitData?.[0]?.signature}/>,
    },
    {
      key:      '10',
      label:    'Lydintysis',
      children: visitData?.[0]?.dlcEmployees,
    },
    {
      key:      '11',
      label:    'Sukūrimo Data',
      children: visitData?.[0]?.creationDate,
    },
    {
      key:      '12',
      label:    'Sukūrimo Laikas',
      children: visitData?.[0]?.creationTime,
    },
    {
      key:      '13',
      label:    'Pradžios Data',
      children: visitData?.[0]?.startDate,
    },
    {
      key:      '14',
      label:    'Pradžios Laikas',
      children: visitData?.[0]?.startTime,
    },
    {
      key:      '15',
      label:    'Pabaigos Data',
      children: visitData?.[0]?.endDate,
    },
    {
      key:      '16',
      label:    'Pabaigos Laikas',
      children: visitData?.[0]?.endTime,
    },
    {
      key:      '17',
      label:    'Automobilio Nr',
      children: visitData?.[0]?.carPlates,
    },
  ]
  const { id } =    useParams()
  const fetchData = async () => {
    try {
      const response = await get(`getSingleVisit/${id}`, cookies.access_token)
      setVisitData(response.data)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const changeVisitsState = async (url: string) => {
    try {
      const res = await get(`${url}?visitId=${id}`, cookies.access_token)
      setVisitData(res.data)
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
  }


  React.useEffect(() => {
    fetchData()
  }, [id])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
      <Descriptions layout='vertical' bordered items={items} column={4} />
      <div>
        {!visitData?.[0]?.startDate && !visitData?.[0]?.startTime && (
          <Button onClick={async () => { await changeVisitsState('startVisit'); fetchData() }}>Pradėti vizitą</Button>
        )}
        {visitData?.[0]?.startDate && visitData?.[0]?.startTime && (
          <Button onClick={async () => { await changeVisitsState('prepareVisit'); fetchData() }}>Paruošti vizitą</Button>
        )}
        {visitData?.[0]?.startDate && visitData?.[0]?.startTime && !visitData?.[0]?.endDate && !visitData?.[0]?.endTime && (
          <Button onClick={async () => { await changeVisitsState('endVisit'); fetchData() }}>Baigti vizitą</Button>
        )}
      </div>
    </div>
  )
}

export default SingleVisitPage