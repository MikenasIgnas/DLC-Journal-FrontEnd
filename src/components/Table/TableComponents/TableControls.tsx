import React                                         from 'react'
import { Box, FormControl, FormLabel, Input, Sheet } from '@mui/joy'
import SearchIcon                                    from '@mui/icons-material/Search'
import IconButton                                    from '@mui/joy/IconButton'
import FilterAltIcon                                 from '@mui/icons-material/FilterAlt'
import TableFilters                                  from './TableFilters'

const TableControls = () => {
  const [open, setOpen] = React.useState(false)

  return (
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
        {<TableFilters/>}
      </Box>
    </React.Fragment>
  )
}

export default TableControls