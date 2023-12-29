/* eslint-disable max-len */
import { Button, Input, List }             from 'antd'
import React                               from 'react'
import { get }                             from '../../Plugins/helpers'
import { useCookies }                      from 'react-cookie'
import { CollocationsType, CompaniesType } from '../../types/globalTypes'
import { Link }                            from 'react-router-dom'
import CompanyAddition                     from '../../components/DLCJournalComponents/ClientCompanyListComponents/CompanyAdditionComponent/CompanyAddition'
import ListItem                            from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClientsTab/ListItem'
import { useAppSelector }                  from '../../store/hooks'
import ChildCompaniesTree                  from '../../components/DLCJournalComponents/ClientCompanyListComponents/ChildCompaniesTree'
import useDelay                            from '../../Plugins/useDelay'

const CompaniesListPage = () => {
  const [loading, setLoading]           = React.useState(false)
  const [cookies]                       = useCookies(['access_token'])
  const [companies, setCompanies]       = React.useState<CompaniesType[]>([])
  const [collocations, setCollocations] = React.useState<CollocationsType[]>()
  const openCompaniesAdditionModal      = useAppSelector((state) => state.modals.openCompaniesAdditionModal)
  const delay                           = useDelay()

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const allComapnies = await get('getCompanies', cookies.access_token)
        const collocations = await get('getCollocations', cookies.access_token)

        const mainCompanies = allComapnies.data.filter((el: CompaniesType) => el.parentCompanyId !== null || el.parentCompanyId !== undefined )
        setCollocations(collocations.data[0].colocations)
        setCompanies(mainCompanies)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    })()
  },[openCompaniesAdditionModal])

  const companyRemoved = (id:number | undefined) => {
    let newCompaniesList = [...companies]
    newCompaniesList = newCompaniesList.filter(x => x?.id !== id)
    newCompaniesList = newCompaniesList.map((item) => {
      const { parentCompanyId, wasMainClient, ...rest } = item
      return rest
    })
    setCompanies(newCompaniesList)
  }

  const deleteCompany = async(companyId: number | undefined) => {
    await get(`deleteCompany/${companyId}`, cookies.access_token)
    companyRemoved(companyId)
  }

  const listButtons = (listItemId: number | undefined, primaryKey: number | undefined) => {
    const buttons = [
      <Link key={listItemId} to={`/DLC Žurnalas/Įmonių_Sąrašas/${listItemId}`}>Peržiūrėti</Link>,
      <Button type='link' onClick={() => deleteCompany(listItemId)} key={primaryKey}>Ištrinti</Button>,
    ]
    return buttons
  }

  const searchForCompany = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    delay( async() => {
      if (searchTerm === '') {
        const allCompanies = await get('getCompanies', cookies.access_token)
        setCompanies(allCompanies.data)
      } else {
        const allCompanies =  await get('getCompanies', cookies.access_token)
        const foundCompany = companies.filter((elem) => elem.companyInfo.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
        setCompanies(foundCompany)
        foundCompany.map((el) => {
          const childCompanies = allCompanies.data?.filter((ele: CompaniesType) => ele.parentCompanyId === el.id)
          if(childCompanies){
            setCompanies([...foundCompany, ...childCompanies])
          }
        })
      }
    })
  }

  return (
    <div className='CompaniesListPageContainer'>
      <CompanyAddition
        postUrl={'addCompany'}
        collocations={collocations}
        additionModalTitle={'Pridėkite įmonę'}
      />
      <Input onChange={searchForCompany} style={{marginTop: '10px', marginBottom: '10px'}} placeholder='Ieškoti įmonės' allowClear/>
      <List
        loading={loading}
        pagination={{ position: 'bottom', align: 'center'}}
        dataSource={companies}
        renderItem={(item) => {
          return(
            <ListItem
              listItemId={item.id}
              photo={item.companyInfo.companyPhoto}
              description={item?.companyInfo?.companyDescription}
              photosFolder={'CompanyLogos'}
              altImage={'noImage.jpg'}
              primaryKey={item?.parentCompanyId}
              listButtons={listButtons}
              title={<ChildCompaniesTree companies={companies} item={item}/>}
            />
          )
        }}/>
    </div>
  )
}

export default CompaniesListPage