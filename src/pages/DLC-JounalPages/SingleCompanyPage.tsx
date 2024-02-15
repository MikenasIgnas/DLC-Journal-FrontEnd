/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                              from 'react'
import { get, put }                       from '../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'
import { useParams }                      from 'react-router-dom'

import {
  Button,
  Card,
  Form,
  Tabs,
  TabsProps,
  UploadFile }                            from 'antd'

import {
  CompaniesType,
  EmployeesType,
}                                         from '../../types/globalTypes'

import { useForm }                        from 'antd/es/form/Form'
import ClientsCollocationsTab             from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsCollocationsTab/ClientsCollocationsTab'
import ClientsEmployeesTab                from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsEmployeesTab/ClientsEmployeesTab'
import SubClientsTab                      from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClientsTab/SubClientsTab'
import SingleCompanyTitle                 from '../../components/DLCJournalComponents/ClientCompanyListComponents/SingleCompaniesTitle'
import { useAppSelector } from '../../store/hooks'
import ClientsDocumentsTab                from '../../components/DLCJournalComponents/CollocationsPageComponents/ClientsDocumentsTab'
import { CheckboxValueType }              from 'antd/es/checkbox/Group'
import useFetchSites from '../../Plugins/useFetchSites'

type CompanyFormType = {
  id: string | undefined
  name?:        string,
  description?: string,
  code:         string;
  racks:        string[]
  photo?:       any,
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
  const [fileList, setFileList]                       = React.useState<UploadFile[]>([])
  const [mainCompanies, setMainCompanies]             = React.useState<CompaniesType[]>([])
  const [editClientsEmployee, setEditClientsEmployee] = React.useState(false)
  const [edit, setEdit]                               = React.useState(false)
  const openEmployeeAdditionModal                     = useAppSelector((state) => state.modals.openEmployeeAdditionModal)
  const setSubClientAdded                             = useAppSelector((state) => state.isSubClientAdded.isSubClientAdded)
  const openClientsEmployeesDrawer                    = useAppSelector((state) => state.modals.openClientsEmployeesDrawer)
  const [uploading, setUploading]                     = React.useState(false)
  const [checkedLists, setCheckedLists]               = React.useState<CheckboxValueType[]>([])
  useFetchSites()
  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany         = await get(`company/company?id=${id}`, cookies.access_token)
        const companyEmployees      = await get(`company/CompanyEmployee?companyId=${id}&limit=10&page=1`, cookies.access_token)
        const allMainCompanies      = await get('company/company', cookies.access_token)
        const filteredMainCompanies = allMainCompanies.filter((el: CompaniesType) => el._id !== id && !el.parentId)
        setCompany(singleCompany)
        setEmployeesList(companyEmployees)
        setMainCompanies(filteredMainCompanies)
      }catch(err){
        console.log(err)
      }
    })()
  },[edit, uploading, openEmployeeAdditionModal, setSubClientAdded, openClientsEmployeesDrawer, cookies.access_token])


  const employeeRemoved = (id: string) => {
    let newEmployeesList = [...employeesList]
    newEmployeesList = newEmployeesList.filter(x => x?._id !== id)
    setEmployeesList(newEmployeesList)
  }

  const saveChanges = async(values:CompanyFormType) => {
    setEdit(!edit)
    if(edit){
      values.id = id
      values.photo = fileList[0]
      values.racks = checkedLists as string[]
      await put( 'company/company', values, cookies.access_token, fileList[0], setUploading, setFileList)
    }
  }

  const items: TabsProps['items'] = [
    {
      key:      '1',
      label:    'Kliento darbuotojai',
      children: <ClientsEmployeesTab
        setEditClientsEmployee={setEditClientsEmployee}
        editClientsEmployee={editClientsEmployee}
        companyName={company?.name}
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
        mainCompanies={mainCompanies}
        setMainCompanies={setMainCompanies} collocationsSites={{}}
      />,
    },
    {
      key:      '3',
      label:    'Kliento Kolokacijos',
      children: <ClientsCollocationsTab
        edit={edit}
        companyRacks={company?.racks}
        checkedLists={checkedLists}
        setCheckedLists={setCheckedLists}
      />,
    },
    {
      key:      '4',
      label:    'Dokumentai',
      children: <ClientsDocumentsTab companyDocuments={company?.document}/>,
    },
  ]

  return (
    <Form form={form} onFinish={saveChanges}>
      <Card
        headStyle={{textAlign: 'center'}}
        bordered={false}
        title={
          <SingleCompanyTitle
            company={company}
            setFileList={setFileList}
            fileList={fileList}
            edit={edit}
          />}
      >
        <Tabs tabBarExtraContent={<Button htmlType='submit' type='link'>{!edit ? 'Edit' : 'Save'}</Button>} defaultActiveKey='1' items={items}/>
      </Card>
    </Form>
  )
}

export default SingleCompanyPage