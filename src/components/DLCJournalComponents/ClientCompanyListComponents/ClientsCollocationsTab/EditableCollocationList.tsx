/* eslint-disable max-len */
import { useEffect }                         from 'react'
import { Checkbox, Collapse, Divider, Form } from 'antd'
import { useAppSelector }                    from '../../../../store/hooks'
import { Sites }                             from '../../../../types/globalTypes'
import { CheckboxValueType }                 from 'antd/es/checkbox/Group'

type ColocationSelectorsProps = {
  item:             Sites;
  companyRacks?:    string[];
  setCheckedLists:  React.Dispatch<React.SetStateAction<CheckboxValueType[]>>
  checkedLists:     CheckboxValueType[]
};

const ColocationSelectors = ({ item, companyRacks = [], setCheckedLists, checkedLists }: ColocationSelectorsProps) => {
  const premises = useAppSelector(state => state.sites.premise)?.filter(el => el.siteId === item._id)
  const racks    = useAppSelector(state => state.sites.racks)

  useEffect(() => {
    setCheckedLists((prev) => Array.from(new Set([...prev, ...companyRacks])))
  }, [companyRacks, setCheckedLists])


  const handleCheckboxGroupChange = (selectedValues: CheckboxValueType[], premiseId: string) => {
    const newCheckedLists = checkedLists.filter((value) =>
      !racks?.some((rack) => rack.premiseId === premiseId && rack._id === value),
    )

    setCheckedLists([...newCheckedLists, ...selectedValues])
  }

  const nestedItems = premises?.map(premise => {
    const filteredRacks = racks?.filter(el => el.premiseId === premise._id).map(el => ({
      value: el._id || 'err',
      label: el.name || 'err',
    }))
    const checkAll = filteredRacks?.every((rack) => checkedLists.includes(rack.value))


    return {
      key:      item._id,
      label:    premise.name,
      children: (
        <>
          <Checkbox
            onChange={(e) => {
              const newCheckedList = e.target.checked
                ? filteredRacks?.map((rack) => rack.value)
                : []
              handleCheckboxGroupChange(newCheckedList || [], premise._id)
            }}
            checked={checkAll}
          >
              Check all
          </Checkbox>
          <Divider />
          <Checkbox.Group
            options={filteredRacks}
            value={checkedLists.filter((value) =>
              filteredRacks?.some((rack) => rack.value === value),
            )}
            onChange={(newValues) => handleCheckboxGroupChange(newValues, premise._id)}
          />
        </>
      ),
    }
  })

  return (
    <div style={{ width: '100%' }} key={item._id}>
      <Form.List name={item.name}>
        {() => (
          <Collapse defaultActiveKey={[item._id]} items={nestedItems} />
        )}
      </Form.List>
    </div>
  )
}

export default ColocationSelectors