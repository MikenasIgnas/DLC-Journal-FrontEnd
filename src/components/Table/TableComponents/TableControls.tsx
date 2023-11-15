/* eslint-disable max-len */
import React                            from 'react'
import { Box, FormControl, FormLabel }  from '@mui/joy'
import TableFilters                     from './TableFilters'
import { FilterOptions, VisitsType }    from '../../../types/globalTypes'
import { Input }                        from 'antd'
import { get }                          from '../../../Plugins/helpers'
import { useCookies }                   from 'react-cookie'
import { useSearchParams }              from 'react-router-dom'

type TableControlsProps = {
  setTableData:   React.Dispatch<React.SetStateAction<any[] | undefined>>;
  tableFilter:    FilterOptions;
  request: string;
}

const TableControls = ({setTableData, tableFilter, request}: TableControlsProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cookies] =                       useCookies(['access_token'])
  const page =                            searchParams.get('page')
  const limit =                           searchParams.get('limit')
  const filter =                          searchParams.get('filter')

  const onChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchParams(`page=${page}&limit=${limit}&filter=${e.target.value}`)
    const visitsData =  await get(`${request}?page=${page}&limit=${limit}&filter=${filter}`, cookies.access_token)
    setTableData(visitsData)
  }

  return (
    <React.Fragment>
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
          <Input placeholder='input with clear icon' allowClear onChange={onChange} />
        </FormControl>
        {<TableFilters request={request} setTableData={setTableData} tableFilter={tableFilter}/>}
      </Box>
    </React.Fragment>
  )
}

export default TableControls