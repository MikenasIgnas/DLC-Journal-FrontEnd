/* eslint-disable max-len */
import React                                      from 'react'
import { get }                                    from '../../../Plugins/helpers'
import { useCookies }                             from 'react-cookie'
import { Button, Form, Select }                   from 'antd'
import { useSearchParams }                        from 'react-router-dom'
import { CompaniesType, EmployeesType, UserType } from '../../../types/globalTypes'
import VisitRegistrationFormItem                  from './VisitRegistrationSelect'

type VisitRegistrationFormPRops = {
    setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const layout = {
  labelCol:   { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const VisitRegistrationForm = ({setCurrent}: VisitRegistrationFormPRops) => {
  const [cookies] =                               useCookies(['access_token'])
  const [dlcEmployees, setDlcEmployees] =         React.useState<UserType[]>()
  const [allCompanies, setAllCompanies] =         React.useState<CompaniesType[]>()
  const [form] =                                  Form.useForm()
  const [searchParams, setSearchParams] =         useSearchParams()
  const [clientsEmployees, setClientsEmployees] = React.useState<EmployeesType[]>()

  React.useEffect(() => {
    (async () => {
      const companies = await get('getCompanies', cookies.access_token)
      const dlcEmployees = await get('getAllUsers', cookies.access_token)
      setDlcEmployees(dlcEmployees.data)
      setAllCompanies(companies.data)
    })()
  }, [])

  const onFinish = (values: any) => {
    console.log(values)
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
    return { value: el.name, label: el.name, clientsEmployeesId: el.employeeId}
  })

  const addresses = [
    {
      value: 'J13',
      label: 'J13',
    },
    {
      value: 'T72',
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

  return (
    <div style={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'center',
      alignItems:     'center',
    }}>
      <Form
        {...layout}
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name='visitingClient' label='Įmonė' rules={[{ required: true }]}>
          <Select
            placeholder='Select a option and change input text above'
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
          fieldValue={'visitingClient'}
          onSelect={selectClientsEmployee}
          updateValue={(prevValues, currentValues) => prevValues.visitingClient !== currentValues.visitingClient}
        />
        <VisitRegistrationFormItem
          formItemName={'visitAddress'}
          placeholder={'Pasirinkite įmonę'}
          formItemLabel={'Adresas'}
          slectOptions={addresses}
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
        <Form.Item {...tailLayout}>
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