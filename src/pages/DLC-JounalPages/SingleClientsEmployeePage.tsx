/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                                                                from 'react'
import { useCookies }                                                       from 'react-cookie'
import { useSearchParams }                                                  from 'react-router-dom'
import { convertUTCtoLocalDate, get }                                           from '../../Plugins/helpers'
import { Avatar, Button, Card, Checkbox, Divider, Form, Input, UploadFile } from 'antd'
import { EmployeesType }                                                    from '../../types/globalTypes'
import { useForm }                                                          from 'antd/es/form/Form'
import PhotoUploader                                                        from '../../components/UniversalComponents/PhotoUploader/PhotoUploader'
import ClientsEmployeesDataDisplay                                          from '../../components/DLCJournalComponents/ClientCompanyListComponents/ClientsCollocationsTab/ClientsEmployeesDisplay'

const SingleClientsEmployeePage = () => {
  const [searchParams]                = useSearchParams()
  const companyId                     = searchParams.get('companyId')
  const employeeId                    = searchParams.get('employeeId')
  const [cookies]                     = useCookies(['access_token'])
  const [employee, setEmployee]       = React.useState<EmployeesType | undefined>()
  const [companyName, setCompanyName] = React.useState()
  const [edit, setEdit]               = React.useState(false)
  const [fileList, setFileList]       = React.useState<UploadFile[]>([])
  // const [uploading, setUploading]     = React.useState(false)

  React.useEffect(() => {
    (async () => {
      const clientsEmployee       = await get(`getClientsEmployee?companyId=${companyId}&employeeId=${employeeId}`, cookies.access_token)
      const employeesCompanyName  = await get(`getClientsEmployeesCompanyName?companyId=${companyId}`, cookies.access_token)
      setEmployee(clientsEmployee.data)
      setCompanyName(employeesCompanyName.data)
    })()
  }, [edit])

  const options = ['Įnešti įrangą', 'Išnešti įrangą', 'Komutavimas', 'Konfiguracija', 'Įleisti Trečius asmenis']
  const [form] = useForm()

  const editUser = async(values: EmployeesType) => {
    setEdit(!edit)
    if(edit) {
      if(companyId && employeeId){
        values.companyId = companyId
        values._id = employeeId
        // await post(fileList[0], values, setUploading, setFileList, `uploadCliesntEmployeesPhoto?companyName=${companyName}&companyId=${companyId}`, cookies.access_token)
      }
    }
  }

  return(
    <div className='SingleClientsEmployeePageContainer'>
      <Card className='SingleClientsEmployeeCard'>
        { employee &&
        <Form onFinish={editUser} form={form}>
          <Button htmlType='submit' className='EditButton' type='link'>{!edit ? 'Edit' : 'Save' }</Button>
          <div className='DisplayFlex'>
            <div className='ClientsEmployeesContainer'>
              {<Avatar size={150} shape='square' src={<img src={`../ClientsEmployeesPhotos/${companyName}companyId${companyId}employeeId${employeeId}.jpeg`} alt='err' />} />}
              {!edit
                ?
                <div>{employee?.name} {employee?.lastname}</div>
                :
                <div>
                  <PhotoUploader setFileList={setFileList} fileList={fileList}/>
                  <div className='DisplayFlex'>
                    <Form.Item name='name' initialValue={employee?.name}><Input/></Form.Item>
                    <Form.Item name='lastName' initialValue={employee?.lastname} ><Input/></Form.Item>
                  </div>
                </div>
              }
            </div>
            <Divider type='vertical' className='Divider' />
            <div className='ClientsEployeesInfoContainer'>
              <div>
                <ClientsEmployeesDataDisplay label={'Darbuotojo įmonė: '} employeeData={companyName} formItemName={'companay'}/>
                <ClientsEmployeesDataDisplay edit={edit} label={'Email: '} employeeData={employee?.email} formItemName={'email'}/>
              </div>
              <Divider />
              <div>
                <ClientsEmployeesDataDisplay edit={edit} label={'Mobilus Tel: '} employeeData={employee?.phone} formItemName={'phoneNr'}/>
                <ClientsEmployeesDataDisplay edit={edit} label={'Gimimo data: '} employeeData={convertUTCtoLocalDate(employee?.birthday)} formItemName={'birthday'}/>
                <ClientsEmployeesDataDisplay edit={edit} label={'Pareigos: '} employeeData={employee?.occupation} formItemName={'occupation'}/>
                <ClientsEmployeesDataDisplay edit={edit} label={'Pastabos: '} employeeData={employee?.note} formItemName={'note'}/>
              </div>
            </div>
          </div>
          <Divider/>
          <Form.Item name='permissions' initialValue={employee?.permissions} >
            <Checkbox.Group className='PermissionsCheckboxes' disabled={!edit} options={options} />
          </Form.Item>
        </Form>
        }
      </Card>
    </div>
  )
}

export default SingleClientsEmployeePage