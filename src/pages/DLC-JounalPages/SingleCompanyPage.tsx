/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                                                   from 'react'
import { get, post, uploadPhoto }                              from '../../Plugins/helpers'
import { useCookies }                                          from 'react-cookie'
import { useParams }                                           from 'react-router-dom'
import { Button, Card, Form, Tabs, TabsProps, UploadFile }     from 'antd'
import { CollocationsSites, CollocationsType, CompaniesType }  from '../../types/globalTypes'
import { useForm }                                             from 'antd/es/form/Form'
import ClientsCollocationsTab                                  from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsCollocationsTab/ClientsCollocationsTab'
import ClientsEmployeesTab                                     from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsEmployeesTab/ClientsEmployeesTab'
import SubClientsTab                                           from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClientsTab/SubClientsTab'
import SingleCompanyTitle                                      from '../../components/DLCJournalComponents/ClientCompanyListComponents/SingleCompaniesTitle'
import { useAppSelector }                                      from '../../store/hooks'
import useSetCheckedCollocationList from '../../Plugins/useSetCheckedCollocationList'

type EmployeesType = {
  _id:            string;
  companyId:      number;
  name:           string;
  lastName:       string;
  occupation:     string;
  employeeId:     number;
  permissions:    string[];
  employeePhoto:  string
}

type CompanyFormType = {
  companyName?:        string,
  companyDescription?: string,
  companyPhoto?:       string,
  J13?: {
    [key: string]:     string[];
  }[];
  T72?: {
    [key: string]:     string[];
  }[];
};

const SingleCompanyPage = () => {
  const [cookies]                                     = useCookies(['access_token'])
  const {id}                                          = useParams()
  const [company, setCompany]                         = React.useState<CompaniesType>()
  const [employeesList, setEmployeesList]             = React.useState<EmployeesType[]>([])
  const [form]                                        = useForm()
  const [collocations, setCollocations]               = React.useState<CollocationsType[]>()
  const [fileList, setFileList]                       = React.useState<UploadFile[]>([])
  const [mainCompanies, setMainCompanies]             = React.useState<CompaniesType[]>([])
  const [editClientsEmployee, setEditClientsEmployee] = React.useState(false)
  const [edit, setEdit]                               = React.useState(false)
  const openEmployeeAdditionModal                     = useAppSelector((state) => state.modals.openEmployeeAdditionModal)
  const setSubClientAdded                             = useAppSelector((state) => state.isSubClientAdded.isSubClientAdded)
  const openClientsEmployeesDrawer                    = useAppSelector((state) => state.modals.openClientsEmployeesDrawer)
  const [uploading, setUploading]                     = React.useState(false)
  const {
    filteredResult,
    checkedList,
    checkAllStates,
    onCheckAllChange,
    onCheckboxChange,
  }                                                   = useSetCheckedCollocationList()

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany     = await get(`getSingleCompany?companyId=${id}`, cookies.access_token)
        const companyEmployees  = await get(`getSingleCompaniesEmployees?companyId=${id}`, cookies.access_token)
        const allCollocations   = await get('getCollocations', cookies.access_token)
        const allMainCompanies  = await get(`getAllMainCompanies?companyId=${id}`, cookies.access_token)
        setCollocations(allCollocations.data[0].colocations)
        setCompany(singleCompany.data)
        setEmployeesList(companyEmployees.data)
        setMainCompanies(allMainCompanies.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[edit, uploading, openEmployeeAdditionModal, setSubClientAdded, openClientsEmployeesDrawer, cookies.access_token])

  const J13 = company?.companyInfo?.J13
  const T72 = company?.companyInfo?.T72
  const collocationsSites = {J13, T72} as CollocationsSites
  const employeeRemoved = (id: number) => {
    let newEmployeesList = [...employeesList]
    newEmployeesList = newEmployeesList.filter(x => x?.employeeId !== id)
    setEmployeesList(newEmployeesList)
  }

  const saveChanges = async(values:CompanyFormType) => {
    setEdit(!edit)
    if(edit){
      filteredResult.companyName = values.companyName
      await post(`updateCompaniesData?companyId=${id}`, filteredResult, cookies.access_token)
      if(fileList[0]){
        uploadPhoto(fileList[0],setUploading, setFileList, `uploadCompanysPhoto?companyName=${values.companyName}&companyId=${id}`)
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
        setEmployeesList={setEmployeesList}
        employeeRemoved={employeeRemoved}
      />,
    },
    {
      key:      '2',
      label:    'Sub klientai',
      children: <SubClientsTab
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
        checkedList={checkedList}
        checkAllStates = {checkAllStates}
        onCheckAllChange = {onCheckAllChange}
        onCheckboxChange={onCheckboxChange}
        edit={edit}
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
            setFileList={setFileList}
            fileList={fileList}
            companyLogo ={company?.companyInfo?.companyPhoto}
            companyTitle={company?.companyInfo?.companyName}
            companyDescription={company?.companyInfo.companyDescription}
            edit={edit}
          />}
      >
        <Tabs tabBarExtraContent={<Button htmlType='submit' type='link'>{!edit ? 'Edit' : 'Save'}</Button>} defaultActiveKey='1' items={items}/>
      </Card>
    </Form>
  )
}

export default SingleCompanyPage