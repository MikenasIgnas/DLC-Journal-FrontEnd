import { Checkbox } from '@mui/joy'
import React from 'react'
import Link from '@mui/joy/Link'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
const rows = [
  {
    id:       'INV-1230',
    date:     'Feb 3, 2023',
    status:   'Cancelled',
    customer: {
      initial: 'C',
      name:    'Charles Fulton',
      email:   'fulton@email.com',
    },
  },
  {
    id:       'INV-1229',
    date:     'Feb 3, 2023',
    status:   'Cancelled',
    customer: {
      initial: 'J',
      name:    'Jay Hooper',
      email:   'hooper@email.com',
    },
  },
  {
    id:       'INV-1228',
    date:     'Feb 3, 2023',
    status:   'Refunded',
    customer: {
      initial: 'K',
      name:    'Krystal Stevens',
      email:   'k.stevens@email.com',
    },
  },
  {
    id:       'INV-1227',
    date:     'Feb 3, 2023',
    status:   'Paid',
    customer: {
      initial: 'S',
      name:    'Sachin Flynn',
      email:   's.flyn@email.com',
    },
  },
  {
    id:       'INV-1226',
    date:     'Feb 3, 2023',
    status:   'Cancelled',
    customer: {
      initial: 'B',
      name:    'Bradley Rosales',
      email:   'brad123@email.com',
    },
  },
  {
    id:       'INV-1234',
    date:     'Feb 3, 2023',
    status:   'Paid',
    customer: {
      initial: 'O',
      name:    'Olivia Ryhe',
      email:   'olivia@email.com',
    },
  },
  {
    id:       'INV-1233',
    date:     'Feb 3, 2023',
    status:   'Cancelled',
    customer: {
      initial: 'S',
      name:    'Steve Hampton',
      email:   'steve.hamp@email.com',
    },
  },
  {
    id:       'INV-1232',
    date:     'Feb 3, 2023',
    status:   'Paid',
    customer: {
      initial: 'C',
      name:    'Ciaran Murray',
      email:   'ciaran.murray@email.com',
    },
  },
  {
    id:       'INV-1231',
    date:     'Feb 3, 2023',
    status:   'Refunded',
    customer: {
      initial: 'M',
      name:    'Maria Macdonald',
      email:   'maria.mc@email.com',
    },
  },
  {
    id:       'INV-1230',
    date:     'Feb 3, 2023',
    status:   'Paid',
    customer: {
      initial: 'C',
      name:    'Charles Fulton',
      email:   'fulton@email.com',
    },
  },
  {
    id:       'INV-1229',
    date:     'Feb 3, 2023',
    status:   'Cancelled',
    customer: {
      initial: 'J',
      name:    'Jay Hooper',
      email:   'hooper@email.com',
    },
  },
]
type Order = 'asc' | 'desc';
const TableHead = () => {
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [order, setOrder] = React.useState<Order>('desc')
  return (
    <thead>
      <tr>
        <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
          <Checkbox
            size='sm'
            indeterminate={
              selected.length > 0 && selected.length !== rows.length
            }
            checked={selected.length === rows.length}
            onChange={(event) => {
              setSelected(
                event.target.checked ? rows.map((row) => row.id) : [],
              )
            }}
            color={
              selected.length > 0 || selected.length === rows.length
                ? 'primary'
                : undefined
            }
            sx={{ verticalAlign: 'text-bottom' }}
          />
        </th>
        <th style={{ width: 120, padding: '12px 6px' }}>
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
                  Invoice
          </Link>
        </th>
        <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
        <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
        <th style={{ width: 240, padding: '12px 6px' }}>Customer</th>
        <th style={{ width: 140, padding: '12px 6px' }}> </th>
      </tr>
    </thead>
  )
}

export default TableHead