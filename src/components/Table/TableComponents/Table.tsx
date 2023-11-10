import { Sheet, Table } from '@mui/joy'
import TableHead        from './TableHead'
import TableBody        from './TableBody'

const DataTable = () => {
  return (
    <Sheet
      className='OrderTableContainer'
      variant='outlined'
      sx={{
        display:      { xs: 'none', sm: 'initial' },
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
        <TableHead/>
        <TableBody/>
      </Table>
    </Sheet>
  )
}

export default DataTable