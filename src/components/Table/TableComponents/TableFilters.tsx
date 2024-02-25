/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const page                            = searchParams.get('page')
  const limit                           = searchParams.get('limit')
  const tableOrder                      = searchParams.get('descending')
  const filterByStatus = async (selectFilter: string, options: any) => {
    if (selectFilter) {
      setSearchParams(`page=${page}&limit=${limit}&descending=${tableOrder}&${options.filterParam}=${options.filterValue}`)
    } else {
      clearSelect()
    }
  }

  const clearSelect = () => {
    setSearchParams(`page=${page}&limit=${limit}&descending=${tableOrder}`)
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