/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                                                from 'react'
import { get }                                              from '../../../Plugins/helpers'
import { useCookies }                                       from 'react-cookie'
import { Button, Form, Input, List, Modal, Select, theme }  from 'antd'
import { useSearchParams }                                  from 'react-router-dom'
import { CompaniesType, EmployeesType, UserType }           from '../../../types/globalTypes'
import VisitRegistrationFormItem                            from './VisitRegistrationSelect'
import { PlusCircleOutlined }                               from '@ant-design/icons'
import VisitorsSelectCard                                   from './VisitorsSelectCard'

type VisitRegistrationFormProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const VisitRegistrationForm = ({setCurrent}: VisitRegistrationFormProps) => {
  const [cookies]                               = useCookies(['access_token'])
  const [dlcEmployees, setDlcEmployees]         = React.useState<UserType[]>()
  const [allCompanies, setAllCompanies]         = React.useState<CompaniesType[]>()
  const [form]                                  = Form.useForm()
  const [searchParams, setSearchParams]         = useSearchParams()
  const [clientsEmployees, setClientsEmployees] = React.useState<EmployeesType[]>()
  const { token }                               = theme.useToken()
  const companyId                               = searchParams.get('companyId')
  const employeeId                              = searchParams.get('employeeId')
  const [open, setOpen]                         = React.useState(false)

  const [originalClientsEmployees, setOriginalClientsEmployees] = React.useState<EmployeesType[]>()

  const [selectedVisitors, setSelectedVisitors] = React.useState<EmployeesType[]>()

  const contentStyle: React.CSSProperties = {
    lineHeight:      '260px',
    textAlign:       'center',
    color:           token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius:    token.borderRadiusLG,
    border:          `1px dashed ${token.colorBorder}`,
    marginTop:       16,
    width:           '100%',
  }

  React.useEffect(() => {
    (async () => {
      const companies = await get('getCompanies', cookies.access_token)
      const dlcEmployees = await get('getAllUsers', cookies.access_token)
      setDlcEmployees(dlcEmployees.data)
      setAllCompanies(companies.data)
    })()
  }, [companyId, employeeId])

  const onFinish = (values: any) => {
    localStorage.setItem('visitDetails', JSON.stringify(values))
    setCurrent(1)
  }

  const companyNames = allCompanies?.map((el)=> {
    return { ...el, value: el.companyInfo.companyName, label: el.companyInfo.companyName}
  })

  const DLCEmployees = dlcEmployees?.map((el) => {
    return {...el, value: el.username, label: el.username}
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

  const selectCompany = async(_: string, option: any) => {
    setSearchParams(`companyId=${option.id}`, { replace: true })
    const companiesEmployees = await get(`getAllClientsEmployees?companyId=${option.id}`, cookies.access_token)
    setClientsEmployees(companiesEmployees.data)
    setOriginalClientsEmployees(companiesEmployees.data)
  }
  const selectAddress = (addressId: string) => {
    const companyId =   searchParams.get('companyId')
    const employeeId =  searchParams.get('employeeId')
    setSearchParams(`companyId=${companyId}&employeeId=${employeeId}&addressId=${addressId}`)
  }
  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchValue = e.target.value.toLowerCase()

    if (searchValue === '') {
      setClientsEmployees(originalClientsEmployees)
    } else {
      const searchResult = originalClientsEmployees?.filter((el) =>
        el.name.toLowerCase().includes(searchValue)
      )
      setClientsEmployees(searchResult)
    }
  }

  const indetificationOptions = [
    {value: 'Pasas', labe: 'Pasas'},
    {value: 'Tapatybės Kortelė', label: 'Tapatybės Kortelė'},
    {value: 'Darbuotojo Pažymėjimas', labe: 'Darbuotojo Pažymėjimas'},
  ]

  const onIdentificationSelect = (value:string, employeeId: string | undefined) => {
    const itemIndex = selectedVisitors?.findIndex((vis) => vis.employeeId === employeeId)
    setSelectedVisitors((prevSelectedVisitors) => {
      if (!prevSelectedVisitors) return prevSelectedVisitors

      return prevSelectedVisitors.map((vis, index) =>
        index === itemIndex ? { ...vis, identification: value } : vis
      )
    })
  }
  console.log(selectedVisitors)
  return (
    <Form
      form={form}
      name='control-hooks'
      onFinish={onFinish}
      style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
    >
      <div style={contentStyle}>
        <Form.Item name='visitingClient' rules={[{ required: true, message: 'Būtina pasirinkti įmonę' }]} >
          <Select
            showSearch
            placeholder='Pasirinkite įmonę'
            onSelect={selectCompany}
            allowClear
            options={companyNames}
          >
          </Select>
        </Form.Item>
        <VisitRegistrationFormItem
          formItemName={'visitAddress'}
          placeholder={'Pasirinkite Adresą'}
          slectOptions={addresses}
          onSelect={selectAddress}
          fieldValue={'clientsEmployees'}
          updateValue={(prevValues, currentValues) => prevValues.clientsEmployees !== currentValues.clientsEmployees}
          validationMessage={'Butina pasirinkti adresą'}
        />
        <Button icon={<PlusCircleOutlined />} onClick={() => setOpen(true)}>Pridėti Lankytoją</Button>
        <div>
          <Modal
            title='Modal 1000px width'

            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={500}
          >
            <Input onChange={searchEmployee}/>
            {clientsEmployees?.map((employee) => <VisitorsSelectCard setSelectedVisitors={setSelectedVisitors} name={employee.name} lastName={employee.lastName} occupation={employee.occupation} item={employee}/>)}
          </Modal>
        </div>
        {selectedVisitors && selectedVisitors?.length > 0 &&
          <List
            className='demo-loadmore-list'
            itemLayout='horizontal'
            dataSource={selectedVisitors}
            renderItem={(item) => (
              <List.Item
                actions={[<a key='list-loadmore-edit'>edit</a>, <a key='list-loadmore-more'>more</a>]}
              >
                <List.Item.Meta
                  title={<a href='https://ant.design'>{item.name}</a>}
                  description={item.occupation}
                />
                <div>content</div>
                <Select
                  style={{width: '200px'}}
                  onChange={(value) => onIdentificationSelect(value, item.employeeId)}
                  options={indetificationOptions}/>
              </List.Item>
            )}
          />
        }
        <VisitRegistrationFormItem
          formItemName={'dlcEmployees'}
          placeholder={'Pasirinkite Lydintį'}
          slectOptions={DLCEmployees}
          fieldValue={'visitAddress'}
          updateValue={(prevValues, currentValues) => prevValues.visitAddress !== currentValues.visitAddress}
          validationMessage={'Būtina pasirinkti lydintyjį'}
        />
      </div>
      <Button style={{marginTop: '20px'}} htmlType='submit'>Kitas</Button>
    </Form>
  )
}

export default VisitRegistrationForm
