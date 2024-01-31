/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                                                   from 'react'
import { get, put }                                            from '../../Plugins/helpers'
import { useCookies }                                          from 'react-cookie'
import { useParams }                                           from 'react-router-dom'

import {
  Button,
  Card,
  Form,
  Tabs,
  TabsProps,
  UploadFile }                                                 from 'antd'

import {
  CollocationsSites,
  CollocationsType,
  CompaniesType,
  EmployeesType }                                              from '../../types/globalTypes'

import { useForm }                                             from 'antd/es/form/Form'
import ClientsCollocationsTab                                  from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsCollocationsTab/ClientsCollocationsTab'
import ClientsEmployeesTab                                     from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsEmployeesTab/ClientsEmployeesTab'
import SubClientsTab                                           from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClientsTab/SubClientsTab'
import SingleCompanyTitle                                      from '../../components/DLCJournalComponents/ClientCompanyListComponents/SingleCompaniesTitle'
import { useAppSelector }                                      from '../../store/hooks'
import useSetCheckedCollocationList                            from '../../Plugins/useSetCheckedCollocationList'

type CompanyFormType = {
  name?:        string,
  description?: string,
  code:         string;
  photo?:       string,
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
    setCheckboxList,
    checkedList,
    checkAllStates,
    onCheckAllChange,
    onCheckboxChange,
  }                                                   = useSetCheckedCollocationList()

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany         = await get(`company/company?id=${id}`, cookies.access_token)
        const companyEmployees      = await get(`company/CompanyEmployee?companyId=${id}&limit=10&page=1`, cookies.access_token)
        const allCollocations       = await get('getCollocations', cookies.access_token)
        const allMainCompanies      = await get('company/company', cookies.access_token)

        const filteredMainCompanies = allMainCompanies.filter((el: CompaniesType) => el._id !== id && !el.parentId);

        setCollocations(allCollocations.data[0].colocations)
        setCompany(singleCompany)
        setEmployeesList(companyEmployees)
        setMainCompanies(filteredMainCompanies)
      }catch(err){
        console.log(err)
      }
    })()
  },[edit, uploading, openEmployeeAdditionModal, setSubClientAdded, openClientsEmployeesDrawer, cookies.access_token])

  const J13 = company?.companyInfo?.J13
  const T72 = company?.companyInfo?.T72
  const collocationsSites = {J13, T72} as CollocationsSites

  const employeeRemoved = (id: string) => {
    let newEmployeesList = [...employeesList]
    newEmployeesList = newEmployeesList.filter(x => x?._id !== id)
    setEmployeesList(newEmployeesList)
  }

  const saveChanges = async(values:CompanyFormType) => {
    setEdit(!edit)
    if(edit){
      filteredResult.name = values.name
      filteredResult.description = values.description
      filteredResult.id = id
      filteredResult.photo = fileList[0]

      await put( 'company/company', filteredResult, cookies.access_token, fileList[0], setUploading, setFileList)
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
        checkAllStates={checkAllStates}
        onCheckAllChange={onCheckAllChange}
        onCheckboxChange={onCheckboxChange}
        edit={edit}
        J13locationName={'J13'}
        T72locationName={'T72'}
        J13locationData={J13}
        T72locationData={T72}
        collocations={collocations}
        collocationsSites={collocationsSites}
        setCheckedList={setCheckboxList}
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