/* eslint-disable max-len */
import { Drawer, Row, Col, Divider, Button, List, Avatar } from 'antd'
import React from 'react'
import { get } from '../../../Plugins/helpers'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { CompaniesType, EmployeesType, ModalStateType } from '../../../types/globalTypes'
import ColocationDisplay from './ColocationDisplay'
import EmployeesAdditionModal from './EmployeeAdditionModal'

type SubClientsDrawerProps = {
    onClose:        () => void;
    open:           boolean;
    subClientId:    string | null;
    setModalOpen:   React.Dispatch<React.SetStateAction<ModalStateType>>;
    modalOpen:      ModalStateType;
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

const SubClientsDrawer = ({onClose, open, subClientId, setModalOpen, modalOpen}:SubClientsDrawerProps) => {
  const [subClient, setSubClient] = React.useState<CompaniesType>()
  const [cookies] =                 useCookies()
  const {id} =                      useParams()
  const [subClientEmployees, setSubClientEmployees] = React.useState<EmployeesType[]>()

  React.useEffect(() => {
    (async () => {
      try{
        const res  = await get(`getSubClients?parentCompanyId=${id}&subClientId=${subClientId}`, cookies.access_token)
        const res2 = await get(`getSubClientsEmployees?subClientId=${subClientId}`, cookies.access_token)
        if(!res.error && !res2.error){
          setSubClient(res.data[0])
          setSubClientEmployees(res2.data)
        }
      }catch(err){
        console.log(err)
      }
    })()
  },[modalOpen.isEmployeeAdditionModalOpen, subClientId])

  const subClientEmployeeRemoved = (id:string) => {
    if(subClientEmployees){
      let newSubClientEmployees = [...subClientEmployees]
      newSubClientEmployees = newSubClientEmployees.filter(x => x?.employeeId !== id)
      setSubClientEmployees(newSubClientEmployees)
    }
  }

  const deleteSubClientEmployee = async(companyId: string | undefined, employeeId: string | undefined) => {
    if(companyId && employeeId){
      await get(`deleteSubClientsEmployee?companyId=${companyId}&employeeId=${employeeId}`, cookies.access_token)
      subClientEmployeeRemoved(employeeId)
    }
  }

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
      <Button onClick={() => setModalOpen({...modalOpen, isEmployeeAdditionModalOpen: true})}>Pridėti darbuotoją</Button>
      {modalOpen.isEmployeeAdditionModalOpen &&
        <EmployeesAdditionModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          companyName={subClient?.companyInfo?.companyName}
          companyId={subClientId}

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
              <Button type='link' onClick={() => deleteSubClientEmployee(item.companyId, item.employeeId)} key={item.employeeId}>
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