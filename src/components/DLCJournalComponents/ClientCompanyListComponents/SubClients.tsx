/* eslint-disable max-len */
import React, { useState }                          from 'react'
import { Avatar, Col, Divider, Drawer, List, Row }  from 'antd'
import { get }                                      from '../../../Plugins/helpers'
import { CompaniesType }                            from '../../../types/globalTypes'
import { useCookies }                               from 'react-cookie'

interface DescriptionItemProps {
  title:            string;
  content:          React.ReactNode;
}
type SubClientsProps = {
  parentCompanyId: string | undefined;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className='site-description-item-profile-wrapper'>
    <p className='site-description-item-profile-p-label'>{title}:</p>
    {content}
  </div>
)

const SubClients = ({parentCompanyId}: SubClientsProps) => {
  const [open, setOpen] =             useState(false)
  const [subClients, setSubClients] = React.useState<CompaniesType[]>()
  const [cookies] =                   useCookies()

  React.useEffect(() => {
    (async () => {
      try{
        const companiesSubClients = await get(`getSubClients?parentCompanyId=${parentCompanyId}`, cookies.access_token)
        setSubClients(companiesSubClients.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  console.log(subClients)
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div style={{width: '50%'}}>

      <Divider>Sub Klientai</Divider>
      <List
        dataSource={subClients}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={showDrawer} key={`a-${item.id}`}>
                View Profile
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' />
              }
              title={<a href='https://ant.design/index-cn'>{item.companyInfo.companyName}</a>}
              description='Progresser XTech'
            />
          </List.Item>
        )}
      />
      <Drawer width={640} placement='right' closable={false} onClose={onClose} open={open}>
        <p className='site-description-item-profile-p' style={{ marginBottom: 24 }}>
          User Profile
        </p>
        <p className='site-description-item-profile-p'>Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title='Full Name' content='Lily' />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Account' content='AntDesign@example.com' />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title='City' content='HangZhou' />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Country' content='China🇨🇳' />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title='Birthday' content='February 2,1900' />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Website' content='-' />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title='Message'
              content='Make things as simple as possible but no simpler.'
            />
          </Col>
        </Row>
        <Divider />
        <p className='site-description-item-profile-p'>Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title='Position' content='Programmer' />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Responsibilities' content='Coding' />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title='Department' content='XTech' />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Supervisor' content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title='Skills'
              content='C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.'
            />
          </Col>
        </Row>
        <Divider />
        <p className='site-description-item-profile-p'>Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title='Email' content='AntDesign@example.com' />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Phone Number' content='+86 181 0000 0000' />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title='Github'
              content={
                <a href='http://github.com/ant-design/ant-design/'>
                  github.com/ant-design/ant-design/
                </a>
              }
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  )
}

export default SubClients