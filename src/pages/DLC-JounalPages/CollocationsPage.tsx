/* eslint-disable max-len */
import React                                                  from 'react'
import { useCookies }                                         from 'react-cookie'
import { generateCsv, get }                                   from '../../Plugins/helpers'
import { CollocationsType, CompaniesType, CompanyInfoType }   from '../../types/globalTypes'
import { Button, Tabs }                                       from 'antd'
import CollocationsTabItem                                    from '../../components/DLCJournalComponents/CollocationsPageComponents/CollocationsTabItem'
import CollocationAdditionModal                               from '../../components/DLCJournalComponents/CollocationsPageComponents/CollocationAdditionModal'
import { useSearchParams }                                    from 'react-router-dom'
import { useAppDispatch, useAppSelector }                     from '../../store/hooks'
import { setOpenCollocationAdditionModal }                    from '../../auth/ModalStateReducer/ModalStateReducer'
import CollocationRemovalModal                                from '../../components/DLCJournalComponents/CollocationsPageComponents/CollocationRemovalModal'
import { FileExcelOutlined }                                  from '@ant-design/icons'

type MatchingCompaniesType = {
  companyName:  string;
  premiseName:  string;
  racks:        string[]
}

const CollocationsPage = () => {
  const [cookies]                             = useCookies(['access_token'])
  const [allCollocations, setAllCollocations] = React.useState<CollocationsType[]>()
  const [allCompanies, setAllCompanies]       = React.useState<CompaniesType[]>()
  const [searchParams, setSearchParams]       = useSearchParams()
  const tabKey                                = searchParams.get('tabKey')
  const dispatch                              = useAppDispatch()
  const openCollocationAdditionModal          = useAppSelector((state) => state.modals.openCollocationAdditionModal)
  const openCollocationRemovalModal           = useAppSelector((state) => state.modals.openCollocationRemovalModal)

  React.useEffect(() => {
    (async () => {
      try {
        const companies     = await get('getCompanies', cookies.access_token)
        const collocations  = await get('getCollocations', cookies.access_token)
        setAllCollocations(collocations.data[0].colocations)
        setAllCompanies(companies.data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [openCollocationAdditionModal, openCollocationRemovalModal])

  const getMatchingCompanies = (allCollocations: CollocationsType[] | undefined, companyInfo: CompanyInfoType) => {
    const matchingCompanies: MatchingCompaniesType[] = []
    Object.keys(companyInfo).forEach((site) => {
      const siteCollocations = allCollocations?.find((collocation) => collocation.site === site)
      if (siteCollocations) {
        const companyColl = companyInfo[site]
        companyColl?.forEach((company) => {
          const premises = siteCollocations.premises.find((el) => Object.keys(company)[0] === el.premiseName)
          if (premises) {
            const racks = company[Object.keys(company)[0]]
            const matchingRacks = premises.racks.filter((rack) => racks.includes(rack))
            if (matchingRacks.length > 0) {
              matchingCompanies.push({
                companyName: companyInfo.companyName,
                premiseName: premises.premiseName,
                racks:       matchingRacks,
              })
            }
          }
        })
      }
    })
    return matchingCompanies
  }

  const companyCollocation = allCompanies?.map((el) => getMatchingCompanies(allCollocations, el.companyInfo)).flat()

  const onChange = (key: string) => {
    setSearchParams(`?tabKey=${key}`)
  }

  const data = [
    {
      'Column 1': '1-1',
      'Column 2': '1-2',
      'Column 3': '1-3',
      'Column 4': '1-4',
    },
    {
      'Column 1': '2-1',
      'Column 2': '2-2',
      'Column 3': '2-3',
      'Column 4': '2-4',
    },
    {
      'Column 1': '3-1',
      'Column 2': '3-2',
      'Column 3': '3-3',
      'Column 4': '3-4',
    },
    {
      'Column 1': 4,
      'Column 2': 5,
      'Column 3': 6,
      'Column 4': 7,
    },
  ]

  return (
    <div >
      <Tabs
        tabBarExtraContent={
          <div>
            <Button type='link' onClick={() => dispatch(setOpenCollocationAdditionModal(true))}>Pridėti kolokaciją</Button>
            <Button type='link' icon={<FileExcelOutlined />} onClick={() => generateCsv('generateAllCollocationsCSV', data, cookies.access_token)}>Generuoti csv</Button>
          </div>
        }
        onChange={onChange}
        items={allCollocations?.map((tabItem) =>
          CollocationsTabItem({
            site:               tabItem.site,
            tabItemId:          tabItem.id,
            premises:           tabItem.premises,
            companyCollocation: companyCollocation,
          })
        )}
      />
      <CollocationAdditionModal tabKey={tabKey}/>
      <CollocationRemovalModal/>
    </div>
  )
}

export default CollocationsPage