/* eslint-disable max-len */
import React                  from 'react'
import TableControls          from './TableControls'
import Table                  from './Table'
import { FilterOptions }      from '../../../types/globalTypes'
import { SetURLSearchParams } from 'react-router-dom'
import TablePagination        from './TablePagination'
import VisitsConfigModal      from '../../DLCJournalComponents/VisistPageComponents/VisitsConfigModal'

type FullTableProps = {
  tableColumns:     React.ReactNode;
  currentPage:      string | null;
  setSearchParams:  SetURLSearchParams;
  tableSorter:      FilterOptions
  tableRows :       React.ReactNode
  documentCount:    number | undefined;
  pdfGenerator?:    React.ReactNode
}

const FullTable = ({
  tableColumns,
  currentPage,
  setSearchParams,
  tableSorter,
  tableRows,
  documentCount,
  pdfGenerator,
}: FullTableProps) => {
  return (
    <>
      <TableControls pdfGenerator={pdfGenerator} tableSorter={tableSorter}/>
      <VisitsConfigModal/>
      <Table tableRows={tableRows} tableColumns={tableColumns}/>
      <TablePagination documentCount={documentCount} currentPage={currentPage} setSearchParams={setSearchParams}
      />
    </>
  )
}

export default FullTable