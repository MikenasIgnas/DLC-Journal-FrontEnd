/* eslint-disable max-len */
import React                from 'react'
import { FilterOptions }    from '../../../types/globalTypes'
import { useSearchParams }  from 'react-router-dom'
import TableFilterItem      from './TableFilterItem'

type TableFiltersProps = {
  tableSorter:  FilterOptions
}

const TableFilters = ({tableSorter}: TableFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page =                            searchParams.get('page')
  const limit =                           searchParams.get('limit')

  const filterByStatus = async(selectFilter: string) => {
    if (selectFilter) {
      setSearchParams(`page=${page}&limit=${limit}&selectFilter=${selectFilter}`)
    } else {
      clearSelect()
    }
  }

  const clearSelect = () => {
    setSearchParams(`page=${page}&limit=${limit}`)
  }

  return (
    <React.Fragment>
      {tableSorter?.map((el, i) => (
        <TableFilterItem key={i} filterName={el.filterName} options={el.filterOptions} onChange={filterByStatus}/>
      ))}
    </React.Fragment>
  )
}

export default TableFilters