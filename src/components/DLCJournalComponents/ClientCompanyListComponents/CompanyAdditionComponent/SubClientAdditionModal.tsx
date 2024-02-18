/* eslint-disable max-len */
import React                              from 'react'

import {
  Modal,
  Form,
  Input,
  UploadFile,
  Button,
  Tabs,
  TabsProps,
}                                         from 'antd'

import { useForm }                        from 'antd/es/form/Form'
import PhotoUploader                      from '../../../UniversalComponents/PhotoUploader/PhotoUploader'

import {
  useAppDispatch,
  useAppSelector,
}                                         from '../../../../store/hooks'

import { setOpenSubClientAdditionModal }  from '../../../../auth/ModalStateReducer/ModalStateReducer'
import { CompaniesType }                  from '../../../../types/globalTypes'
import { post }                           from '../../../../Plugins/helpers'
import { useParams }                      from 'react-router'
import { useCookies }                     from 'react-cookie'
import { setSiteId }                      from '../../../../auth/SingleCompanyReducer/SingleCompanyReducer'
import { useSearchParams }                from 'react-router-dom'
import SublientsRacks                     from '../ClientsCollocationsTab/SublientsRacks'

const SubClientAdditionModal = () => {
  const [cookies]                         = useCookies(['access_token'])
  const [form]                            = useForm()
  const [uploading, setUploading]         = React.useState(false)
  const [fileList, setFileList]           = React.useState<UploadFile[]>([])
  const { id }                            = useParams()
  const [searchParams, setSearchParams]   = useSearchParams()
  const checkedList                       = useAppSelector((state) => state.racks.checkedList)
  const sites                             = useAppSelector((state) => state.singleCompany.fullSiteData)
  const dispatch                          = useAppDispatch()
  const siteId                            = searchParams.get('siteId')

  const addSubClient = async(values: CompaniesType) => {
    values.parentId = id
    values.racks = checkedList
    await post('company/company', values, cookies.access_token, fileList[0], setUploading, setFileList)
    dispatch(setOpenSubClientAdditionModal(false))
  }


  const items: TabsProps['items'] = sites?.map((site) => ({
    key:      site._id,
    label:    site.name,
    children: <SublientsRacks site={site}/>,
  }))

  const changeTab = (key: string) => {
    setSearchParams(`?siteId=${key}`)
    dispatch(setSiteId(key))
  }

  return (
    <Modal
      centered
      open
      onOk={() => dispatch(setOpenSubClientAdditionModal(false))}
      onCancel={() => dispatch(setOpenSubClientAdditionModal(false))}
      footer={false}
      width={'70%'}
    >
      <Form style={{textAlign: 'center'}} form={form} onFinish={addSubClient}>
        <div>
          <Form.Item rules={[{ required: true, message: 'Įveskite įmonės pavadinimą'}]} name='name'>
            <Input placeholder='Įmonės pavadinimas'/>
          </Form.Item>
          <Form.Item name='description'>
            <Input placeholder='Įmonės apibūdinimas'/>
          </Form.Item>
          <PhotoUploader setFileList={setFileList} fileList={fileList}/>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Tabs onTabClick={changeTab} activeKey={siteId ? siteId : undefined } items={items} />
          </div>
        </div>
        <Button loading={uploading} htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default SubClientAdditionModal