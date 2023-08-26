/* eslint-disable max-len */
import React                            from 'react'
import { get }                          from '../../Plugins/helpers'
import { useCookies }                   from 'react-cookie'
import { useParams }                    from 'react-router-dom'
import { Button, Card, Checkbox, Collapse, ConfigProvider, Divider, Form }  from 'antd'
import { CompaniesType }                from '../../types/globalTypes'
import EmployeesAdditionModal           from '../../components/EmployeeAdditionModal'
import ClientsEmployeeList              from './ClientsEmployeeList'
import ColocationView                   from '../../components/ColocationView'
import SingleCompanyTitle               from '../../components/SingleCompaniesTitle'
import { useForm }                      from 'antd/es/form/Form'
import AdditionModal from '../../components/companyAdditionComponent/AdditionModal'
import ColocationSelectors from '../../components/HisotryPageElements/CollocationSelectors'

type EmployeesType = {
  _id:            string;
  companyId:      string;
  name:           string;
  lastName:       string;
  occupation:     string;
  employeeId:     string;
  permissions:    string[];
}

const SingleCompanyPage = () => {
  const [cookies] =                       useCookies(['access_token'])
  const {id} =                            useParams()
  const [company, setCompany] =           React.useState<CompaniesType>()
  const [employees, setEmployees] =       React.useState<EmployeesType[]>([])
  const [isModalOpen, setIsModalOpen] =   React.useState(false)
  const [edit, setEdit] =                 React.useState(false)
  const [form] =                          useForm()
  const [collocations, setCollocations] = React.useState<any[]>()

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany =     await get(`SingleCompanyPage/${id}`, cookies.access_token)
        const companyEmployees =  await get(`getSingleCompaniesEmployees/${id}`, cookies.access_token)
        const collocations = await get('getCollocations', cookies.access_token)
        setCollocations(collocations.data[0].colocations)
        setCompany(singleCompany.data)
        setEmployees(companyEmployees.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[isModalOpen])

  const J13 = company?.companyInfo.J13
  const T72 = company?.companyInfo.T72

  const companyRemoved = (id:string) => {
    let newEmployeesList = [...employees]
    newEmployeesList = newEmployeesList.filter(x => x?.employeeId !== id)
    setEmployees(newEmployeesList)
  }

  return (
    <Form form={form} style={{ width: '98%', marginTop: '10px' }}>
      <Card
        headStyle={{textAlign: 'center'}}
        title={
          <SingleCompanyTitle
            companyTitle={company?.companyInfo?.companyName.toUpperCase()}
            companyDescription={company?.companyInfo.companyDescription}
            setEdit={setEdit}
            edit={edit}
          />}
        bordered={false}
      >
        <Button style={{display: 'flex', margin: 'auto'}} onClick={()=> setIsModalOpen(true)}>Pridėti darbuotoją</Button>
        {isModalOpen && <EmployeesAdditionModal companyName={company?.companyInfo?.companyName} companyId={company?.id} setIsModalOpen={setIsModalOpen}/>}
        <Divider>Kolokacijos</Divider>
        {edit ?
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            {collocations?.map((colocation, i) => <ColocationSelectors key={i} collocationSite={colocation.site} colocationPremises={colocation.premises} colocationId={colocation.id}/>)}
          </div>
          :
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <ColocationView locationName={'J13'} locationData={J13}/>
            <ColocationView locationName={'T72'} locationData={T72}/>
          </div>
        }
        <ClientsEmployeeList
          companyName={company?.companyInfo?.companyName}
          list={employees}
          companyRemoved={companyRemoved}/>
      </Card>
    </Form>
  )
}

export default SingleCompanyPage