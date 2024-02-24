/* eslint-disable max-len */
import React                  from 'react'
import TableControls          from './TableControls'
import Table                  from './Table'
import { FilterOptions }      from '../../../types/globalTypes'
import { SetURLSearchParams } from 'react-router-dom'
import TablePagination        from './TablePagination'
import VisitsConfigModal      from '../../DLCJournalComponents/VisistPageComponents/VisitsConfigModal'
import { useAppSelector } from '../../../store/hooks'

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
  const isSecurity = useAppSelector((state) => state.auth.isSecurity)
  return (
    <>
      {!isSecurity && <TableControls pdfGenerator={pdfGenerator} tableSorter={tableSorter}/>}
      {!isSecurity && <VisitsConfigModal/>}
      <Table tableRows={tableRows} tableColumns={tableColumns}/>
      <TablePagination documentCount={documentCount} currentPage={currentPage} setSearchParams={setSearchParams}
      />
    </>
  )
}

export default FullTable