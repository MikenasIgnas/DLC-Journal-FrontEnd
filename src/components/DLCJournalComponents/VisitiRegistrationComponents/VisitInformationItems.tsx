/* eslint-disable max-len */
import { Badge, ConfigProvider, Form, Select, Tag }         from 'antd'
import type { DescriptionsProps }                           from 'antd'
import VisitDateItem                                        from '../SingleVisitPageComponents/VisitDateItem'

import {
  CompaniesType,
  Sites,
  VisitPurpose,
  VisitsType,
  Permissions,
  Visitors,
  VisitStatus,
}                                                           from '../../../types/globalTypes'

import { Link, useSearchParams }                            from 'react-router-dom'
import { useAppSelector }                                   from '../../../store/hooks'
import { calculateTimeDifference, convertUTCtoLocalDate, convertUTCtoLocalDateTime } from '../../../Plugins/helpers'

type StatusType = 'success' | 'processing' | 'error' | 'default' | 'warning' | undefined;

const VisitInformationItems = (
  visitData:    VisitsType | undefined,
  edit:         boolean,
  sites:        Sites[] | undefined,
  company:      CompaniesType | undefined,
  visitPurpose: VisitPurpose[],
  permissions:  Permissions[],
  visitors:     Visitors[],
  visitStatus:  VisitStatus | undefined
) => {
  const [, setSearchParams] = useSearchParams()
  const logedInUser         = useAppSelector((state) => state.auth.name)
  const addresses           = sites?.map((el) => ({value: el._id, label: el.name}))
  const [searchParams]      = useSearchParams()
  const addressId           = searchParams.get('visitAddress')
  const site                = sites?.filter((el) => el._id === addressId)
  const creationDate        = convertUTCtoLocalDate(visitData?.date)
  const creationTime        = convertUTCtoLocalDateTime(visitData?.date)
  const visitorsPermissions = visitors.map((el) => el.permissions)
  const combinedPermissions = visitorsPermissions.reduce((acc, current) => acc.concat(current), [])
  const employeePermissions = permissions.filter((el) => combinedPermissions.includes(el._id))

  const changeAddress = async(value:string) => {
    setSearchParams(`visitAddress=${value}`)
  }

  const getUniquePermissions = () => {
    const filteredVisits: Permissions[] = []
    employeePermissions?.forEach((permission) => {
      if (permission.name && !filteredVisits.some(p => p.name === permission.name) && permission.name !== 'Įleisti Trečius asmenis') {
        filteredVisits.push(permission)
      }
    })

    const mapped = filteredVisits.map((el) => ({ value: el._id, label: el.name }))
    return mapped
  }

  const statusMap: { [key: string]: StatusType } = {
    Pradėti:  'success',
    Paruošti: 'processing',
    Baigti:   'error',
  }
  const status = visitStatus && statusMap[visitStatus.name]
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
          status={status}
          text={
            visitStatus?.name
          }/>
      </ConfigProvider>,
    },
    {
      key:      '2',
      label:    'Įmonė',
      children: <Link to={`/DLC Žurnalas/Įmonių_Sąrašas/${company?._id}`}>{company?.name}</Link>,
    },
    {
      key:      '3',
      label:    'Adresas',
      children: <div>
        {!edit ?
          <div>{site?.[0]?.name}</div> :
          <Form.Item name='visitAddress' initialValue={site?.[0]?.name}>
            <Select onChange={changeAddress} value={site?.[0]?.name} style={{width: '150px'}} options={addresses}/>
          </Form.Item>
        }
      </div>,
    },
    {
      key:      '4',
      label:    'Sukūrimo data',
      children: `${creationDate} ${creationTime}`,
    },
    {
      key:      '5',
      label:    'Pradžios laikas',
      children: <VisitDateItem dateFormItemName='startDate' edit={edit} date={visitData?.startDate}/>,

    },
    {
      key:      '6',
      label:    'Pabaigos laikas',
      children: <VisitDateItem dateFormItemName='endDate' edit={edit} date={visitData?.endDate}/>,
    },
    {
      key:   '7',
      label: 'Lydintis asmuo',
      children:
            <div>{logedInUser}</div>,
    },
    {
      key:      '8',
      label:    'Vizito tikslas',
      children: <div>
        {!edit ?
          <div>{visitPurpose?.map((el, i) => <Tag key={i}>{el.name}</Tag>)}</div> :
          <Form.Item name='visitPurpose' initialValue={visitData?.visitPurpose}>
            <Select
              mode='multiple'
              style={{width: '250px'}}
              value={visitData?.visitPurpose}
              options={getUniquePermissions()}
            />
          </Form.Item>
        }
      </div>,
    },
    {
      key:      '9',
      label:    'Užtrukta',
      children: <div>{calculateTimeDifference(visitData?.startDate, visitData?.endDate)}</div>,
    },
  ]

  return items
}

export default VisitInformationItems