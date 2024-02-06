/* eslint-disable max-len */
import React                                            from 'react'
import { DeleteOutlined, EditOutlined, SaveOutlined }   from '@ant-design/icons'
import { Button, Form, Input, List, Tag }                    from 'antd'
import { CompaniesType, Racks }                                        from '../../../types/globalTypes'
import { deleteItem, put }                              from '../../../Plugins/helpers'
import { useCookies }                                   from 'react-cookie'

type RacksListItem = {
    item:            Racks
    premiseId:       string | undefined
    racks:           Racks[]
    setRacks:        React.Dispatch<React.SetStateAction<Racks[]>>
    updateRacksList: (updatedRack: Racks) => void
    companies:       CompaniesType[] | undefined
}

const RacksListItem = ({item, premiseId, racks, setRacks, updateRacksList, companies}: RacksListItem) => {
  const [cookies]       = useCookies(['access_token'])
  const [form]          = Form.useForm()
  const [edit, setEdit] = React.useState(false)

  const deleteRack = async(id: string | undefined) => {
    await deleteItem('site/rack', {id: id}, cookies.access_token)
    const filter = racks.filter((el) => el._id !== id)
    setRacks(filter)
  }

  const editRack = () => {
    setEdit(true)
  }

  const saveChanges = async(values:Racks, id: string | undefined) => {
    values.premiseId = premiseId
    values.id = id
    const res = await put('site/rack', values ,cookies.access_token)
    setEdit(false)
    updateRacksList(res)
  }

  function findMatchingCompanies(companies: CompaniesType[] | undefined, itemId: string | undefined) {
    const matchingCompanies = companies?.filter(item => item.racks.includes(itemId)).map(item => item.name)
    if(matchingCompanies){
      return { matchFound: true, companyNames: matchingCompanies }
    }
  }

  const matchingCompanies = findMatchingCompanies(companies, item._id)

  return (
    <List.Item actions={[!edit && <EditOutlined key={item._id} onClick={editRack}/>, <DeleteOutlined onClick={() => deleteRack(item._id)} key={item._id}/>]}>
      {edit ?
        <Form onFinish={(values) => saveChanges(values, item._id)} form={form} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Form.Item name='name' initialValue={item.name}>
            <Input/>
          </Form.Item>
          <Button htmlType='submit' icon={<SaveOutlined/>} key={item._id}/>
        </Form>
        : <>{item.name}</>
      }
      {matchingCompanies?.matchFound ? matchingCompanies?.companyNames.map((el) => <Tag color='blue' key={el}>{el}</Tag>) : null}
    </List.Item>
  )
}

export default RacksListItem