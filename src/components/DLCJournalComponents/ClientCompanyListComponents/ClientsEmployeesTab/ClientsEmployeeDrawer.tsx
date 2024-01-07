/* eslint-disable max-len */
import React                                                                    from 'react'
import { Button, Checkbox, Col, Divider, Drawer, Form, Input, Row, UploadFile } from 'antd'
import { useForm }                                                              from 'antd/es/form/Form'
import { EmployeesType }                                                        from '../../../../types/globalTypes'
import { convertUTCtoLocalDate, get, post, uploadPhoto }                        from '../../../../Plugins/helpers'
import { useCookies }                                                           from 'react-cookie'
import { useParams, useSearchParams }                                           from 'react-router-dom'
import PhotoUploader                                                            from '../../../UniversalComponents/PhotoUploader/PhotoUploader'
import { useAppDispatch, useAppSelector }                                       from '../../../../store/hooks'
import { setOpenClientsEmployeesDrawer }                                        from '../../../../auth/ModalStateReducer/ModalStateReducer'
import useSetWindowsSize from '../../../../Plugins/useSetWindowsSize'

type ClientsEmployeeDrawerProps = {
    companyName:            string | undefined;
    setEditClientsEmployee: React.Dispatch<React.SetStateAction<boolean>>
    editClientsEmployee:    boolean
}

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

const ClientsEmployeeDrawer = ({ companyName, setEditClientsEmployee, editClientsEmployee}: ClientsEmployeeDrawerProps) => {
  const [form]                      = useForm()
  const options                     = ['Įnešti įrangą', 'Išnešti įrangą', 'Komutavimas', 'Konfiguracija', 'Įleisti Trečius asmenis']
  const [fileList, setFileList]     = React.useState<UploadFile[]>([])
  const [cookies]                   = useCookies(['access_token'])
  const [uploading, setUploading]   = React.useState(false)
  const [employee, setEmployee]     = React.useState<EmployeesType>()
  const [searchParams]              = useSearchParams()
  const employeeId                  = searchParams.get('employeeId')
  const companyId                   = searchParams.get('companyId')
  const {id}                        = useParams()
  const openClientsEmployeesDrawer  = useAppSelector((state) => state.modals.openClientsEmployeesDrawer)
  const dipatch                     = useAppDispatch()
  const windowSize                  = useSetWindowsSize()
  React.useEffect(() => {
    (async () => {
      try{
        if(employeeId && companyId){
          const res  = await get(`getClientsEmployee?companyId=${id}&employeeId=${employeeId}`, cookies.access_token)
          setEmployee(res.data)
        }
      }catch(err){
        console.log(err)
      }
    })()
  },[editClientsEmployee, openClientsEmployeesDrawer, uploading])

  const editUser = async(values: EmployeesType) => {
    setEditClientsEmployee(!editClientsEmployee)
    if(editClientsEmployee) {
      values.companyId = employee?.companyId
      values.employeeId = employee?.employeeId
      await post('updateClientsEmployee', values, cookies.access_token)
      if(fileList[0]){
        uploadPhoto(fileList[0], setUploading, setFileList, `updateClientsEmployeesPhoto?companyName=${companyName}&companyId=${employee?.companyId}&employeeId=${employee?.employeeId}`)
      }
    }
  }
  const onClose = () => {
    setEditClientsEmployee(false)
    dipatch(setOpenClientsEmployeesDrawer(false))
  }

  return (
    <Drawer width={windowSize > 600 ? 640 : 300} placement='right' closable={false} onClose={onClose} open={openClientsEmployeesDrawer}>
      { employee &&
        <Form form={form} onFinish={editUser}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p className='site-description-item-profile-p' style={{ marginBottom: 24 }}>
                Darbuotojo Profilis
            </p>
            <Button htmlType='submit' loading={uploading} style={{display: 'flex', marginLeft: 'auto'}} type='link'>{!editClientsEmployee ? 'Edit' : 'Save' }</Button>
          </div>
          <p className='site-description-item-profile-p'>Asmeninė informacija</p>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Col span={12}>
                <img
                  style={{width: '100%'}}
                  src={`../../ClientsEmployeesPhotos/${employee?.employeePhoto ? employee?.employeePhoto : 'noUserImage.jpeg'}`}
                  alt='err' />
              </Col>
              {!editClientsEmployee ? '' : <PhotoUploader setFileList={setFileList} fileList={fileList}/>}
            </div>
            <div>
              <Row>
                <Col span={12}>
                  {!editClientsEmployee ?
                    <DescriptionItem title='Vardas' content={`${employee?.name}`} /> :
                    <Form.Item label='Vardas' labelAlign='left' name='name' initialValue={employee?.name} style={{width: '270px', padding: '0px'}} >
                      <Input/>
                    </Form.Item>
                  }
                  {!editClientsEmployee ?
                    <DescriptionItem title='Pavardė' content={`${employee?.lastName}`} /> :
                    <Form.Item label='Pavardė' labelAlign='left' name='lastName' initialValue={employee?.lastName} style={{width: '270px', padding: '0px'}} >
                      <Input/>
                    </Form.Item>
                  }
                </Col>
              </Row>
              <Row>
              </Row>
              <Row>
                <Col span={12}>
                  {!editClientsEmployee ?
                    <DescriptionItem title='Gimimo data' content={convertUTCtoLocalDate(employee?.birthday)} /> :
                    <Form.Item label='Gimimo data' labelAlign='left' name='birthday' initialValue={convertUTCtoLocalDate(employee?.birthday)} style={{width: '270px', padding: '0px'}} >
                      <Input/>
                    </Form.Item>
                  }
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  {!editClientsEmployee ?
                    <DescriptionItem title='Pareigos' content={`${employee?.occupation}`} /> :
                    <Form.Item label='Pareigos' labelAlign='left' name='occupation' initialValue={employee?.occupation} style={{width: '270px', padding: '0px'}} >
                      <Input/>
                    </Form.Item>
                  }
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  {!editClientsEmployee ?
                    <DescriptionItem title='Pastabos' content={`${employee?.notes ? employee?.notes : '-'}`} /> :
                    <Form.Item label='Pastabos' labelAlign='left' name='notes' initialValue={employee?.notes} style={{width: '270px', padding: '0px'}} >
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
              <Form.Item name='permissions' initialValue={employee?.permissions}>
                <Checkbox.Group options={options} disabled={!editClientsEmployee} />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <p className='site-description-item-profile-p'>Kontaktai</p>
          <Row>
            <Col span={12}>
              {!editClientsEmployee ?
                <DescriptionItem title='El. Paštas' content={`${employee?.email}`} /> :
                <Form.Item label='El. Paštas' labelAlign='left' name='email' initialValue={employee?.email} style={{width: '270px', padding: '0px'}} >
                  <Input/>
                </Form.Item>
              }
            </Col>
            <Col span={12}>
              {!editClientsEmployee ?
                <DescriptionItem title='Tel. Numeris' content={`${employee?.phoneNr}`} /> :
                <Form.Item label='Tel. Numeris' labelAlign='left' name='phoneNr' initialValue={employee?.phoneNr} style={{width: '270px', padding: '0px'}} >
                  <Input/>
                </Form.Item>
              }
            </Col>
          </Row>
        </Form>
      }
    </Drawer>
  )
}

export default ClientsEmployeeDrawer