/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React                                                                                from 'react'
import { get }                                                                              from '../../../Plugins/helpers'
import { useCookies }                                                                       from 'react-cookie'
import { Button, Card, Checkbox, Col, Form, FormInstance, Input, List, Modal, Row, Select } from 'antd'
import { useSearchParams }                                                                  from 'react-router-dom'
import { CompaniesType, EmployeesType, UserType }                                           from '../../../types/globalTypes'
import VisitRegistrationFormItem                                                            from './VisitRegistrationSelect'
import { PlusCircleOutlined }                                                               from '@ant-design/icons'
import VisitorsSelectCard                                                                   from './VisitorsSelectCard'
import VisitPurposeButtons                                                                  from './VisitPurposeButtons'
import VisitorsListItem                                                                     from './VisitorsListItem'
import { SearchProps }                                                                      from 'antd/es/input/Search'

type VisitRegistrationFormProps = {
  form: FormInstance<any>
  setClientsGuests: React.Dispatch<React.SetStateAction<string[]>>
  clientsGuests: string[];
  setCarPlates: React.Dispatch<React.SetStateAction<string[]>>
  carPlates: string[]
}

type CollocationsType = {
  [key: string]: string[];
}

const VisitRegistrationForm = ({form, setClientsGuests, clientsGuests, setCarPlates, carPlates}:VisitRegistrationFormProps) => {
  const [cookies]                                         = useCookies(['access_token'])
  const [dlcEmployees, setDlcEmployees]                   = React.useState<UserType[]>()
  const [allCompanies, setAllCompanies]                   = React.useState<CompaniesType[]>()
  const [searchParams, setSearchParams]                   = useSearchParams()
  const companyId                                         = searchParams.get('companyId')
  const addressId                                         = searchParams.get('addressId')
  const employeeId                                        = searchParams.get('employeeId')
  const [open, setOpen]                                   = React.useState(false)
  const [selectedVisitors, setSelectedVisitors]           = React.useState<EmployeesType[]>()
  const [searchEmployeeValue, setSearchEmployeeValue]     = React.useState<string | undefined>()
  const [clientsEmployees, setClientsEmployees]           = React.useState<EmployeesType[]>()
  const [isCompanySelected, setIsCompanySelected]         = React.useState(false)
  const [companiesColocations, setCompaniesCollocations]  = React.useState<CollocationsType[]>()
  const [guestsImput, setGuestsInput]                     = React.useState<string>('')
  const [carPlatesInput, setCarPlatesInput]               = React.useState<string>('')
  const { Search }                                        = Input

  React.useEffect(() => {
    (async () => {
      const companies =     await get('getCompanies', cookies.access_token)
      const dlcEmployees =  await get('getAllUsers', cookies.access_token)
      const singleCompany = await get(`SingleCompanyPage/${companyId}`, cookies.access_token)
      if(addressId === 'J13'){
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.J13)
      }else{
        setCompaniesCollocations(singleCompany?.data?.companyInfo?.T72)
      }
      setDlcEmployees(dlcEmployees.data)
      setAllCompanies(companies.data)
    })()
  }, [companyId, employeeId, selectedVisitors])

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
    setIsCompanySelected(true)
  }

  const selectAddress = (addressId: string) => {
    const companyId =   searchParams.get('companyId')
    const employeeId =  searchParams.get('employeeId')
    setSearchParams(`companyId=${companyId}&employeeId=${employeeId}&addressId=${addressId}`)
  }
  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchEmployeeValue(e.target.value.toLowerCase())
  }

  const permissions = selectedVisitors?.flatMap((el) => el.permissions) || []
  const uniquePermissions = permissions.filter((permission, index, arr) => {
    return arr.indexOf(permission) === index
  })

  const canBiringCompany = uniquePermissions.includes('Įleisti Trečius asmenis')

  const onClientsGuestsAddition: SearchProps['onSearch'] = (value) => {
    setClientsGuests([...clientsGuests, value])
    setGuestsInput('')
  }

  const onCarPlatesAddition: SearchProps['onSearch'] = (value) => {
    setCarPlates([...carPlates, value])
    setCarPlatesInput('')
  }

  const removeCarPlates = (index: number) => {
    const filtered = carPlates.filter((el, i) => index !== i)
    setCarPlates(filtered)
  }

  const removeGuest = (index: number) => {
    const filtered = clientsGuests.filter((el, i) => index !== i)
    setClientsGuests(filtered)
  }
  return (
    <div>
      <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Form.Item style={{width: '100%'}} name='visitingClient' rules={[{ required: true, message: 'Būtina pasirinkti įmonę' }]} >
          <Select
            showSearch
            placeholder='Pasirinkite įmonę'
            onSelect={selectCompany}
            allowClear
            options={companyNames}
          >
          </Select>
        </Form.Item>
        {isCompanySelected &&
        <>
          <VisitRegistrationFormItem
            formItemName={'visitAddress'}
            placeholder={'Pasirinkite Adresą'}
            slectOptions={addresses}
            onSelect={selectAddress}
            fieldValue={'visitingClient'}
            updateValue={(prevValues, currentValues) => prevValues.visitingClient !== currentValues.visitingClient}
            validationMessage={'Butina pasirinkti adresą'}
          />
          <VisitRegistrationFormItem
            formItemName={'dlcEmployees'}
            placeholder={'Pasirinkite Lydintį'}
            slectOptions={DLCEmployees}
            fieldValue={'visitAddress'}
            updateValue={(prevValues, currentValues) => prevValues.visitAddress !== currentValues.visitAddress}
            validationMessage={'Būtina pasirinkti lydintyjį'}
          />
        </>
        }
      </div>
      <Button icon={<PlusCircleOutlined />} onClick={() => setOpen(true)}>Pridėti Lankytoją</Button>
      {
        selectedVisitors && selectedVisitors?.length > 0 &&
        <Card title={'Lankytojai'}style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
          <Form.List name='visitors'>
            {(fields, {remove}) => (
              <List
                dataSource={fields}
                renderItem={(item) => <VisitorsListItem form={form} item={item} remove={remove}/>}
              />
            )}
          </Form.List>
        </Card>
      }
      {uniquePermissions.length > 0 &&
        <Card style={{margin: '10px', backgroundColor: '#f9f9f9'}} title={'Vizito Tikslas'}>
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            {uniquePermissions?.map((el, i) => <VisitPurposeButtons buttonText={el} key={i} buttonWidth={(100 / permissions.length) - 5}/>)}
          </div>
        </Card>
      }
      {
        selectedVisitors && selectedVisitors?.length > 0 &&
        <Card title={'Kolokacijos'} style={{margin: '10px', backgroundColor: '#f9f9f9'}} >
          <div style={{display: 'flex', justifyContent: 'space-around', height: '100%'}}>
            {companiesColocations?.map((el, i) => {
              const objEntries = Object.entries(el)
              return(
                <Card style={{margin: '10px'}} key={i} title={objEntries[0][0]}>
                  <Form.Item name={['visitCollocation', objEntries[0][0]]} >
                    <Checkbox.Group options={objEntries[0][1]} key={i}/>
                  </Form.Item>
                </Card>
              )})
            }
          </div>
        </Card>
      }
      { selectedVisitors && selectedVisitors?.length > 0 && !canBiringCompany &&<div style={{color: 'red'}}>Negali būti palydos</div>}
      {
        selectedVisitors && selectedVisitors?.length > 0 && canBiringCompany &&
          <Card title='Pridėti palydą' style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
            <Search
              value={guestsImput}
              onChange={(e) => setGuestsInput(e.target.value)}
              placeholder='Pridėti palydą'
              onSearch={onClientsGuestsAddition}
              enterButton={<div>Pridėti</div>}
            />
            {
              clientsGuests.length > 0 &&
              <List
                style={{marginTop: '50px'}}
                dataSource={clientsGuests}
                renderItem={(item, index) =>
                  <List.Item actions={[<Button type='link' onClick={() => removeGuest(index)}>Ištrinti</Button>]}>
                    <List.Item.Meta style={{flex: '0 0'}} title={item}/>
                  </List.Item>}
              />
            }
          </Card>

      }
      {
        selectedVisitors && selectedVisitors?.length > 0 && addressId === 'T72' &&
          <Card title='Pridėti automobilį' style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
            <Search
              value={carPlatesInput}
              onChange={(e) => setCarPlatesInput(e.target.value)}
              placeholder='Pridėti automobilį'
              onSearch={onCarPlatesAddition}
              enterButton={<div>Pridėti</div>}
            />
            {
              carPlates.length > 0 &&
              <List
                style={{marginTop: '50px'}}
                dataSource={carPlates}
                renderItem={(item, index) =>
                  <List.Item actions={[<Button onClick={() => removeCarPlates(index)} type='link'>Ištrinti</Button>]}>
                    <List.Item.Meta style={{flex: '0 0'}} title={item}/>
                  </List.Item>}
              />
            }
          </Card>

      }
      <div>
        <Modal
          title='Modal 1000px width'
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={'85%'}
        >
          <Input onChange={searchEmployee}/>
          <Row gutter={[16, 16]}>
            {clientsEmployees?.map((employee) => (!searchEmployeeValue || employee.name.toLowerCase().includes(searchEmployeeValue)) &&
            <Col key={employee.employeeId} span={6}>
              <VisitorsSelectCard
                form={form}
                setSelectedVisitors={setSelectedVisitors}
                name={employee.name}
                lastName={employee.lastName}
                occupation={employee.occupation}
                item={employee}
              />
            </Col>
            )}
          </Row>
        </Modal>
      </div>
    </div>
  )
}

export default VisitRegistrationForm