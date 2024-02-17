/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import {
  Checkbox,
  Collapse,
  CollapseProps,
}                             from 'antd'

import { FullSiteData }       from '../../../../types/globalTypes'

import {
  useAppDispatch,
  useAppSelector,
}                             from '../../../../store/hooks'

import {
  addToChecklist,
  removeFromChecklist,
}                              from '../../../../auth/RacksReducer/RacksReducer'

import { CheckboxChangeEvent } from 'antd/es/checkbox'

type ColocationSelectorsProps = {
  item: FullSiteData
};

const ColocationSelectors = ({item}: ColocationSelectorsProps) => {
  const checkedList = useAppSelector((state) => state.racks.checkedList)
  const dispatch  = useAppDispatch()

  const nestedItems = item.premises.map((premise) => {

    const checkboxOptions = premise.racks.map(rack => ({ value: rack._id, label: rack.name }))
    const racksIds        = premise.racks.map((el) => el._id)
    const checkAll        = racksIds.length > 0 && racksIds.every((el) => checkedList.includes(el))

    const onChecboxChange = (list: string[]) => {
      const filterCheckedRacks = racksIds.filter(id => !list.includes(id))
      dispatch(addToChecklist(list))
      dispatch(removeFromChecklist(filterCheckedRacks))
    }

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
      if(e.target.checked){
        dispatch(addToChecklist(racksIds))
      }else{
        dispatch(removeFromChecklist(racksIds))
      }
    }

    return {
      key:      premise._id,
      label:    premise.name,
      children: (
        <>
          <Checkbox
            onChange={onCheckAllChange}
            checked={checkAll}
          >
          Check All
          </Checkbox>
          <Checkbox.Group
            value={checkedList}
            onChange={(val) => onChecboxChange(val as string[])}
            options={checkboxOptions}
          />
        </>
      ),
    }
  })



  const items: CollapseProps['items'] = [
    {
      key:      '1',
      label:    item.name,
      children: <Collapse items={nestedItems} />,
    },
  ]

  return (
    <div style={{ width: '100%' }} key={item._id}>
      <Collapse items={items} />
    </div>
  )
}

export default ColocationSelectors