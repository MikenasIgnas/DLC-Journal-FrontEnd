/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import { Checkbox, Collapse, CollapseProps, Form } from 'antd'
import { useAppSelector } from '../../../../store/hooks'
import { Racks, Sites } from '../../../../types/globalTypes'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { CheckboxValueType } from 'antd/es/checkbox/Group'

type ColocationSelectorsProps = {
  item: Sites;
  checkboxList: string[];
  onCheckAllChange: (e: CheckboxChangeEvent, racks: Racks[], premiseName: string, site: string) => void;
  onCheckboxChange: (selectedRacks: CheckboxValueType[], premiseName: string, site: string, racks: Racks[]) => void;
  checkAllStates: {
    [key: string]: boolean;
  };
  companyRacks?: string[];
};

const ColocationSelectors = ({
  item,
  checkboxList,
  onCheckAllChange,
  onCheckboxChange,
  checkAllStates,
}: ColocationSelectorsProps) => {
  const premises = useAppSelector((state) => state.sites.premise)?.filter((el) => el.siteId === item._id)
  const racks = useAppSelector((state) => state.sites.racks)

  const nestedItems = premises?.map((premise) => {
    const filteredRacks = racks?.filter((el) => el.premiseId === premise._id) || []
    const premiseKey = `${item.name}_${premise.name}`
    const checkedRacks = filteredRacks.filter(rack => checkboxList.includes(rack._id!)).map(rack => rack._id!)
    return {
      key:      premise._id,
      label:    premise.name,
      children: (
        <>
          <Checkbox
            onChange={(e) => onCheckAllChange(e, filteredRacks, premise.name, item.name)}
            checked={checkAllStates[premiseKey]}
          >
            {checkAllStates[premiseKey] ? 'Uncheck All' : 'Check All'}
          </Checkbox>
          <Checkbox.Group
            options={filteredRacks.map((rack) => ({
              label: rack.name || 'Unnamed Rack',
              value: rack._id || 'undefined-id',
            })).filter((rack) => rack.value !== 'undefined-id')}
            value={checkedRacks}
            onChange={(selectedValues) => onCheckboxChange(selectedValues, premise.name, item.name, filteredRacks)}
          />
        </>
      ),
    }
  })

  const formList = (
    <Form.List name={item.name}>
      {() => (
        <Collapse items={nestedItems} />
      )}
    </Form.List>
  )

  const items: CollapseProps['items'] = [
    {
      key:      '1',
      label:    item.name,
      children: formList,
    },
  ]

  return (
    <div style={{ width: '100%' }} key={item._id}>
      <Collapse items={items} />
    </div>
  )
}

export default ColocationSelectors