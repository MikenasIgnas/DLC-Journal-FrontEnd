/* eslint-disable max-len */
import React                                                  from 'react'
import { get, post, uploadPhoto }                             from '../../Plugins/helpers'
import { useCookies }                                         from 'react-cookie'
import { useParams }                                          from 'react-router-dom'
import { Button, Card, Divider, Form, UploadFile }            from 'antd'
import { CollocationsSites, CollocationsType, CompaniesType } from '../../types/globalTypes'
import { useForm }                                            from 'antd/es/form/Form'
import ClientsCollocations from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsCollocations'
import ClientsEmployeeList from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsEmployeeList'
import EditableCollocationFormList from '../../components/DLCJournalComponents/ClientCompanyListComponents/CollocationFormList'
import EmployeesAdditionModal from '../../components/DLCJournalComponents/ClientCompanyListComponents/EmployeeAdditionModal'
import SingleCompanyTitle from '../../components/DLCJournalComponents/ClientCompanyListComponents/SingleCompaniesTitle'

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
  const [collocations, setCollocations] = React.useState<CollocationsType[]>()
  const [fileList, setFileList] =         React.useState<UploadFile[]>([])
  const [uploading, setUploading] =       React.useState(false)

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany =     await get(`SingleCompanyPage/${id}`, cookies.access_token)
        const companyEmployees =  await get(`getSingleCompaniesEmployees/${id}`, cookies.access_token)
        const allCollocations =      await get('getCollocations', cookies.access_token)
        setCollocations(allCollocations.data[0].colocations)
        setCompany(singleCompany.data)
        setEmployees(companyEmployees.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[isModalOpen, edit, cookies.access_token])

  const J13 = company?.companyInfo?.J13
  const T72 = company?.companyInfo?.T72
  const collocationsSites = {J13, T72} as CollocationsSites

  const companyRemoved = (id:string) => {
    let newEmployeesList = [...employees]
    newEmployeesList = newEmployeesList.filter(x => x?.employeeId !== id)
    setEmployees(newEmployeesList)
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

  function filterCompanyData(obj: CompanyFormType): CompanyFormType {
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
    setEdit(!edit)
    if(edit){
      const filteredCompanyData = filterCompanyData(values)
      filteredCompanyData.companyName = values.companyName
      await post(`updateCompaniesData?companyId=${id}`, filteredCompanyData, cookies.access_token)
      uploadPhoto(fileList[0], setUploading, setFileList, `uploadCompanysPhoto?companyName=${filteredCompanyData.companyName}&companyId=${id}`)
    }
  }
  return (
    <Form form={form} onFinish={saveChanges} style={{ width: '98%', marginTop: '10px' }}>
      <Card
        headStyle={{textAlign: 'center'}}
        title={
          <SingleCompanyTitle
            companyTitle={company?.companyInfo?.companyName.toUpperCase()}
            companyDescription={company?.companyInfo.companyDescription}
            edit={edit}
            setFileList={setFileList}
            fileList={fileList}
            companyPhoto={company?.companyInfo.companyPhoto}
          />}
        bordered={false}
      >
        <Button style={{display: 'flex', margin: 'auto'}} onClick={()=> setIsModalOpen(true)}>Pridėti darbuotoją</Button>
        {isModalOpen && <EmployeesAdditionModal companyName={company?.companyInfo?.companyName} companyId={company?.id} setIsModalOpen={setIsModalOpen}/>}
        <Divider>Kolokacijos</Divider>
        {!edit
          ?
          <ClientsCollocations J13locationName={'J13'} J13locationData={J13} T72locationName={'T72'} T72locationData={T72}/>
          :
          <EditableCollocationFormList collocations={collocations} collocationsSites={collocationsSites} />
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
