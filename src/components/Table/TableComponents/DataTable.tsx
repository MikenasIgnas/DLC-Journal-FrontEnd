import TablePagination  from './TablePagination'
import TableControls    from './TableControls'
import Table            from './Table'

const DataTable = () => {
  return (
    <>
      <TableControls/>
      <Table/>
      <TablePagination/>
    </>
  )
}

export default DataTable