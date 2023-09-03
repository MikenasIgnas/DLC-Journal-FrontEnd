/* eslint-disable max-len */
import { Drawer, Row, Col, Divider, Button, List, Avatar } from 'antd'
import React from 'react'
import { get } from '../../../Plugins/helpers'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { CompaniesType, EmployeesType } from '../../../types/globalTypes'
import ColocationDisplay from './ColocationDisplay'
import EmployeesAdditionModal from './EmployeeAdditionModal'

type SubClientsDrawerProps = {
    onClose:        () => void
    setOpen:        React.Dispatch<React.SetStateAction<boolean>>
    open:           boolean
}

interface DescriptionItemProps {
    title:            string;
    content:          React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div style={{width: '250px', display: 'flex', justifyContent: 'space-between', padding: '5px'}}>
    <p className='site-description-item-profile-p-label'>{title}:</p>
    <p>{content}</p>
  </div>
)

const SubClientsDrawer = ({onClose, open, setOpen}:SubClientsDrawerProps) => {
  const [subClient, setSubClient] = React.useState<CompaniesType>()
  const [searchParams] =            useSearchParams()
  const subClientId =               searchParams.get('subClientId')
  const [cookies] =                 useCookies()
  const {id} =                      useParams()
  const [isSubClientEmployeeModalOpen, setIsSubClientEmployeeModalOpen] = React.useState(false)
  const [subClientEmployees, setSubClientEmployees] = React.useState<EmployeesType[]>()
  React.useEffect(() => {
    (async () => {
      try{
        const res  = await get(`getSubClients?parentCompanyId=${id}&subClientId=${subClientId}`, cookies.access_token)
        const res2 = await get(`getSubClientsEmployees?parentCompanyId=${id}&subClientId=${subClientId}`, cookies.access_token)
        setSubClient(res.data[0])
        setSubClientEmployees(res2.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[])
  return(
    <Drawer width={640} placement='right' closable={false} onClose={onClose} open={open}>
      <p className='site-description-item-profile-p' style={{ marginBottom: 24 }}>
          Imonės Profilis
      </p>
      <p className='site-description-item-profile-p'>Imonės Duomenys</p>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Button type='link'>Edit</Button>
        <a href={`/SingleCompanyPage/${subClientId}`}>Pilnas Profilis</a>
      </div>
      <Button onClick={() => setIsSubClientEmployeeModalOpen(true)}>Pridėti darbuotoją</Button>
      {isSubClientEmployeeModalOpen &&
        <EmployeesAdditionModal
          companyName={subClient?.companyInfo?.companyName}
          companyId={subClient?.id}
          setIsModalOpen={setIsSubClientEmployeeModalOpen}
          urlPath={`addSubClientsEmployee?subClientId=${subClient?.id}`}
        />}
      <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px'}}>
        <div>
          <Col span={12}>
            <img
              style={{width: '100px'}}
              src={`../CompanyLogos/${subClient?.companyInfo?.companyPhoto ? subClient?.companyInfo?.companyPhoto : 'noImage.jpg'}`}
              alt='err' />
          </Col>
        </div>
        <div>
          <Row>
            <Col span={12}>
              <DescriptionItem title='Įmonės pavadinimas' content={subClient?.companyInfo?.companyName} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title='Įmonės aprašas' content={subClient?.companyInfo.companyDescription} />
            </Col>
          </Row>
        </div>
      </div>
      <Divider />
      <p className='site-description-item-profile-p'>Kolokacijos</p>
      <div style={{display: 'flex'}}>
        <ColocationDisplay locationName={'J13'} locationData={subClient?.companyInfo.J13}/>
        <ColocationDisplay locationName={' T72'} locationData={subClient?.companyInfo.T72}/>
      </div>
      <Divider />
      <p className='site-description-item-profile-p'>Darbuotojai</p>
      <List
        dataSource={subClientEmployees}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.employeeId}
            actions={[
              <Button type='link' key={item.employeeId}>
              Peržiūrėti
              </Button>,
              <Button type='link' key={item.employeeId}>
                  Ištrinti
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src={
                  <img
                    src={`../ClientsEmployeesPhotos/${item.employeePhoto ? item.employeePhoto: 'noUserImage.jpeg'}`}
                    alt='err' />}
                />}
              title={`${item.name} ${item.lastName}`}
              description={item.occupation}
            />
          </List.Item>
        )}
      />
    </Drawer>
  )
}

export default SubClientsDrawer