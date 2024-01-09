/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import { Checkbox, Collapse, CollapseProps, Form }  from 'antd'
import { CheckboxChangeEvent }                      from 'antd/es/checkbox'

type ColocationSelectorsProps = {
  collocationSite: string;
  colocationPremises: {
    premiseName: string;
    racks: string[];
  }[];
  colocationId: number;
  checkedList: {
    [site: string]: {
        [premiseName: string]: string[];
    }[];
  };
  checkAllStates: {
    [key: string]: boolean;
  };
  onCheckAllChange: (e: CheckboxChangeEvent, racks: string[], premiseName: string, site: string) => void;
  onCheckboxChange: (selectedRacks: string[], premiseName: string, site: string, racks: string[]) => void;
};

const ColocationSelectors = ({
  collocationSite,
  colocationPremises,
  colocationId,
  checkAllStates,
  checkedList,
  onCheckAllChange,
  onCheckboxChange,
}: ColocationSelectorsProps) => {

  const nestedItems = colocationPremises.map((premise, index) => {
    const premiseKey = `${collocationSite}_${premise.premiseName}`
    const checkedRacks = checkedList[collocationSite]?.find(p => p[premise.premiseName])?.[premise.premiseName] || []

    return {
      key:      index.toString(),
      label:    premise.premiseName,
      children: (
        <>
          <Checkbox
            onChange={(e) => onCheckAllChange(e, premise.racks, premise.premiseName, collocationSite)}
            checked={checkAllStates[premiseKey]}
          >
            {checkAllStates[premiseKey] ? 'Atžymėti visas' : 'Pažymėti visas'}
          </Checkbox>
          <Checkbox.Group
            options={premise.racks.map(rack => ({ label: rack, value: rack }))}
            value={checkedRacks}
            onChange={(selectedRacks) => onCheckboxChange(selectedRacks as string[], premise.premiseName, collocationSite, premise.racks)}
          />
        </>
      ),
    }
  })

  const formList = (
    <Form.List
      name={collocationSite}
      initialValue={colocationPremises?.map((ele) => ({[ele.premiseName]: []}))}
    >
      {() => (
        <Collapse items={nestedItems} />
      )}
    </Form.List>
  )

  const items: CollapseProps['items'] = [
    {
      key:      '1',
      label:    collocationSite,
      children: formList,
    },
  ]

  return (
    <div style={{ width: '100%' }} key={colocationId}>
      <Collapse items={items} />
    </div>
  )
}

export default ColocationSelectors