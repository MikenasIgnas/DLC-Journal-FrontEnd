import { Checkbox }       from '@mui/joy'
import React              from 'react'
import Link               from '@mui/joy/Link'
import ArrowDropDownIcon  from '@mui/icons-material/ArrowDropDown'
import { VisitsType }     from '../../../types/globalTypes'

type Order = 'asc' | 'desc';

type TableHeadProps = {
  tableData:    VisitsType[] | undefined
  tableColumns: React.ReactNode
}

const TableHead = ({tableData, tableColumns}:TableHeadProps) => {
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [order, setOrder] =       React.useState<Order>('desc')
  return (
    <thead>
      <tr>
        <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
          <Checkbox
            size='sm'
            indeterminate={
              selected.length > 0 && selected.length !== tableData?.length
            }
            checked={selected.length === tableData?.length}
            onChange={(event) => {
              setSelected(
                tableData && event.target.checked ? tableData?.map((row) => row.id) : [],
              )
            }}
            color={
              selected.length > 0 || selected.length === tableData?.length
                ? 'primary'
                : undefined
            }
            sx={{ verticalAlign: 'text-bottom' }}
          />
        </th>
        <th style={{ width: 50, padding: '12px 6px' }}>
          <Link
            underline='none'
            color='primary'
            component='button'
            onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
            fontWeight='lg'
            endDecorator={<ArrowDropDownIcon />}
            sx={{
              '& svg': {
                transition: '0.2s',
                transform:
                          order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
              },
            }}
          >
                  Id
          </Link>
        </th>
        {tableColumns}
      </tr>
    </thead>
  )
}

export default TableHead