import * as React from 'react'
import Box from '@mui/joy/Box'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Sheet from '@mui/joy/Sheet'
import IconButton from '@mui/joy/IconButton'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'

const OrderTable = () => {
  const [open, setOpen] = React.useState(false)
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size='sm'>
        <FormLabel>Status</FormLabel>
        <Select
          size='sm'
          placeholder='Filter by status'
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value='paid'>Paid</Option>
          <Option value='pending'>Pending</Option>
          <Option value='refunded'>Refunded</Option>
          <Option value='cancelled'>Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size='sm'>
        <FormLabel>Category</FormLabel>
        <Select size='sm' placeholder='All'>
          <Option value='all'>All</Option>
          <Option value='refund'>Refund</Option>
          <Option value='purchase'>Purchase</Option>
          <Option value='debit'>Debit</Option>
        </Select>
      </FormControl>
      <FormControl size='sm'>
        <FormLabel>Customer</FormLabel>
        <Select size='sm' placeholder='All'>
          <Option value='all'>All</Option>
          <Option value='olivia'>Olivia Rhye</Option>
          <Option value='steve'>Steve Hampton</Option>
          <Option value='ciaran'>Ciaran Murray</Option>
          <Option value='marina'>Marina Macdonald</Option>
          <Option value='charles'>Charles Fulton</Option>
          <Option value='jay'>Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  )
  return (
    <div>
      <React.Fragment>
        <Sheet
          className='SearchAndFilters-mobile'
          sx={{
            display: {
              xs: 'flex',
              sm: 'none',
            },
            my:  1,
            gap: 1,
          }}
        >
          <Input
            size='sm'
            placeholder='Search'
            startDecorator={<SearchIcon />}
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            size='sm'
            variant='outlined'
            color='neutral'
            onClick={() => setOpen(true)}
          >
            <FilterAltIcon />
          </IconButton>
        </Sheet>
        <Box
          className='SearchAndFilters-tabletUp'
          sx={{
            borderRadius: 'sm',
            py:           2,
            display:      {
              xs: 'none',
              sm: 'flex',
            },
            flexWrap: 'wrap',
            gap:      1.5,
            '& > *':  {
              minWidth: {
                xs: '120px',
                md: '160px',
              },
            },
          }}
        >
          <FormControl sx={{ flex: 1 }} size='sm'>
            <FormLabel>Search for order</FormLabel>
            <Input size='sm' placeholder='Search' startDecorator={<SearchIcon />} />
          </FormControl>
          {renderFilters()}
        </Box>
      </React.Fragment>
    </div>
  )
}

export default OrderTable