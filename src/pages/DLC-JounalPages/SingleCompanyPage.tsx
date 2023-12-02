/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                                                                  from 'react'
import { get, post, uploadPhoto }                                             from '../../Plugins/helpers'
import { useCookies }                                                         from 'react-cookie'
import { useParams }                                                          from 'react-router-dom'
import { Card, Form, Tabs, TabsProps, UploadFile, message }                         from 'antd'
import { CollocationsSites, CollocationsType, CompaniesType, ModalStateType } from '../../types/globalTypes'
import { useForm }                                                            from 'antd/es/form/Form'
import ClientsCollocationsTab                                                 from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsCollocationsTab/ClientsCollocationsTab'
import ClientsEmployeesTab                                                    from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsEmployeesTab/ClientsEmployeesTab'
import SubClientsTab                                                          from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClientsTab/SubClientsTab'
import SingleCompanyTitle from '../../components/DLCJournalComponents/ClientCompanyListComponents/SingleCompaniesTitle'

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
  companyName?:         string,
  companyDescription?:  string,
  companyPhoto?:        string,
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
  const [employeesList, setEmployeesList] =                                 React.useState<EmployeesType[]>([])
  const [form] =                                                            useForm()
  const [collocations, setCollocations] =                                   React.useState<CollocationsType[]>()
  const [fileList, setFileList] =                                           React.useState<UploadFile[]>([])
  const [messageApi, contextHolder] =                                       message.useMessage()
  const [mainCompanies, setMainCompanies] =                                 React.useState<CompaniesType[]>([])
  const [editClientsEmployee, setEditClientsEmployee] =                     React.useState(false)
  const [subClientState, setSubClientState] =                               React.useState<SubClientStateType>({
    mainCompanyAddedAsSubClient:  false,
    subClientChangedToMainClient: false,
  })
  const [modalState, setModalState] =                                       React.useState<ModalStateType>({
    editClientsEmployee:         false,
    edit:                        false,
    isEmployeeAdditionModalOpen: false,
    isCompanyAdded:              false,
    isModalOpen:                 false,
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
        setEmployeesList(companyEmployees.data)
        setMainCompanies(allMainCompanies.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[modalState.edit,
    editClientsEmployee,
    modalState.isModalOpen,
    subClientState.mainCompanyAddedAsSubClient,
    subClientState.subClientChangedToMainClient,
    modalState.isEmployeeAdditionModalOpen,
    cookies.access_token,
  ])


  const J13 = company?.companyInfo?.J13
  const T72 = company?.companyInfo?.T72
  const collocationsSites = {J13, T72} as CollocationsSites
  const employeeRemoved = (id:string) => {
    let newEmployeesList = [...employeesList]
    newEmployeesList = newEmployeesList.filter(x => x?.employeeId !== id)
    setEmployeesList(newEmployeesList)
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
    setModalState({
      ...modalState,
      edit: !modalState.edit,
    })
    if(modalState.edit){
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

  const items: TabsProps['items'] = [
    {
      key:      '1',
      label:    'Kliento darbuotojai',
      children: <ClientsEmployeesTab
        setEditClientsEmployee={setEditClientsEmployee}
        editClientsEmployee={editClientsEmployee}
        companyName={company?.companyInfo?.companyName}
        list={employeesList}
        employeeRemoved={employeeRemoved}
        modalState={modalState}
        companyId={company?.id}
        setModalState={setModalState}
      />,
    },
    {
      key:      '2',
      label:    'Sub klientai',
      children: <SubClientsTab
        subClientState={subClientState}
        setSubClientState={setSubClientState}
        setModalState={setModalState}
        modalState={modalState}
        parentCompanyId={id}
        collocationsSites={collocationsSites}
        mainCompanies={mainCompanies}
        setMainCompanies={setMainCompanies}
      />,
    },
    {
      key:      '3',
      label:    'Kliento Kolokacijos',
      children: <ClientsCollocationsTab
        edit={modalState}
        J13locationName={'J13'}
        T72locationName={'T72'}
        J13locationData={J13}
        T72locationData={T72}
        collocations={collocations}
        collocationsSites={collocationsSites}
      />,
    },
  ]

  return (
    <Form form={form} onFinish={saveChanges}>
      <Card
        headStyle={{textAlign: 'center'}}
        bordered={false}
        title={
          <SingleCompanyTitle
            companyTitle={company?.companyInfo?.companyName.toUpperCase()}
            companyDescription={company?.companyInfo.companyDescription}
            edit={modalState.edit}
          />}
      >

        <Tabs defaultActiveKey='1' items={items}/>
      </Card>
    </Form>
  )
}

export default SingleCompanyPage
