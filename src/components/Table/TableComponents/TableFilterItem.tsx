/* eslint-disable max-len */
import { FormControl, FormLabel } from '@mui/joy'
import { Select }                 from 'antd'
import { DefaultOptionType }      from 'antd/es/select'

type TableFilterItemProps = {
    filterName: string;
    onClear?:   (() => void) | undefined
    onChange?:  ((value: string, option: DefaultOptionType | DefaultOptionType[]) => void) | undefined
    options:    DefaultOptionType[] | undefined
}

const TableFilterItem = ({filterName, onChange, onClear, options}: TableFilterItemProps) => {
  return(
    <>
      <FormControl size='sm'>
        <FormLabel>{filterName}</FormLabel>
        <Select
          onClear={onClear}
          onChange={onChange}
          allowClear
          options={options}
        />
      </FormControl>
    </>
  )
}

export default TableFilterItem