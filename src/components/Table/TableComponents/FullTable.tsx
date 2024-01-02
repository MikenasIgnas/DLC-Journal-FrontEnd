/* eslint-disable max-len */
import React                  from 'react'
import TableControls          from './TableControls'
import Table                  from './Table'
import { FilterOptions }      from '../../../types/globalTypes'
import { SetURLSearchParams } from 'react-router-dom'
import TablePagination        from './TablePagination'

type FullTableProps = {
  tableColumns:     React.ReactNode;
  currentPage:      string | null;
  setSearchParams:  SetURLSearchParams;
  tableSorter:      FilterOptions
  tableRows :       React.ReactNode
  documentCount:    number | undefined;
  pdfGenerator?:    React.ReactNode
  filterParam?:     string;
}

const FullTable = ({
  tableColumns,
  currentPage,
  setSearchParams,
  tableSorter,
  tableRows,
  documentCount,
  pdfGenerator,
  filterParam,
}: FullTableProps) => {
  return (
    <>
      <TableControls filterParam={filterParam} pdfGenerator={pdfGenerator} tableSorter={tableSorter}/>
      <Table tableRows={tableRows} tableColumns={tableColumns}/>
      <TablePagination documentCount={documentCount} currentPage={currentPage} setSearchParams={setSearchParams}
      />
    </>
  )
}

export default FullTable