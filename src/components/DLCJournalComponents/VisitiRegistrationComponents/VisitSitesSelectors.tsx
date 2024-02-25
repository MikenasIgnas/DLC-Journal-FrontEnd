/* eslint-disable max-len */
import {
  DatePicker,
  Form,
  Select,
  message,
}                                   from 'antd'

import VisitRegistrationFormItem    from './VisitRegistrationSelect'
import { useSearchParams }          from 'react-router-dom'
import { get, post }                from '../../../Plugins/helpers'
import { useCookies }               from 'react-cookie'

import {
  useAppDispatch,
  useAppSelector,
}                                   from '../../../store/hooks'

import {
  setCompanyEmployees,
  setCompanyId,
  setSiteId,
  setVisit,
}                                   from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'

import { selectSite }               from '../../../auth/SitesReducer/selectors'
import { VisitsType }               from '../../../types/globalTypes'
import SuccessMessage from '../../UniversalComponents/SuccessMessage'

const VisitSitesSelectors = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cookies]                       = useCookies(['access_token'])
  const companyId                       = searchParams.get('companyId')
  const visitId                         = searchParams.get('_id')
  const dispatch                        = useAppDispatch()
  const companies                       = useAppSelector((state) => state.visit.companies)
  const sites                           = useAppSelector((state) => state.sites.fullSiteData)
  const seletedSite                     = useAppSelector(selectSite)
  const visitStatus                     = useAppSelector((state) => state.visit.visitStatus).filter((el) => el.name === 'Paruoštas')
  const form                            = Form.useFormInstance<VisitsType>()
  const companyNames                    = companies?.map((el) => ({value: el._id, label: el.name}))
  const addressesOptions                = sites?.map((el) => ({value: el._id, label: el.name}))
  const [messageApi, contextHolder]     = message.useMessage()

  const selectCompany = async(value: string) => {
    try{
      const companiesEmployees = await get(`company/CompanyEmployee?companyId=${value}`, cookies.access_token)
      setSearchParams(`companyId=${value}`)
      dispatch(setCompanyId(value))
      dispatch(setSiteId(undefined))
      dispatch(setCompanyEmployees(companiesEmployees))
      localStorage.removeItem('visitPurpose')
      form.setFieldValue('siteId', null)
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  const selectAddress = async(siteId: string) => {
    const companyId = searchParams.get('companyId')
    try{
      if(!visitId && siteId && companyId){
        const res = await post('visit/visit',
          { companyId:    companyId,
            permissions:  [],
            racks:        [],
            visitPurpose: [],
            siteId:       siteId,
            statusId:     visitStatus?.[0]?._id,
          }, cookies .access_token)
        setSearchParams(`?companyId=${companyId}&siteId=${siteId}&_id=${res._id}`)
        dispatch(setSiteId(siteId))
        dispatch(setVisit(res))
      }else{
        setSearchParams(`?companyId=${companyId}&siteId=${siteId}&_id=${visitId}`)
      }
    }catch(error){
      if (error instanceof Error) {
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  return (
    <div className='VisitRegistrationFormContainer'>
      <Form.Item
        className='VisitRegistrationFormItem'
        name='visitingClient'
        rules={[{ required: true, message: 'Būtina pasirinkti įmonę' }]}
      >
        <Select
          showSearch
          placeholder='Pasirinkite įmonę'
          onSelect={selectCompany}
          allowClear
          optionFilterProp='children'
          filterOption={(input, option) => (option?.label?.toLowerCase() ?? '').includes(input?.toLowerCase())}
          options={companyNames}
        >
        </Select>
      </Form.Item>
      {companyId &&
      <VisitRegistrationFormItem
        formItemName={'siteId'}
        placeholder={'Pasirinkite Adresą'}
        slectOptions={addressesOptions}
        onSelect={selectAddress}
        fieldValue={'visitingClient'}
        updateValue={(prevValues, currentValues) => prevValues.visitingClient !== currentValues.visitingClient}
        validationMessage={'Butina pasirinkti adresą'}
      />
      }
      {companyId && seletedSite?.name === 'T72' &&
    <Form.Item
      name='scheduledVisitTime'
      style={{width: '100%'}}
      rules={[{ required: true, message: 'Iveskite atvykimo datą' }]}
    >
      <DatePicker placeholder={'Planuojama vizito data/laikas'} style={{width: '100%'}} showTime />
    </Form.Item>
      }
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default VisitSitesSelectors