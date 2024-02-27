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
  csvGenerator?:  React.ReactNode
}


const TableControls = ({tableSorter, csvGenerator}: TableControlsProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page                            = searchParams.get('page')
  const limit                           = searchParams.get('limit')
  const descending                      = searchParams.get('descending')
  const delay                           = useDelay()

  const onChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    delay( async() => {
      setSearchParams(`page=${page}&limit=${limit}&descending=${descending}&search=${e.target.value.toLocaleLowerCase()}`)
      if(e.target.value === ''){
        setSearchParams(`page=${page}&limit=${limit}&descending=${descending}`)
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
      {csvGenerator}
    </React.Fragment>
  )
}

export default TableControls