import { FormControl, FormLabel }   from '@mui/joy'
import { Select }                   from 'antd'
import { DefaultOptionType }        from 'antd/es/select'

type TableFilterItemProps = {
    filterName: string;
    onClear?: (() => void) | undefined
    onChange?: ((value: any, option: DefaultOptionType | DefaultOptionType[]) => void) | undefined
    options: DefaultOptionType[] | undefined
}

const TableFilterItem = ({filterName, onChange, onClear, options}: TableFilterItemProps) => {
  return(
    <>
      <FormControl size='sm'>
        <FormLabel>{filterName}</FormLabel>
        <Select
          onClear={onClear}
          style={{ width: 120 }}
          onChange={onChange}
          allowClear
          options={options}
        />
      </FormControl>
    </>
  )
}

export default TableFilterItem