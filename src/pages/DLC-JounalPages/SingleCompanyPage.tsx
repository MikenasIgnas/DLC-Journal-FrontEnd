/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React                  from 'react'
import { put }                from '../../Plugins/helpers'
import { useCookies }         from 'react-cookie'

import {
  useParams,
  useSearchParams,
}                            from 'react-router-dom'

import {
  Button,
  Card,
  Form,
  Tabs,
  TabsProps,
  UploadFile,
}                             from 'antd'

import { useForm }            from 'antd/es/form/Form'
import {
  useAppDispatch,
  useAppSelector,
}                             from '../../store/hooks'

import { setEditCompanyPage } from '../../auth/SingleCompanyEditsReducer/SingleCompanyEditsReducer'

import ClientsCollocationsTab from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsCollocationsTab/ClientsCollocationsTab'
import ClientsEmployeesTab    from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsEmployeesTab/ClientsEmployeesTab'
import SubClientsTab          from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClientsTab/SubClientsTab'
import SingleCompanyTitle     from '../../components/DLCJournalComponents/ClientCompanyListComponents/SingleCompaniesTitle'
import ClientsDocumentsTab    from '../../components/DLCJournalComponents/CollocationsPageComponents/ClientsDocumentsTab'
import useFetchSingleCompany  from '../../Plugins/useFetchSingleCompany'


type CompanyFormType = {
  id:           string | undefined
  name?:        string,
  description?: string,
  code:         string;
  racks:        string[]
  photo?:       any,
};

const SingleCompanyPage = () => {
  const [cookies]                       = useCookies(['access_token'])
  const {id}                            = useParams()
  const [form]                          = useForm()
  const [fileList, setFileList]         = React.useState<UploadFile[]>([])
  const [, setUploading]                = React.useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch                        = useAppDispatch()
  const editCompanyPage                 = useAppSelector((state) => state.singleCompanyEdits.editCompanyPage)
  const checkedList                     = useAppSelector((state) => state.racks.checkedList)
  const siteId                          = searchParams.get('siteId')
  const tabKey                          = searchParams.get('tabKey')

  useFetchSingleCompany()

  const saveChanges = async(values:CompanyFormType) => {
    dispatch(setEditCompanyPage(!editCompanyPage))
    if(editCompanyPage){
      values.id = id
      values.photo = fileList[0]
      values.racks = checkedList
      await put( 'company/company', values, cookies.access_token, fileList[0], setUploading, setFileList)
    }
  }

  const items: TabsProps['items'] = [
    {
      key:      '1',
      label:    'Kliento darbuotojai',
      children: <ClientsEmployeesTab/>,
    },
    {
      key:      '2',
      label:    'Sub klientai',
      children: <SubClientsTab collocationsSites={{}}/>,
    },
    {
      key:      '3',
      label:    'Kliento Kolokacijos',
      children: <ClientsCollocationsTab/>,
    },
    {
      key:      '4',
      label:    'Dokumentai',
      children: <ClientsDocumentsTab/>,
    },
  ]

  const changeTab = (key: string) => {
    if(siteId){
      setSearchParams(`siteId=${siteId}&tabKey=${key}`)
    }else{
      setSearchParams(`tabKey=${key}`)
    }
  }

  return (
    <Form form={form} onFinish={saveChanges}>
      <Card
        styles={{header: {textAlign: 'center'}}}
        bordered={false}
        title={<SingleCompanyTitle setFileList={setFileList} fileList={fileList}/>}>
        <Tabs
          activeKey={tabKey ? tabKey : undefined}
          onTabClick={changeTab}
          tabBarExtraContent={
            <Button htmlType='submit' type='link'>
              {!editCompanyPage ? 'Edit' : 'Save'}
            </Button>
          }
          defaultActiveKey='1'
          items={items}
        />
      </Card>
    </Form>
  )
}

export default SingleCompanyPage