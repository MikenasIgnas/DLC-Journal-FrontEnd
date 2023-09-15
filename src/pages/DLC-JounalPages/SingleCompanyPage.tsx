/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                                                          from 'react'
import { get, post, uploadPhoto }                                     from '../../Plugins/helpers'
import { useCookies }                                                 from 'react-cookie'
import { useParams }                                                  from 'react-router-dom'
import { Button, Card, Divider, Form, Select, UploadFile, message }   from 'antd'
import { CollocationsSites, CollocationsType, CompaniesType, ModalStateType }         from '../../types/globalTypes'
import { useForm }                                                    from 'antd/es/form/Form'
import ClientsCollocations                                            from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsCollocations'
import ClientsEmployeeList                                            from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsEmployeeList'
import EditableCollocationFormList                                    from '../../components/DLCJournalComponents/ClientCompanyListComponents/CollocationFormList'
import EmployeesAdditionModal                                         from '../../components/DLCJournalComponents/ClientCompanyListComponents/EmployeeAdditionModal'
import SingleCompanyTitle                                             from '../../components/DLCJournalComponents/ClientCompanyListComponents/SingleCompaniesTitle'
import SuccessMessage                                                 from '../../components/UniversalComponents/SuccessMessage'
import SubClients                                                     from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClients'
import CompanyAdditionModal                                           from '../../components/DLCJournalComponents/ClientCompanyListComponents/CompanyAdditionComponent/CompanyAdditionModal'

type SubClientStateType = {
  mainCompanyAddedAsSubClient:  boolean,
  subClientChangedToMainClient: boolean,
}

type EmployeesType = {
  _id:            string;
  companyId:      string;
  name:           string;
  lastName:       string;
  occupation:     string;
  employeeId:     string;
  permissions:    string[];
}

type CompanyFormType = {
  companyName?: string,
  companyDescription?: string,
  companyPhoto?: string,
  J13?: {
    [key: string]: string[];
  }[];
  T72?: {
    [key: string]: string[];
  }[];
};


const SingleCompanyPage = () => {
  const [cookies] =                                                         useCookies(['access_token'])
  const {id} =                                                              useParams()
  const [company, setCompany] =                                             React.useState<CompaniesType>()
  const [employees, setEmployees] =                                         React.useState<EmployeesType[]>([])
  const [form] =                                                            useForm()
  const [collocations, setCollocations] =                                   React.useState<CollocationsType[]>()
  const [fileList, setFileList] =                                           React.useState<UploadFile[]>([])
  const [messageApi, contextHolder] =                                       message.useMessage()
  const [mainCompanies, setMainCompanies] =                                 React.useState<CompaniesType[]>([])
  const [selectedValue, setSelectedValue] =                                 React.useState(null)
  const [modalOpen, setModalOpen] =                                         React.useState<ModalStateType>({
    editClientsEmployee:         false,
    edit:                        false,
    isEmployeeAdditionModalOpen: false,
    isCompanyAdded:              false,
    isModalOpen:                 false,
  })
  const [subClientState, setSubClientState] =           React.useState<SubClientStateType>({
    mainCompanyAddedAsSubClient:  false,
    subClientChangedToMainClient: false,
  })

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany =     await get(`SingleCompanyPage/${id}`, cookies.access_token)
        const companyEmployees =  await get(`getSingleCompaniesEmployees/${id}`, cookies.access_token)
        const allCollocations =   await get('getCollocations', cookies.access_token)
        const allMainCompanies =  await get(`getAllMainCompanies?companyId=${id}`, cookies.access_token)
        setCollocations(allCollocations.data[0].colocations)
        setCompany(singleCompany.data)
        setEmployees(companyEmployees.data)
        setMainCompanies(allMainCompanies.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[modalOpen.isModalOpen,subClientState.mainCompanyAddedAsSubClient, subClientState.subClientChangedToMainClient, modalOpen.isEmployeeAdditionModalOpen, cookies.access_token])

  const J13 = company?.companyInfo?.J13
  const T72 = company?.companyInfo?.T72
  const collocationsSites = {J13, T72} as CollocationsSites

  const employeeRemoved = (id:string) => {
    let newEmployeesList = [...employees]
    newEmployeesList = newEmployeesList.filter(x => x?.employeeId !== id)
    setEmployees(newEmployeesList)
  }

  const filterCompanyData = (obj: CompanyFormType): CompanyFormType => {
    const filteredObj: CompanyFormType = {}
    if (obj.J13) {
      filteredObj.J13 = []
      for (const key in obj.J13) {
        const entries = Object.entries(obj.J13[key])
        if (entries.length > 0) {
          const nonEmptyEntry = entries.find(([_, values]) => values.length > 0)
          if (nonEmptyEntry) {
            filteredObj.J13.push({ [nonEmptyEntry[0]]: nonEmptyEntry[1] })
          }
        }
      }
    }
    if (obj.T72) {
      filteredObj.T72 = []
      for (const key in obj.T72) {
        const entries = Object.entries(obj.T72[key])
        if (entries.length > 0) {
          const nonEmptyEntry = entries.find(([_, values]) => values.length > 0)
          if (nonEmptyEntry) {
            filteredObj.T72.push({ [nonEmptyEntry[0]]: nonEmptyEntry[1] })
          }
        }
      }
    }
    return filteredObj
  }

  const saveChanges = async(values:CompanyFormType) => {
    setModalOpen({
      ...modalOpen,
      edit: !modalOpen.edit,
    })
    if(modalOpen.edit){
      const filteredCompanyData = filterCompanyData(values)
      filteredCompanyData.companyName = values.companyName
      const res = await post(`updateCompaniesData?companyId=${id}`, filteredCompanyData, cookies.access_token)

      if(fileList[0]){
        await uploadPhoto(fileList[0], false, setFileList, `uploadCompanysPhoto?companyName=${filteredCompanyData.companyName}&companyId=${id}`)
      }

      if(!res.error){
        messageApi.success({
          type:    'success',
          content: 'Išsaugota',
        })
      }
    }
  }

  const subClientsCollocations = []
  let index = 1

  for (const site in collocationsSites) {
    const premisesData = collocationsSites[site]
    const premisesArray = premisesData?.map(premiseData => {
      const premiseName = Object.keys(premiseData)[0]
      const racks = premiseData[premiseName]
      return {
        premiseName,
        racks,
      }
    })
    subClientsCollocations.push({
      site,
      id:       `${index++}`,
      premises: premisesArray,
    })
  }

  const handleChange = async(value: string) => {
    const selectedMainCompany = mainCompanies?.filter((el) => el.id === value)
    const remainingCompanies = mainCompanies?.filter((el) => el.id !== value)

    if(remainingCompanies){
      setMainCompanies(remainingCompanies)
      const res =await post(`addMainCompanyAsSubClient?companyId=${value}&parentCompanyId=${id}`, selectedMainCompany?.[0].companyInfo, cookies.access_token)
      if(!res.error){
        setSubClientState({...subClientState, mainCompanyAddedAsSubClient: !subClientState.mainCompanyAddedAsSubClient})
      }
    }
  }
  const mainCompaniesOptions = mainCompanies?.map((el) => {
    return{
      value: el.id,
      label: el.companyInfo.companyName,
    }
  })
  const handleSelect = () => {
    setSelectedValue(null)
  }
  return (
    <Form form={form} onFinish={saveChanges} style={{ width: '98%', marginTop: '10px' }}>
      <Card
        headStyle={{textAlign: 'center'}}
        bordered={false}
        title={
          <SingleCompanyTitle
            companyTitle={company?.companyInfo?.companyName.toUpperCase()}
            companyDescription={company?.companyInfo.companyDescription}
            edit={modalOpen.edit}
            setFileList={setFileList}
            fileList={fileList}
            companyPhoto={company?.companyInfo.companyPhoto}
          />}
      >
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Button onClick={() => setModalOpen({...modalOpen, isEmployeeAdditionModalOpen: true})}>Pridėti darbuotoją</Button>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button onClick={() => setModalOpen({...modalOpen, isModalOpen: true})}>Pridėti Naują Sub Klientą</Button>
            <Select
              value={selectedValue}
              style={{ width: 120 }}
              onChange={handleChange}
              options={mainCompaniesOptions}
              onSelect={handleSelect}
            />
          </div>
        </div>
        {modalOpen.isEmployeeAdditionModalOpen &&
        <EmployeesAdditionModal
          companyName={company?.companyInfo?.companyName}
          companyId={company?.id as string | null}
          urlPath={'addEmployee'} setModalOpen={setModalOpen } modalOpen={modalOpen}
        />
        }
        {modalOpen.isModalOpen &&
        <CompanyAdditionModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          collocations={subClientsCollocations}
          additionModalTitle={'Pridėkite sub klientą'}
          postUrl={`addSubClient?parentCompanyId=${id}`}
        />
        }
        <Divider>Kolokacijos</Divider>
        {!modalOpen.edit ?
          <ClientsCollocations
            J13locationName={'J13'}
            J13locationData={J13}
            T72locationName={'T72'}
            T72locationData={T72}
          />
          :
          <EditableCollocationFormList
            collocations={collocations}
            collocationsSites={collocationsSites}
          />
        }
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <ClientsEmployeeList
            companyName={company?.companyInfo?.companyName}
            list={employees}
            employeeRemoved={employeeRemoved}
          />
          <SubClients
            subClientState={subClientState}
            setSubClientState={setSubClientState}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            parentCompanyId={id}
          />
        </div>
        <SuccessMessage contextHolder={contextHolder} />
      </Card>
    </Form>
  )
}

export default SingleCompanyPage
