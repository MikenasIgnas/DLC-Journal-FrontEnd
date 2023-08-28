/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                                                                from 'react'
import { useCookies }                                                       from 'react-cookie'
import { useSearchParams }                                                  from 'react-router-dom'
import { get, post, uploadPhoto }                                           from '../../Plugins/helpers'
import { Avatar, Button, Card, Checkbox, Divider, Form, Input, UploadFile } from 'antd'
import { EmployeesType }                                                    from '../../types/globalTypes'
import ClientsEmployeesDataDisplay                                          from '../../components/ClientsEmployeesDisplay'
import { useForm }                                                          from 'antd/es/form/Form'
import PhotoUploader                                                        from '../../components/companyAdditionComponent/CompanyPhotoUploader'



const SingleClientsEmployeePage = () => {
  const [searchParams] =                useSearchParams()
  const companyId =                     searchParams.get('companyId')
  const employeeId =                    searchParams.get('employeeId')
  const [cookies] =                     useCookies(['access_token'])
  const [employee, setEmployee] =       React.useState<EmployeesType | undefined>()
  const [companyName, setCompanyName] = React.useState()
  const [edit, setEdit] =               React.useState(false)
  const [fileList, setFileList] =       React.useState<UploadFile[]>([])
  const [uploading, setUploading] =     React.useState(false)

  React.useEffect(() => {
    (async () => {
      const clientsEmployee = await get(`getClientsEmployee?companyId=${companyId}&employeeId=${employeeId}`, cookies.access_token)
      const employeesCompanyName = await get(`getClientsEmployeesCompanyName/${companyId}`, cookies.access_token)
      setEmployee(clientsEmployee.data)
      setCompanyName(employeesCompanyName.data)
    })()
  }, [edit])

  const options = ['Įnešti įrangą', 'Išnešti įrangą', 'Komutavimas', 'Konfiguracija', 'Įleisti trečius asmenis']
  const [form] = useForm()

  const editUser = async(values: EmployeesType) => {
    setEdit(!edit)
    if(edit) {
      if(companyId && employeeId){
        values.companyId = companyId
        values.employeeId = employeeId
        await post('updateClientsEmployee', values, cookies.access_token)
        uploadPhoto(fileList[0], setUploading, setFileList, `uploadCliesntEmployeesPhoto?companyName=${companyName}&companyId=${companyId}`)
      }
    }
  }

  return(
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Card style={{ width: 800, height: 500 }} loading={uploading}>
        { employee &&
        <Form onFinish={editUser} form={form}>
          <Button loading={uploading} htmlType='submit' style={{display: 'flex', marginLeft: 'auto'}} type='link'>{!edit ? 'Edit' : 'Save' }</Button>
          <div style={{display: 'flex'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
              {<Avatar size={150} shape='square' src={<img src={`../ClientsEmployeesPhotos/${companyName}companyId${companyId}employeeId${employeeId}.jpeg`} alt='err' />} />}
              {!edit
                ?
                <div>{employee?.name} {employee?.lastName}</div>
                :
                <div>
                  <PhotoUploader setFileList={setFileList} fileList={fileList}/>
                  <div style={{display: 'flex'}}>
                    <Form.Item name='name' initialValue={employee?.name}><Input/></Form.Item>
                    <Form.Item name='lastName' initialValue={employee?.lastName} ><Input/></Form.Item>
                  </div>
                </div>
              }
            </div>
            <Divider type='vertical' style={{height: '150px'}} />
            <div style={{width: '100%'}}>
              <div>
                <ClientsEmployeesDataDisplay label={'Darbuotojo įmonė: '} employeeData={companyName} formItemName={'companay'}/>
                <ClientsEmployeesDataDisplay edit={edit} label={'Email: '} employeeData={employee?.email} formItemName={'email'}/>
              </div>
              <Divider />
              <div>
                <ClientsEmployeesDataDisplay edit={edit} label={'Mobilus Tel: '} employeeData={employee?.phoneNr} formItemName={'phoneNr'}/>
                <ClientsEmployeesDataDisplay edit={edit} label={'Gimimo data: '} employeeData={employee?.birthday} formItemName={'birthday'}/>
                <ClientsEmployeesDataDisplay edit={edit} label={'Pareigos: '} employeeData={employee?.occupation} formItemName={'occupation'}/>
                <ClientsEmployeesDataDisplay edit={edit} label={'Pastabos: '} employeeData={employee?.notes} formItemName={'notes'}/>
              </div>
            </div>
          </div>
          <Divider/>
          <Form.Item name='permissions' initialValue={employee?.permissions} >
            <Checkbox.Group style={{width: '100%',display: 'flex', justifyContent: 'space-evenly'}} disabled={!edit} options={options} />
          </Form.Item>
        </Form>
        }
      </Card>
    </div>
  )
}

export default SingleClientsEmployeePage