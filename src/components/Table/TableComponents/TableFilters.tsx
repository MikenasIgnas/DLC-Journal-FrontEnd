/* eslint-disable max-len */
import React                          from 'react'
import { useCookies }                 from 'react-cookie'
import { get }                        from '../../../Plugins/helpers'
import { FilterOptions, VisitsType }  from '../../../types/globalTypes'
import { useSearchParams }            from 'react-router-dom'
import TableFilterItem                from './TableFilterItem'

type TableFiltersProps = {
  setTableData:   React.Dispatch<React.SetStateAction<any[] | undefined>>
  tableFilter:  FilterOptions
  request: string;
}

const TableFilters = ({setTableData, tableFilter, request}: TableFiltersProps) => {
  const [cookies] =                       useCookies(['access_token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const page =                            searchParams.get('page')
  const limit =                           searchParams.get('limit')

  const filterByStatus = async(filterOption: string) => {
    setSearchParams(`page=${page}&limit=${limit}&filter=${filterOption}`)
    const visitsData =  await get(`${request}?page=${page}&limit=${limit}&filter=${filterOption}`, cookies.access_token)
    setTableData(visitsData)
  }

  const clearSelect = () => {
    setSearchParams(`page=${page}&limit=${limit}`)
  }

  return (
    <React.Fragment>
      {tableFilter.map((el, i) => (
        <TableFilterItem key={i} filterName={el.filterName} options={el.filterOptions} onChange={filterByStatus} onClear={clearSelect}/>
      ))}
    </React.Fragment>
  )
}

export default TableFilters