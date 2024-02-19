/* eslint-disable max-len */
import React          from 'react'
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
}                     from '@ant-design/icons'
import {
  Input,
  List,
  Tag,
  message,
}                     from 'antd'
import {
  CompaniesType,
  Racks,
}                     from '../../../types/globalTypes'
import {
  deleteItem,
  put,
}                     from '../../../Plugins/helpers'
import { useCookies } from 'react-cookie'
import SuccessMessage from '../../UniversalComponents/SuccessMessage'

type RacksListItem = {
    item:            Racks
    premiseId:       string | undefined
    racks:           Racks[]
    setRacks:        React.Dispatch<React.SetStateAction<Racks[]>>
    updateRacksList: (updatedRack: Racks) => void
    companies:       CompaniesType[] | undefined
}

const RacksListItem = ({item, premiseId, racks, setRacks, updateRacksList, companies}: RacksListItem) => {
  const [cookies]                         = useCookies(['access_token'])
  const [edit, setEdit]                   = React.useState(false)
  const [rackNameInput, setRackNameInput] = React.useState<string | undefined>(item.name)
  const [messageApi, contextHolder]       = message.useMessage()

  const deleteRack = async(id: string | undefined) => {
    try{
      await deleteItem('site/rack', {id: id}, cookies.access_token)
      const filter = racks.filter((el) => el._id !== id)
      setRacks(filter)
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  const editRack = () => {
    setEdit(true)
  }

  const saveChanges = async(id: string | undefined) => {
    try{
      const values = {
        name: rackNameInput,
        premiseId,
        id,
      }

      const res = await put('site/rack', values ,cookies.access_token)
      setEdit(false)
      updateRacksList(res)
      messageApi.success({
        type:    'success',
        content: 'Išsaugota',
      })
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  const findMatchingCompanies = (companies: CompaniesType[] | undefined, itemId: string | undefined) => {
    const matchingCompanies = companies?.filter(item => itemId && item.racks.includes(itemId)).map(item => item.name)
    if(matchingCompanies){
      return { matchFound: true, companyNames: matchingCompanies }
    }
  }

  const matchingCompanies = findMatchingCompanies(companies, item._id)
  return (
    <List.Item>
      <List.Item.Meta
        title={
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            {edit ? (
              <React.Fragment>
                <Input onChange={(e) => setRackNameInput(e.target.value)} value={rackNameInput} />
                <div style={{display: 'flex'}}>
                  <SaveOutlined onClick={() => saveChanges(item._id)} style={{ marginRight: 8 }} />
                  <DeleteOutlined onClick={() => deleteRack(item._id)} />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p>{item.name}</p>
                <div style={{display: 'flex'}}>
                  <EditOutlined onClick={editRack} style={{ marginRight: 8 }} />
                  <DeleteOutlined onClick={() => deleteRack(item._id)} />
                </div>
              </React.Fragment>
            )}
          </div>
        }
        description={
          <div>
            {matchingCompanies?.matchFound ? matchingCompanies?.companyNames.map((el) => <Tag color='blue' key={el}>{el}</Tag>) : null}
          </div>
        }
      ></List.Item.Meta>
      <SuccessMessage contextHolder={contextHolder}/>
    </List.Item>
  )
}

export default RacksListItem