/* eslint-disable max-len */
import React, { useState }                                  from 'react'
import { Avatar, Button, Col, Divider, Drawer, List, Row }  from 'antd'
import { get }                                              from '../../../Plugins/helpers'
import { CompaniesType }                                    from '../../../types/globalTypes'
import { useCookies }                                       from 'react-cookie'
import { useSearchParams }                                  from 'react-router-dom'
import SubClientsDrawer from './SubClientsDrawer'

interface DescriptionItemProps {
  title:            string;
  content:          React.ReactNode;
}
type SubClientsProps = {
  parentCompanyId: string | undefined;
  isSubclientAdded: boolean
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className='site-description-item-profile-wrapper'>
    <p className='site-description-item-profile-p-label'>{title}:</p>
    {content}
  </div>
)

const SubClients = ({parentCompanyId, isSubclientAdded}: SubClientsProps) => {
  const [open, setOpen] =             useState(false)
  const [subClients, setSubClients] = React.useState<CompaniesType[]>()
  const [cookies] =                   useCookies()
  const [, setSearchParams] =         useSearchParams()
  React.useEffect(() => {
    (async () => {
      try{
        const companiesSubClients = await get(`getSubClients?parentCompanyId=${parentCompanyId}`, cookies.access_token)
        setSubClients(companiesSubClients.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[isSubclientAdded])

  const showDrawer = (subClient: CompaniesType) => {
    setSearchParams(`&subClientId=${subClient.id}`, { replace: true })
    setOpen(true)
  }
  const deletSubClient = async(subClientId: string, parentCompanyId: string | undefined ) => {
    if(subClientId ){
      await get(`deleteCompaniesSubClient?subClientId=${subClientId}&parentCompanyId=${parentCompanyId}`, cookies.access_token)
      companyRemoved(subClientId)
    }
  }
  const companyRemoved = (id:string) => {
    if(subClients){
      let newCompaniesList = [...subClients]
      newCompaniesList = newCompaniesList.filter(x => x?.id !== id)
      setSubClients(newCompaniesList)
    }
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div style={{width: '49%'}}>
      <Divider>Sub Klientai</Divider>
      <List
        dataSource={subClients}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button type='link' onClick={() => showDrawer(item)} key={item.id}>
              Peržiūrėti
              </Button>,
              <Button type='link' onClick={() => deletSubClient(item?.id, item?.parentCompanyId)} key={item.id}>
                  Ištrinti
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src={
                  <img
                    src={`../CompanyLogos/${item.companyInfo.companyPhoto ? item.companyInfo.companyPhoto : 'noImage.jpg'}`}
                    alt='err' />}
                />}
              title={item.companyInfo.companyName}
              description={item.companyInfo.companyDescription}
            />
          </List.Item>
        )}
      />
      <SubClientsDrawer onClose={onClose} setOpen={setOpen} open={open}/>
    </div>
  )
}

export default SubClients