/* eslint-disable max-len */
import React                           from 'react'
import { Box, FormControl, FormLabel } from '@mui/joy'
import TableFilters                    from './TableFilters'
import { FilterOptions }               from '../../../types/globalTypes'
import { Input }                       from 'antd'
import { useSearchParams }             from 'react-router-dom'
import useDelay                        from '../../../Plugins/useDelay'

type TableControlsProps = {
  tableSorter:    FilterOptions;
  pdfGenerator?:  React.ReactNode
}


const TableControls = ({tableSorter, pdfGenerator}: TableControlsProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page                            = searchParams.get('page')
  const limit                           = searchParams.get('limit')
  const delay                           = useDelay()

  const onChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    delay( async() => {
      setSearchParams(`page=${page}&limit=${limit}&search=${e.target.value.toLocaleLowerCase()}`)
      if(e.target.value === ''){
        setSearchParams(`page=${page}&limit=${limit}`)
      }
    })
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          borderRadius: 'sm',
          py:           2,
          display:      {
            sm: 'flex',
          },
          gap:     1.5,
          '& > *': {
            minWidth: {
              xs: '120px',
              md: '160px',
            },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size='sm'>
          <FormLabel>Ieškoti</FormLabel>
          <Input allowClear onChange={onChange} />
        </FormControl>
        {<TableFilters tableSorter={tableSorter} />}
      </Box>
      {pdfGenerator}
    </React.Fragment>
  )
}

export default TableControls