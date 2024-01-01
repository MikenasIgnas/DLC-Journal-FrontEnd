/* eslint-disable max-len */
import React                                        from 'react'
import { calculateTimeDifference }                  from '../../../Plugins/helpers'
import { Badge, ConfigProvider, Form, Select, Tag } from 'antd'
import type { DescriptionsProps }                   from 'antd'
import VisitDateItem                                from '../SingleVisitPageComponents/VisitDateItem'
import { UserType, VisitsType }                     from '../../../types/globalTypes'
import { Link, useSearchParams }                          from 'react-router-dom'
import { addresses }                                from './StaticSelectOptions'

const VisitInformationItems = (visitData: VisitsType[] | undefined, edit: boolean, dlcEmployees: UserType[] | undefined ) => {
  const [, setSearchParams] = useSearchParams()

  const DLCEmployees = dlcEmployees?.map((el) => {
    return {...el, value: el.name, label: el.name}
  })

  const changeAddress = async(value:string) => {
    setSearchParams(`visitAddress=${value}`)
  }

  const getUniquePermissions = () => {
    const filteredVisits: string[] = []
    visitData?.[0].visitors?.map(( {selectedVisitor: { permissions }} ) => {
      permissions.map(item => {
        if (!filteredVisits.includes(item) && item !== 'Įleisti Trečius asmenis' ) {
          filteredVisits.push(item)
        }
      })
    })
    const mapped = filteredVisits.map((el) => ({value: el, label: el}))
    return mapped
  }

  const items: DescriptionsProps['items'] = [
    {
      key:      '1',
      label:    'Statusas',
      children: <ConfigProvider theme ={{
        components: {
          Badge: {
            statusSize: 12,
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
      children: <Link to={`/DLC Žurnalas/Įmonių_Sąrašas/${visitData?.[0]?.companyId}`}>{visitData?.[0]?.visitingClient}</Link>,
    },
    {
      key:      '3',
      label:    'Adresas',
      children: <div>
        {!edit ?
          <div>{visitData?.[0].visitAddress}</div> :
          <Form.Item name='visitAddress' initialValue={visitData?.[0].visitAddress}>
            <Select onChange={changeAddress} value={visitData?.[0].visitAddress} style={{width: '150px'}} options={addresses}/>
          </Form.Item>
        }
      </div>,
    },
    {
      key:      '4',
      label:    'Sukūrimo data',
      children: `${visitData?.[0].creationDate} ${visitData?.[0].creationTime}`,
    },
    {
      key:      '5',
      label:    'Pradžios laikas',
      children: <VisitDateItem dateFormItemName='startDate' timeFormItemName='startTime' edit={edit} date={visitData?.[0]?.startDate} time={visitData?.[0]?.startTime}/>,

    },
    {
      key:      '6',
      label:    'Pabaigos laikas',
      children: <VisitDateItem dateFormItemName='endDate' timeFormItemName='endTime' edit={edit} date={visitData?.[0]?.endDate} time={visitData?.[0]?.endTime}/>,
    },
    {
      key:   '7',
      label: 'Lydintis asmuo',
      children:
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {!edit ?
              <div>{visitData?.[0].dlcEmployees}</div> :
              <Form.Item name='dlcEmployees' initialValue={visitData?.[0].dlcEmployees}>
                <Select
                  value={visitData?.[0].dlcEmployees}
                  style={{width: '200px'}}
                  options={DLCEmployees}/>
              </Form.Item>
            }
          </div>,
    },
    {
      key:      '8',
      label:    'Vizito tikslas',
      children: <div>
        {!edit ?
          <div>{visitData?.[0]?.visitPurpose?.map((el, i) => <Tag key={i}>{el}</Tag>)}</div> :
          <Form.Item name='visitPurpose' initialValue={visitData?.[0]?.visitPurpose}>
            <Select
              mode='multiple'
              style={{width: '250px'}}
              value={visitData?.[0]?.visitPurpose}
              options={getUniquePermissions()}
            />
          </Form.Item>
        }
      </div>,
    },
    {
      key:      '9',
      label:    'Užtrukta',
      children: <div>{calculateTimeDifference(visitData?.[0]?.startDate, visitData?.[0]?.startTime, visitData?.[0]?.endDate, visitData?.[0]?.endTime)}</div>,
    },
  ]

  return items
}

export default VisitInformationItems