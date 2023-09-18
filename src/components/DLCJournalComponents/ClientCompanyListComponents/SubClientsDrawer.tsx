/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { Drawer, Row, Col, Divider, Button, Form, Input, List } from 'antd'
import React                                                    from 'react'
import { get }                                                  from '../../../Plugins/helpers'
import { useParams }                                            from 'react-router-dom'
import { useCookies }                                           from 'react-cookie'
import { CompaniesType, EmployeesType, ModalStateType }         from '../../../types/globalTypes'
import EmployeesAdditionModal                                   from './EmployeeAdditionModal'
import { useForm }                                              from 'antd/es/form/Form'
import ListItem from './ListItem'

type SubClientsDrawerProps = {
    onClose:        () => void;
    open:           boolean;
    subClientId:    string | null;
    setModalState:   React.Dispatch<React.SetStateAction<ModalStateType>>;
    modalState:      ModalStateType;
}
interface DescriptionItemProps {
    title:            string;
    content:          React.ReactNode;
    formItemName:     string | undefined;
    initialValue:     string | undefined;
}

const SubClientsDrawer = ({onClose, open, subClientId, setModalState, modalState}:SubClientsDrawerProps) => {
  const [subClient, setSubClient] =                   React.useState<CompaniesType>()
  const [cookies] =                                   useCookies()
  const {id} =                                        useParams()
  const [subClientEmployees, setSubClientEmployees] = React.useState<EmployeesType[]>()
  const [edit, setEdit] =                             React.useState(false)
  const [form] =                                      useForm()

  const DescriptionItem = ({ title, content, formItemName, initialValue }: DescriptionItemProps) => (
    <Row>
      <Col span={12}>
        <div style={{width: '250px', display: 'flex', justifyContent: 'space-between', padding: '5px'}}>
          <p className='site-description-item-profile-p-label'>{title}:</p>
          {!edit ? <p>{content}</p> : <Form.Item initialValue={initialValue} name={formItemName}><Input/></Form.Item>}
        </div>
      </Col>
    </Row>
  )

  React.useEffect(() => {
    (async () => {
      try{
        const res  = await get(`getSingleSubClient?parentCompanyId=${id}&subClientId=${subClientId}`, cookies.access_token)
        const res2 = await get(`getSubClientsEmployees?subClientId=${subClientId}`, cookies.access_token)
        if(!res.error && !res2.error[0]){
          setSubClient(res.data)
          setSubClientEmployees(res2.data)
        }
      }catch(err){
        console.log(err)
      }
    })()
  },[modalState.isEmployeeAdditionModalOpen, subClientId, edit, open])

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
      <Divider >Imonės Profilis</Divider>
      <Form form={form}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
          <div>
            <Button onClick={() => setEdit(!edit)} type='link'>Edit</Button>
            <a href={`/SingleCompanyPage/${subClientId}`}>Pilnas Profilis</a>
          </div>
        </div>
        {modalState.isEmployeeAdditionModalOpen &&
        <EmployeesAdditionModal
          setModalState={setModalState}
          modalState={modalState}
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
        {/* {
          !edit ?
            <div style={{display: 'flex'}}>
              <ColocationDisplay locationName={'J13'} locationData={subClient?.companyInfo.J13}/>
              <ColocationDisplay locationName={' T72'} locationData={subClient?.companyInfo.T72}/>
            </div> :
            <EditableCollocationFormList
              collocations={collocations}
              collocationsSites={collocationsSites}
            />
        } */}
      </Form>
      <Divider >Darbuotojai</Divider>
      <Button style={{display: 'flex', margin: 'auto', marginBottom: '10px'}} onClick={() => setModalState({...modalState, isEmployeeAdditionModalOpen: true})}>Pridėti darbuotoją</Button>
      <List
        dataSource={subClientEmployees}
        bordered
        renderItem={(item: EmployeesType) => (
          <ListItem
            deleteListItem={deleteSubClientEmployee}
            listItemId={item.companyId}
            employeeId={item.employeeId}
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