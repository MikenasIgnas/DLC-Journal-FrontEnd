/* eslint-disable max-len */
import React from 'react'
import { Checkbox, Divider } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

type PremiseCheckboxesProps = {
  premiseId: string;
  options: { value: string; label: string }[];
  checkedLists: { [premiseId: string]: CheckboxValueType[] };
  setCheckedLists: React.Dispatch<React.SetStateAction<{ [premiseId: string]: CheckboxValueType[] }>>;
};

const PremiseCheckboxes: React.FC<PremiseCheckboxesProps> = ({
  premiseId,
  options,
  checkedLists,
  setCheckedLists,
}) => {
  // Determine if "Check all" should be checked or indeterminate
  const checkedList = checkedLists[premiseId] || []
  const allChecked = options.length > 0 && options.every(option => checkedList.includes(option.value))
  const isIndeterminate = checkedList.length > 0 && !allChecked

  // Handle change for individual checkboxes
  const onCheckboxGroupChange = (selectedValues: CheckboxValueType[]) => {
    setCheckedLists(prevLists => ({ ...prevLists, [premiseId]: selectedValues }))
  }

  // Handle "Check all" checkbox change
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const newCheckedList = e.target.checked ? options.map(option => option.value) : []
    setCheckedLists(prevLists => ({ ...prevLists, [premiseId]: newCheckedList }))
  }

  return (
    <>
      <Checkbox
        indeterminate={isIndeterminate}
        onChange={onCheckAllChange}
        checked={allChecked}
        style={{ marginBottom: '10px' }}
      >
        Check all
      </Checkbox>
      <Divider />
      <Checkbox.Group
        options={options}
        value={checkedList}
        onChange={onCheckboxGroupChange}
      />
    </>
  )
}

export default PremiseCheckboxes