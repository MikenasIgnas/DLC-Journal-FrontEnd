/* eslint-disable max-len */
import React                           from 'react'
import { Box, FormControl, FormLabel } from '@mui/joy'
import TableFilters                    from './TableFilters'
import { FilterOptions }               from '../../../types/globalTypes'
import { Button, DatePicker, Input }   from 'antd'
import { useSearchParams }             from 'react-router-dom'
import useDelay                        from '../../../Plugins/useDelay'
import dayjs                           from 'dayjs'
import type { Dayjs }                  from 'dayjs'
import type { TimeRangePickerProps }   from 'antd'
import { useCookies }                  from 'react-cookie'
import { generateCustomPDF } from '../../../Plugins/helpers'

type TableControlsProps = {
  tableSorter:  FilterOptions;
}

const { RangePicker } = DatePicker

const TableControls = ({tableSorter}: TableControlsProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page                            = searchParams.get('page')
  const limit                           = searchParams.get('limit')
  const delay                           = useDelay()
  const [pdfDateFrom, setPDFDateFrom]   = React.useState<string | undefined>()
  const [pdfDateTo, setPDFDateTo]       = React.useState<string | undefined>()
  const [cookies]                       = useCookies(['access_token'])

  const onChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    delay( async() => {
      setSearchParams(`page=${page}&limit=${limit}&filter=${e.target.value.toLocaleLowerCase()}`)
      if(e.target.value === ''){
        setSearchParams(`page=${page}&limit=${limit}`)
      }
    })

  }
  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setPDFDateFrom(dateStrings[0])
      setPDFDateTo(dateStrings[1])
    } else {
      setPDFDateFrom(undefined)
      setPDFDateTo(undefined)
      console.log('Clear')
    }
  }

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ]

  return (
    <React.Fragment>
      <Box
        sx={{
          borderRadius: 'sm',
          py:           2,
          display:      {
            xs: 'none',
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
        {<TableFilters tableSorter={tableSorter}/>}
      </Box>
      <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <div style={{display: 'flex'}}>
          <RangePicker presets={rangePresets} onChange={onRangeChange}/>
          {pdfDateFrom && pdfDateTo && <Button onClick={() => generateCustomPDF(pdfDateFrom, pdfDateTo, cookies.access_token)}>PDF</Button>}
        </div>
      </div>
    </React.Fragment>
  )
}

export default TableControls