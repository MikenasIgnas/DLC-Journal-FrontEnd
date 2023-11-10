/* eslint-disable max-len */
import React                                      from 'react'
import { get }                                    from '../../../Plugins/helpers'
import { useCookies }                             from 'react-cookie'
import { Button, Form, Select }                   from 'antd'
import { useSearchParams }                        from 'react-router-dom'
import { CompaniesType, EmployeesType, UserType } from '../../../types/globalTypes'
import VisitRegistrationFormItem                  from './VisitRegistrationSelect'
import EscortAdder                                from './EscortAdder'

type VisitRegistrationFormPRops = {
    setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const VisitRegistrationForm = ({setCurrent}: VisitRegistrationFormPRops) => {
  const [cookies] =                               useCookies(['access_token'])
  const [dlcEmployees, setDlcEmployees] =         React.useState<UserType[]>()
  const [allCompanies, setAllCompanies] =         React.useState<CompaniesType[]>()
  const [form] =                                  Form.useForm()
  const [searchParams, setSearchParams] =         useSearchParams()
  const [clientsEmployees, setClientsEmployees] = React.useState<EmployeesType[]>()
  const [canBringCompany, setCamBringCompany] =   React.useState<boolean | undefined>()

  React.useEffect(() => {
    (async () => {
      const companies = await get('getCompanies', cookies.access_token)
      const dlcEmployees = await get('getAllUsers', cookies.access_token)
      setDlcEmployees(dlcEmployees.data)
      setAllCompanies(companies.data)
    })()
  }, [])

  const onFinish = (values: any) => {
    localStorage.setItem('visitDetails', JSON.stringify(values))
    setCurrent(1)
  }

  const onReset = () => {
    form.resetFields()
  }

  const companyNames = allCompanies?.map((el)=> {
    return { value: el.companyInfo.companyName, label: el.companyInfo.companyName, info: el.companyInfo, companyId: el.id}
  })

  const DLCEmployees = dlcEmployees?.map((el) => {
    return {value: el.username, label: el.username, employeeId: el.key}
  })

  const visitors = clientsEmployees?.map((el) => {
    return { value: el.name, label: el.name, clientsEmployeesId: el.employeeId, permissions: el.permissions}
  })
  const addresses = [
    {
      value: '1',
      label: 'J13',
    },
    {
      value: '2',
      label: 'T72',
    },
  ]
  const selectCompany = async(_: string, data: any) => {
    setSearchParams(`companyId=${data.companyId}`, { replace: true })
    const companiesEmployees = await get(`getAllClientsEmployees?companyId=${data.companyId}`, cookies.access_token)
    setClientsEmployees(companiesEmployees.data)
  }

  const selectClientsEmployee = (_: string, data: any) => {
    const companyId = searchParams.get('companyId')
    setSearchParams(`companyId=${companyId}&employeeId=${data.clientsEmployeesId}`)
  }

  const selectAddress = (addressId: string) => {
    const companyId = searchParams.get('companyId')
    const employeeId = searchParams.get('employeeId')
    setSearchParams(`companyId=${companyId}&employeeId=${employeeId}&addressId=${addressId}`)
  }

  const onChange = (value: string) => {
    const selectedVisitor = clientsEmployees?.filter((el) => el.name === value)
    const permissions = selectedVisitor?.[0].permissions
    const canBringCompany = permissions?.includes('Įleisti Trečius asmenis')
    setCamBringCompany(canBringCompany)
  }

  return (
    <div style={{
      width:           '100%',
      display:         'flex',
      justifyContent:  'center',
      alignItems:      'center',
      backgroundColor: '#ffffff',
    }}>
      <Form
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
      >
        <Form.Item name='visitingClient' label={<div style={{width: '120px'}}>Įmonė</div>} rules={[{ required: true }]} colon={false} labelAlign={'left'}>
          <Select
            showSearch
            placeholder='Pasirinkite įmonę'
            style={{width: '200px'}}
            onSelect={selectCompany}
            allowClear
            options={companyNames}
          >
          </Select>
        </Form.Item>
        <VisitRegistrationFormItem
          formItemName={'clientsEmployees'}
          placeholder={'Pasirinkite įmonės darbuotoją'}
          formItemLabel={'clientsEmployees'}
          slectOptions={visitors}
          onChange={onChange}
          fieldValue={'visitingClient'}
          onSelect={selectClientsEmployee}
          updateValue={(prevValues, currentValues) => prevValues.visitingClient !== currentValues.visitingClient}
        />
        <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.visitingClient !== currentValues.visitingClient}>
          {({ getFieldValue }) =>
            getFieldValue('clientsEmployees') && (
              <Form.Item label={<div style={{width: '120px'}}>Palyda</div>} name={'escortsName'} colon={false} labelAlign={'left'}>
                {canBringCompany ? <EscortAdder/> : <div style={{color: 'red'}}>Negali Būti palydos</div>}
              </Form.Item>
            )}
        </Form.Item>
        <VisitRegistrationFormItem
          formItemName={'visitAddress'}
          placeholder={'Pasirinkite įmonę'}
          formItemLabel={'Adresas'}
          slectOptions={addresses}
          onSelect={selectAddress}
          fieldValue={'clientsEmployees'}
          updateValue={(prevValues, currentValues) => prevValues.clientsEmployees !== currentValues.clientsEmployees}
        />
        <VisitRegistrationFormItem
          formItemName={'dlcEmployees'}
          placeholder={'Pasirinkite Lydintį'}
          formItemLabel={'dlcEmployees'}
          slectOptions={DLCEmployees}
          fieldValue={'visitAddress'}
          updateValue={(prevValues, currentValues) => prevValues.visitAddress !== currentValues.visitAddress}
        />
        <Form.Item>
          <Button htmlType='button' onClick={onReset}>
          Reset
          </Button>
        </Form.Item>
        <Button htmlType='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default VisitRegistrationForm