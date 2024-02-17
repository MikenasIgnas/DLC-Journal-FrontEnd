/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { Drawer, Row, Col, Divider, Form, List }            from 'antd'
import React                                                from 'react'
import { get }                                              from '../../../../Plugins/helpers'
import { useCookies }                                       from 'react-cookie'
import { ColocationDataType, CompaniesType, EmployeesType } from '../../../../types/globalTypes'
import { useForm }                                          from 'antd/es/form/Form'
import ListItem                                             from './ListItem'

type SubClientsDrawerProps = {
    onClose:                () => void;
    open:                   boolean;
    subClientId:            string | null;
    subClientsCollocations: {
      J13?: ColocationDataType[];
      T72?: ColocationDataType[];
    }
}
interface DescriptionItemProps {
    title:        string;
    content:      React.ReactNode;
    formItemName: string | undefined;
    initialValue: string | undefined;
}

const SubClientsDrawer = ({open, subClientId, onClose}:SubClientsDrawerProps) => {
  const [subClient, setSubClient]                   = React.useState<CompaniesType>()
  const [cookies]                                   = useCookies()
  const [subClientEmployees, setSubClientEmployees] = React.useState<EmployeesType[]>()
  const [form]                                      = useForm()

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
        setSubClient(subClientRes)
        setSubClientEmployees(companyEmployees)
      }catch(err){
        console.log(err)
      }
    })()
  },[subClientId, open])

  const listButtons = () => {
    const buttons = [
      <></>,
    ]
    return buttons
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
          </div>
        </div>
        <Divider >Kolokacijos</Divider>
      </Form>
      <Divider >Darbuotojai</Divider>
      <List
        dataSource={subClientEmployees}
        bordered
        renderItem={(item: EmployeesType) => (
          <ListItem
            id={item.companyId}
            item={item}
            listButtons={listButtons}
            photosFolder={'../ClientsEmployeesPhotos'}
            altImage={'noUserImage.jpeg'}/>
        )}
      />
    </Drawer>
  )
}

export default SubClientsDrawer