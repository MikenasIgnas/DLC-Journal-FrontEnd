/* eslint-disable max-len */
import React  from 'react'
import { Select } from 'antd'
import { get, post } from '../../../Plugins/helpers'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import { CompaniesType } from '../../../types/globalTypes'

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']

const NewTagComponent = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])

  const [availableSubClients, setAvailbleSubClients] = React.useState<CompaniesType[]>()
  const filteredOptions = availableSubClients?.filter((o) => !selectedItems.includes(o.companyInfo.companyName))
  const [cookies] = useCookies()
  const {id} = useParams()
  React.useEffect(() => {
    (async () => {
      try{
        const allCompanies =  await get('getCompanies', cookies.access_token)
        const company = await get(`SingleCompanyPage/${id}`, cookies.access_token)
        const allCompaniesData: CompaniesType[] = allCompanies.data
        const companyData: CompaniesType = company.data

        const filteredCompanies = allCompaniesData.filter((item) => item.id !== companyData.id)
        setAvailbleSubClients(filteredCompanies)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  const handleChange = async(subClient: string[]) => {
    setSelectedItems(subClient)
    const selectedSubClient = {
      subClient,
    }
    await post(`addSubClient?companyId=${id}`, selectedSubClient, cookies.access_token)
  }

  return (
    <div>
      <Select
        mode='multiple'
        value={selectedItems}
        placeholder='Pridėkite sub klientą'
        onChange={handleChange}
        style={{ width: selectedItems.length > 0 ? '' : '160px' }}
        options={filteredOptions?.map((item) => ({
          value: item.companyInfo.companyName,
          label: item.companyInfo.companyName,
        }))}
      >
      </Select>
    </div>
  )
}

export default NewTagComponent