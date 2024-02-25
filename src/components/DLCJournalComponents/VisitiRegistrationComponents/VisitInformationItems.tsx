/* eslint-disable max-len */
import {
  Badge,
  ConfigProvider,
  Form,
  Select,
  Tag,
}                                 from 'antd'

import type { DescriptionsProps } from 'antd'
import VisitDateItem              from '../SingleVisitPageComponents/VisitDateItem'

import {
  Link,
  useSearchParams,
}                                 from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
}                                 from '../../../store/hooks'

import {
  calculateTimeDifference,
  convertUTCtoLocalDate,
  convertUTCtoLocalDateTime,
}                                 from '../../../Plugins/helpers'

import {
  selectAllSelectedVisitorPermissions,
  selectCompany,
}                                 from '../../../auth/VisitorEmployeeReducer/selectors'
import statusMap                  from '../VisistPageComponents/visitStatusMap'
import { setSiteId }              from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'

const VisitInformationItems = ( edit: boolean) => {
  const [, setSearchParams]       = useSearchParams()
  const sites                     = useAppSelector((state) => state.sites.fullSiteData)
  const addresses                 = sites?.map((el) => ({value: el._id, label: el.name}))
  const [searchParams]            = useSearchParams()
  const visitData                 = useAppSelector((state) => state.visit.visit)
  const company                   = useAppSelector(selectCompany)
  const siteId                    = searchParams.get('siteId')
  const site                      = sites?.filter((el) => el._id === siteId)
  const creationDate              = convertUTCtoLocalDate(visitData?.date)
  const creationTime              = convertUTCtoLocalDateTime(visitData?.date)
  const permissions               = useAppSelector((state) => state.visit.permissions)
  const selectedVisitPurposes     = permissions.filter((el) => visitData?.visitPurpose.includes(el._id)).map((item) => ({value: item._id, label: item.name}))
  const visitStatuses             = useAppSelector((state) => state.visit.visitStatus)
  const preparedStatus            = visitStatuses.find((el) => el._id === visitData?.statusId)
  const dlcEmlpyee                = useAppSelector((state) => state.visit.dlcEmployee)
  const matchingPermissionsItems  =  useAppSelector(selectAllSelectedVisitorPermissions).map((el) => ({value: el._id, label: el.name}))
  const dispatch                  = useAppDispatch()

  const changeAddress = async(value:string) => {
    setSearchParams(`siteId=${value}&companyId=${visitData?.companyId}&_id=${visitData?._id}`)
    dispatch(setSiteId(value))
  }

  const status = preparedStatus && statusMap[preparedStatus.name]
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
        <Badge status={status} text={preparedStatus?.name}/>
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
          <Form.Item name='siteId' initialValue={site?.[0]?.name}>
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
            <div>{dlcEmlpyee?.name}</div>,
    },
    {
      key:   '8',
      label: 'Vizito tikslas',
      children:
      <div>
        {!edit ?
          <div>{selectedVisitPurposes?.map((el) => <Tag key={el.value}>{el.label}</Tag>)}</div> :
          <Form.Item name='visitPurpose' initialValue={visitData?.visitPurpose}>
            <Select
              mode='multiple'
              style={{width: '250px'}}
              value={visitData?.visitPurpose}
              options={matchingPermissionsItems}
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