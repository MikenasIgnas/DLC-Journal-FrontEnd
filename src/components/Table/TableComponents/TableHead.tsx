import React              from 'react'
import Link               from '@mui/joy/Link'
import ArrowDropDownIcon  from '@mui/icons-material/ArrowDropDown'

type Order = 'asc' | 'desc';

type TableHeadProps = {
  tableColumns: React.ReactNode
}

const TableHead = ({tableColumns}:TableHeadProps) => {
  const [order, setOrder] =       React.useState<Order>('desc')
  return (
    <thead>
      <tr>
        <th style={{ width: 50, padding: '12px' }}>
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