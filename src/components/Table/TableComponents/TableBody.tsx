import React                from 'react'
import Checkbox             from '@mui/joy/Checkbox'
import Typography           from '@mui/joy/Typography'
import CheckRoundedIcon     from '@mui/icons-material/CheckRounded'
import BlockIcon            from '@mui/icons-material/Block'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import { ColorPaletteProp } from '@mui/joy/styles'
import Chip                 from '@mui/joy/Chip'
import Avatar               from '@mui/joy/Avatar'
import Box                  from '@mui/joy/Box'
import Link                 from '@mui/joy/Link'
import Dropdown             from '@mui/joy/Dropdown'
import MenuButton           from '@mui/joy/MenuButton'
import IconButton           from '@mui/joy/IconButton'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import Menu                 from '@mui/joy/Menu'
import MenuItem             from '@mui/joy/MenuItem'
import Divider              from '@mui/joy/Divider'

type Order = 'asc' | 'desc';

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
    ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

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

const RowMenu = () => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size='sm' sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color='danger'>Delete</MenuItem>
      </Menu>
    </Dropdown>
  )
}

const TableBody = () => {
  const [order, setOrder] = React.useState<Order>('desc')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  return (
    <tbody>
      {stableSort(rows, getComparator(order, 'id')).map((row) => (
        <tr key={row.id}>
          <td style={{ textAlign: 'center', width: 120 }}>
            <Checkbox
              size='sm'
              checked={selected.includes(row.id)}
              color={selected.includes(row.id) ? 'primary' : undefined}
              onChange={(event) => {
                setSelected((ids) =>
                  event.target.checked
                    ? ids.concat(row.id)
                    : ids.filter((itemId) => itemId !== row.id),
                )
              }}
              slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
              sx={{ verticalAlign: 'text-bottom' }}
            />
          </td>
          <td>
            <Typography level='body-xs'>{row.id}</Typography>
          </td>
          <td>
            <Typography level='body-xs'>{row.date}</Typography>
          </td>
          <td>
            <Chip
              variant='soft'
              size='sm'
              startDecorator={
                {
                  Paid:      <CheckRoundedIcon />,
                  Refunded:  <AutorenewRoundedIcon />,
                  Cancelled: <BlockIcon />,
                }[row.status]
              }
              color={
              {
                Paid:      'success',
                Refunded:  'neutral',
                Cancelled: 'danger',
              }[row.status] as ColorPaletteProp
              }
            >
              {row.status}
            </Chip>
          </td>
          <td>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar size='sm'>{row.customer.initial}</Avatar>
              <div>
                <Typography level='body-xs'>{row.customer.name}</Typography>
                <Typography level='body-xs'>{row.customer.email}</Typography>
              </div>
            </Box>
          </td>
          <td>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Link level='body-xs' component='button'>
            Download
              </Link>
              <RowMenu />
            </Box>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody