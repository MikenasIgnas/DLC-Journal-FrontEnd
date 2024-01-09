import { Sheet, Table } from '@mui/joy'
import TableHead        from './TableHead'

type DataTableProps = {
  tableColumns: React.ReactNode;
  tableRows:    React.ReactNode
}

const DataTable = ({ tableColumns, tableRows }: DataTableProps) => {
  return (
    <Sheet
      className='OrderTableContainer'
      variant='outlined'
      sx={{
        display:      { sm: 'initial' },
        width:        '100%',
        borderRadius: 'sm',
        flexShrink:   1,
        overflow:     'auto',
        minHeight:    0,
      }}
    >
      <Table
        aria-labelledby='tableTitle'
        stickyHeader
        hoverRow
        sx={{
          '--TableCell-headBackground':       'var(--joy-palette-background-level1)',
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground':       'var(--joy-palette-background-level1)',
          '--TableCell-paddingY':             '4px',
          '--TableCell-paddingX':             '8px',
        }}
      >
        <TableHead tableColumns={tableColumns}/>
        <tbody>
          {tableRows}
        </tbody>
      </Table>
    </Sheet>
  )
}

export default DataTable