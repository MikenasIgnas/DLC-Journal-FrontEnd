/* eslint-disable max-len */
import React from 'react'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { Racks } from '../types/globalTypes'
import { CheckboxValueType } from 'antd/es/checkbox/Group'

type State = {
  checkedList: string[];
  checkAllStates: { [key: string]: boolean };
};

const useSetCheckedCollocationList = () => {
  const [checkboxList, setCheckboxList] = React.useState<State>({
    checkedList:    [],
    checkAllStates: {},
  })

  const onCheckAllChange = React.useCallback((e: CheckboxChangeEvent, racks: Racks[], premiseName: string, site: string) => {
    setCheckboxList(prevState => {
      const allRackIds = racks.map(rack => rack._id).filter(id => id) as string[]
      const newCheckedList = e.target.checked
        ? [...new Set([...prevState.checkedList, ...allRackIds])]
        : prevState.checkedList.filter(id => !allRackIds.includes(id))

      return {
        ...prevState,
        checkedList:    newCheckedList,
        checkAllStates: {
          ...prevState.checkAllStates,
          [`${site}_${premiseName}`]: e.target.checked,
        },
      }
    })
  }, [])

  const onCheckboxChange = React.useCallback((selectedRacks: CheckboxValueType[], premiseName: string, site: string, racks: Racks[]) => {
    const selectedRackIds = selectedRacks.map(value => String(value))
    setCheckboxList(prevState => {
      const updatedCheckedList = [...prevState.checkedList]
      const sitePremiseKey = `${site}_${premiseName}`

      racks.forEach(rack => {
        const rackId = rack._id!
        if (selectedRackIds.includes(rackId) && !updatedCheckedList.includes(rackId)) {
          updatedCheckedList.push(rackId)
        } else if (!selectedRackIds.includes(rackId) && updatedCheckedList.includes(rackId)) {
          const indexToRemove = updatedCheckedList.indexOf(rackId)
          updatedCheckedList.splice(indexToRemove, 1)
        }
      })

      const allSelected = racks.every(rack => updatedCheckedList.includes(rack._id!))

      return {
        ...prevState,
        checkedList:    updatedCheckedList,
        checkAllStates: {
          ...prevState.checkAllStates,
          [sitePremiseKey]: allSelected,
        },
      }
    })
  }, [])

  return {
    checkboxList,
    checkAllStates: checkboxList.checkAllStates,
    onCheckAllChange,
    onCheckboxChange,
    setCheckboxList,
  }
}

export default useSetCheckedCollocationList