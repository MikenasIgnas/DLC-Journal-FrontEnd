/* eslint-disable max-len */
import React                              from 'react'
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  UploadFile }                             from 'antd'

import { useForm }                         from 'antd/es/form/Form'
import { EmployeesType }                   from '../../../../types/globalTypes'
import { convertUTCtoLocalDate, get, put } from '../../../../Plugins/helpers'
import { useCookies }                      from 'react-cookie'
import { useParams, useSearchParams }      from 'react-router-dom'
import PhotoUploader                       from '../../../UniversalComponents/PhotoUploader/PhotoUploader'
import { useAppDispatch, useAppSelector }  from '../../../../store/hooks'
import { setOpenClientsEmployeesDrawer }   from '../../../../auth/ModalStateReducer/ModalStateReducer'
import useSetWindowsSize                   from '../../../../Plugins/useSetWindowsSize'
import { Permissions }                     from '../../../../types/globalTypes'
import { setEditCompanyEmployee }          from '../../../../auth/SingleCompanyEditsReducer/SingleCompanyEditsReducer'

interface DescriptionItemProps {
    title:   string;
    content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div style={{width: '250px', display: 'flex', justifyContent: 'space-between', padding: '5px'}} >
    <p className='site-description-item-profile-p-label'>{title}:</p>
    <p>{content}</p>
  </div>
)

const ClientsEmployeeDrawer = () => {
  const [form]                        = useForm()
  const [fileList, setFileList]       = React.useState<UploadFile[]>([])
  const [cookies]                     = useCookies(['access_token'])
  const [uploading, setUploading]     = React.useState(false)
  const [employee, setEmployee]       = React.useState<EmployeesType>()
  const [searchParams]                = useSearchParams()
  const employeeId                    = searchParams.get('employeeId')
  const companyId                     = searchParams.get('companyId')
  const {id}                          = useParams()
  const openClientsEmployeesDrawer    = useAppSelector((state) => state.modals.openClientsEmployeesDrawer)
  const dipatch                       = useAppDispatch()
  const windowSize                    = useSetWindowsSize()
  const [permissions, setPermissions] = React.useState<Permissions[]>()
  const editCompanyEmployee           = useAppSelector((state) => state.singleCompanyEdits.editClientsEmployee)

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        if (employeeId && companyId) {
          const employeeData    = await get(`company/CompanyEmployee?id=${employeeId}`, cookies.access_token)
          const permissionsData = await get('company/permission', cookies.access_token)
          if (isMounted) {
            setEmployee(employeeData)
            setPermissions(permissionsData)
            form.setFieldsValue(employeeData)
          }
        }
      } catch (err) {
        console.log(err)
      }
    })()
    return () => {
      isMounted = false
    }
  }, [employeeId, companyId, id, cookies.access_token, form, editCompanyEmployee])

  const editUser = async(values: EmployeesType) => {
    dipatch(setEditCompanyEmployee(!editCompanyEmployee))
    if(editCompanyEmployee) {
      values.companyId = employee?.companyId
      values.id = employee?._id
      await put('company/CompanyEmployee', values, cookies.access_token, fileList[0], setUploading, setFileList)
    }
  }
  const editablePermissions = permissions?.map((el) => ({label: el.name, value: el._id}))

  const employeePermissions = permissions?.filter(permission => employee?.permissions.includes(permission._id))
    .map(permission => ({ label: permission.name, value: permission._id }))
  const onClose = () => {
    dipatch(setEditCompanyEmployee(false))
    dipatch(setOpenClientsEmployeesDrawer(false))
  }

  return (
    <Drawer width={windowSize > 600 ? 640 : 300} placement='right' closable={false} onClose={onClose} open={openClientsEmployeesDrawer}>
      { employee &&
      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelColonMarginInlineEnd: 40,
            },
          },
        }}
      >

        <Form form={form} onFinish={editUser}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p className='site-description-item-profile-p' style={{ marginBottom: 24 }}>
                Darbuotojo Profilis
            </p>
            <Button htmlType='submit' loading={uploading} style={{display: 'flex', marginLeft: 'auto'}} type='link'>{!editCompanyEmployee ? 'Edit' : 'Save' }</Button>
          </div>
          <p className='site-description-item-profile-p'>Asmeninė informacija</p>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Col span={12}>
                <img
                  style={{width: '100%'}}
                  src={employee?.photo ? employee?.photo : '../../ClientsEmployeesPhotos/noUserImage.jpeg'}
                  alt='err' />
              </Col>
              {!editCompanyEmployee ? '' : <PhotoUploader setFileList={setFileList} fileList={fileList}/>}
            </div>
            <div>
              <Row>
                <Col span={12}>
                  {!editCompanyEmployee ?
                    <DescriptionItem title='Vardas' content={`${employee?.name}`} /> :
                    <Form.Item label='Vardas' labelAlign='left' name='name' initialValue={employee?.name} style={{width: '270px', padding: '0px'}} >
                      <Input/>
                    </Form.Item>
                  }
                  {!editCompanyEmployee ?
                    <DescriptionItem title='Pavardė' content={`${employee?.lastname}`} /> :
                    <Form.Item label='Pavardė' labelAlign='left' name='lastname' initialValue={employee?.lastname} style={{width: '270px', padding: '0px'}} >
                      <Input/>
                    </Form.Item>
                  }
                </Col>
              </Row>
              <Row>
              </Row>
              <Row>
                <Col span={12}>
                  {!editCompanyEmployee ?
                    <DescriptionItem title='Gimimo data' content={convertUTCtoLocalDate(employee?.birthday)} /> :
                    <Form.Item label='Gimimo data' labelAlign='left' name='birthday' initialValue={convertUTCtoLocalDate(employee?.birthday)} style={{width: '270px', padding: '0px'}} >
                      <Input/>
                    </Form.Item>
                  }
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  {!editCompanyEmployee ?
                    <DescriptionItem title='Pareigos' content={`${employee?.occupation}`} /> :
                    <Form.Item label='Pareigos' labelAlign='left' name='occupation' initialValue={employee?.occupation} style={{width: '270px', padding: '0px'}} >
                      <Input/>
                    </Form.Item>
                  }
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  {!editCompanyEmployee ?
                    <DescriptionItem title='Pastabos' content={`${employee?.note ? employee?.note : '-'}`} /> :
                    <Form.Item label='Pastabos' labelAlign='left' name='note' initialValue={employee?.note} style={{width: '270px', padding: '0px'}} >
                      <Input/>
                    </Form.Item>
                  }
                </Col>
              </Row>
            </div>
          </div>
          <Divider />
          <p className='site-description-item-profile-p'>Įgaliojimai</p>
          <Row>
            <Col span={12}>
              <Form.Item name='permissions'>
                <Checkbox.Group options={!editCompanyEmployee ? employeePermissions : editablePermissions} disabled={!editCompanyEmployee} />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <p className='site-description-item-profile-p'>Kontaktai</p>
          <Row>
            <Col span={12}>
              {!editCompanyEmployee ?
                <DescriptionItem title='El. Paštas' content={`${employee?.email}`} /> :
                <Form.Item label='El. Paštas' labelAlign='left' name='email' initialValue={employee?.email} style={{width: '270px', padding: '0px'}} >
                  <Input/>
                </Form.Item>
              }
            </Col>
            <Col span={12}>
              {!editCompanyEmployee ?
                <DescriptionItem title='Tel. Numeris' content={`${employee?.phone}`} /> :
                <Form.Item label='Tel. Numeris' labelAlign='left' name='phone' initialValue={employee?.phone} style={{width: '270px', padding: '0px'}} >
                  <Input/>
                </Form.Item>
              }
            </Col>
          </Row>
        </Form>
      </ConfigProvider>
      }
    </Drawer>
  )
}

export default ClientsEmployeeDrawer