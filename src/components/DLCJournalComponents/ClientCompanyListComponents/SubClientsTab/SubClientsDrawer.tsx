/* eslint-disable max-len */
import React                from 'react'

import {
  Drawer,
  Row,
  Col,
  Divider,
  Form,
  List,
  Tabs,
  TabsProps,
  message,
}                           from 'antd'

import { get }              from '../../../../Plugins/helpers'
import { useCookies }       from 'react-cookie'

import {
  EmployeesType,
}                           from '../../../../types/globalTypes'

import { useForm }          from 'antd/es/form/Form'
import EmployeesListItem    from '../ClientsEmployeesTab/EmployeesListItem'

import {
  useAppDispatch,
  useAppSelector,
}                           from '../../../../store/hooks'

import {
  setCompanyId,
  setSiteId,
  setSubClient,
}                           from '../../../../auth/SingleCompanyReducer/subClientsReducer'

import { useSearchParams }  from 'react-router-dom'
import SubClientsRacks      from '../ClientsCollocationsTab/SubClientsRacks'
import SuccessMessage from '../../../UniversalComponents/SuccessMessage'

type SubClientsDrawerProps = {
    onClose:      () => void;
    open:         boolean;
    subClientId:  string | null;
}
interface DescriptionItemProps {
    title:        string;
    content:      React.ReactNode;
    formItemName: string | undefined;
    initialValue: string | number | undefined;
}

const SubClientsDrawer = ({open, subClientId, onClose}:SubClientsDrawerProps) => {
  const [cookies]                                   = useCookies()
  const [subClientEmployees, setSubClientEmployees] = React.useState<EmployeesType[]>()
  const [form]                                      = useForm()
  const sites                                       = useAppSelector((state) => state.singleCompany.fullSiteData)
  const dispatch                                    = useAppDispatch()
  const [searchParams, setSearchParams]             = useSearchParams()
  const tabKey                                      = searchParams.get('tabKey')
  const siteId                                      = searchParams.get('siteId')
  const subClient                                   = useAppSelector((state) => state.subClient.subClient)
  const [messageApi, contextHolder]                 = message.useMessage()

  const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
    <Row>
      <Col span={12}>
        <div style={{width: '250px', display: 'flex', justifyContent: 'space-between', padding: '5px'}}>
          <p className='site-description-item-profile-p-label'>{title}: {content}</p>
        </div>
      </Col>
    </Row>
  )

  React.useEffect(() => {
    (async () => {
      try{
        const subClientRes      = await get(`company/company?id=${subClientId}`, cookies.access_token)
        const companyEmployees  = await get(`company/CompanyEmployee?companyId=${subClientId}&limit=10&page=1`, cookies.access_token)
        setSubClientEmployees(companyEmployees)
        if(subClientId){
          dispatch(setCompanyId(subClientId))
          dispatch(setSubClient(subClientRes))
        }
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    })()
  },[open])

  const items: TabsProps['items'] = sites?.map((site) => ({
    key:      site._id,
    label:    site.name,
    children: <SubClientsRacks site={site}/>,
  }))

  const changeTab = (key: string) => {
    setSearchParams(`?siteId=${key}&tabKey=${tabKey}&subClientId=${subClientId}`)
    dispatch(setSiteId(key))
  }

  return(
    <Drawer width={640} placement='right' closable={false} onClose={onClose} open={open}>
      <Divider >Imonės Profilis</Divider>
      <Form form={form}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
          <a href={`/DLC Žurnalas/Įmonių_Sąrašas/${subClientId}`}>Pilnas Profilis</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px'}}>
          <div>
            <Col span={12}>
              <img
                style={{width: '100px'}}
                src={subClient?.photo ? subClient?.photo : '../../CompanyLogos/noImage.jpg'}
                alt='err' />
            </Col>
          </div>
          <div>
            <DescriptionItem
              title='Įmonės pavadinimas'
              content={subClient?.name}
              formItemName={'name'}
              initialValue={subClient?.name}
            />
            <DescriptionItem
              title='Įmonės aprašas'
              content={subClient?.description}
              formItemName={'description'}
              initialValue={subClient?.description}
            />
            <DescriptionItem
              title='Įmonės kodas'
              content={subClient?.companyCode}
              formItemName={'companyCode'}
              initialValue={subClient?.companyCode}
            />
          </div>
        </div>
        <Divider >Kolokacijos</Divider>
        <Tabs onTabClick={changeTab} activeKey={siteId ? siteId : undefined } items={items} />
      </Form>
      <Divider >Darbuotojai</Divider>
      <List
        dataSource={subClientEmployees}
        bordered
        renderItem={(item: EmployeesType) => (
          <EmployeesListItem id={item._id}
            description={item.occupation}
            title={`${item.name} ${item.lastname}`}
            photosFolder={'../ClientsEmployeesPhotos'}
            altImage={'noUserImage.jpeg'}
            item={item}
          />
        )}
      />
      <SuccessMessage contextHolder={contextHolder}/>
    </Drawer>
  )
}

export default SubClientsDrawer