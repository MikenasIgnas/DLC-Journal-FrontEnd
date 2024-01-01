/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { Drawer, Row, Col, Divider, Form, List }            from 'antd'
import React                                                from 'react'
import { get }                                              from '../../../../Plugins/helpers'
import { useParams }                                        from 'react-router-dom'
import { useCookies }                                       from 'react-cookie'
import { ColocationDataType, CompaniesType, EmployeesType } from '../../../../types/globalTypes'
import { useForm }                                          from 'antd/es/form/Form'
import ListItem                                             from './ListItem'
import ClientsCollocations                                  from '../ClientsCollocationsTab/ClientsCollocations'

type SubClientsDrawerProps = {
    onClose:                () => void;
    open:                   boolean;
    subClientId:            number | null;
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

const SubClientsDrawer = ({open, subClientId, subClientsCollocations, onClose}:SubClientsDrawerProps) => {
  const {id}                                        = useParams()
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
        const res  = await get(`getSingleSubClient?parentCompanyId=${id}&subClientId=${subClientId}`, cookies.access_token)
        const res2 = await get(`getSingleCompaniesEmployees?companyId=${subClientId}`, cookies.access_token)
        if(!res.error && !res2.error[0]){
          setSubClient(res.data)
          setSubClientEmployees(res2.data)
        }
      }catch(err){
        console.log(err)
      }
    })()
  },[subClientId, open])

  const subClientEmployeeRemoved = (id:number) => {
    if(subClientEmployees){
      let newSubClientEmployees = [...subClientEmployees]
      newSubClientEmployees = newSubClientEmployees.filter(x => x?.employeeId !== id)
      setSubClientEmployees(newSubClientEmployees)
    }
  }

  const deleteSubClientEmployee = async(companyId: number | undefined, employeeId: number | undefined) => {
    if(companyId && employeeId){
      await get(`deleteSubClientsEmployee?companyId=${companyId}&employeeId=${employeeId}`, cookies.access_token)
      subClientEmployeeRemoved(employeeId)
    }
  }


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
                src={`../../CompanyLogos/${subClient?.companyInfo?.companyPhoto ? subClient?.companyInfo?.companyPhoto : 'noImage.jpg'}`}
                alt='err' />
            </Col>
          </div>
          <div>
            <DescriptionItem
              title='Įmonės pavadinimas'
              content={subClient?.companyInfo?.companyName}
              formItemName={'companyName'}
              initialValue={subClient?.companyInfo?.companyName}
            />
            <DescriptionItem
              title='Įmonės aprašas'
              content={subClient?.companyInfo?.companyDescription}
              formItemName={'companyDescription'}
              initialValue={subClient?.companyInfo?.companyDescription}
            />
          </div>
        </div>
        <Divider >Kolokacijos</Divider>
        <ClientsCollocations
          J13locationName={'J13'}
          J13locationData={subClientsCollocations?.J13}
          T72locationName={'T72'}
          T72locationData={subClientsCollocations?.T72}
        />
      </Form>
      <Divider >Darbuotojai</Divider>
      <List
        dataSource={subClientEmployees}
        bordered
        renderItem={(item: EmployeesType) => (
          <ListItem
            listButtons={listButtons}
            listItemId={item.companyId}
            primaryKey={item.employeeId}
            photo={item.employeePhoto}
            title={`${item.name} ${item.lastName}`}
            description={item.occupation}
            photosFolder={'ClientsEmployeesPhotos'}
            altImage={'noUserImage.jpeg'}/>
        )}
      />
    </Drawer>
  )
}

export default SubClientsDrawer