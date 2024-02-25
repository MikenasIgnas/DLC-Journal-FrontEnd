import React                from 'react'
import Link                 from '@mui/joy/Link'
import ArrowDropDownIcon    from '@mui/icons-material/ArrowDropDown'
import { useSearchParams }  from 'react-router-dom'

type TableHeadProps = {
  tableColumns: React.ReactNode
}

const TableHead = ({ tableColumns }:TableHeadProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tableSorter                     = searchParams.get('descending')
  const page                            = searchParams.get('page')
  const limit                           = searchParams.get('limit')

  const orderTebleData = () => {
    if (tableSorter === 'false') {
      setSearchParams(`?page=${page}&limit=${limit}&descending=true`)
    } else {
      setSearchParams(`?page=${page}&limit=${limit}&descending=false`)
    }
  }

  return (
    <thead>
      <tr>
        <th style={{ width: 50, padding: '12px' }}>
          <Link
            underline='none'
            color='primary'
            component='button'
            onClick={orderTebleData}
            fontWeight='lg'
            endDecorator={<ArrowDropDownIcon />}
            sx={{
              '& svg': {
                transition: '0.2s',
                transform:  tableSorter === 'true' ? 'rotate(0deg)' : 'rotate(180deg)',
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