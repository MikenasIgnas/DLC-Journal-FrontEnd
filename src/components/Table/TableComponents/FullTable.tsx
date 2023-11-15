/* eslint-disable max-len */
import React                  from 'react'
import TableControls          from './TableControls'
import Table                  from './Table'
import { FilterOptions }      from '../../../types/globalTypes'
import { SetURLSearchParams } from 'react-router-dom'
import TablePagination        from './TablePagination'



type FullTableProps = {
  tableData:        any[] | undefined;
  tableColumns:     React.ReactNode;
  currentPage:      string | null;
  setSearchParams:  SetURLSearchParams;
  setTableData:     React.Dispatch<React.SetStateAction<any[] | undefined>>
  tableFilter:      FilterOptions
  tableRows :       React.ReactNode
  request:          string;
  getDocumentCount: string;
}

const FullTable = ({
  tableData,
  tableColumns,
  currentPage,
  setSearchParams,
  setTableData,
  tableFilter,
  tableRows,
  request,
  getDocumentCount,
}: FullTableProps) => {
  return (
    <>
      <TableControls setTableData={setTableData} tableFilter={tableFilter} request={request}/>
      <Table tableRows={tableRows} tableData={tableData} tableColumns={tableColumns}/>
      <TablePagination getDocumentCount={getDocumentCount} currentPage={currentPage} setSearchParams={setSearchParams} />
    </>
  )
}

export default FullTable