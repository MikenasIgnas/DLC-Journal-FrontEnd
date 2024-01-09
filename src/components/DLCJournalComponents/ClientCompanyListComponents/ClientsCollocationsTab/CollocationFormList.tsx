/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import { Card, Checkbox, Col, Divider }               from 'antd'
import { CollocationsType, CollocationsSites, State } from '../../../../types/globalTypes'
import { CheckboxChangeEvent }                        from 'antd/es/checkbox'
import React                                          from 'react'

type CheckedList = {
  [site: string]: {
    [premiseName: string]: string[];
}[];
}
type CollocationFormListProps = {
  collocations: CollocationsType[] | undefined;
  collocationsSites: CollocationsSites;
  checkedList: CheckedList
  checkAllStates: {
      [key: string]: boolean;
  };
  onCheckAllChange: (e: CheckboxChangeEvent, racks: string[], premiseName: string, site: string) => void;
  onCheckboxChange: (selectedRacks: string[], premiseName: string, site: string, racks: string[]) => void;
  setCheckedList: React.Dispatch<React.SetStateAction<State>>

}

const EditableCollocationFormList = ({ collocations, setCheckedList, collocationsSites, checkAllStates, checkedList, onCheckAllChange, onCheckboxChange }: CollocationFormListProps) => {
  React.useEffect(() => {
    let shouldUpdate = false
    const initialCheckedList = { ...checkedList }

    collocations?.forEach(colocation => {
      colocation.premises.forEach(premise => {
        const selectedRackData = collocationsSites[colocation.site]?.find(data => data[premise.premiseName])
        const initialValue = selectedRackData ? selectedRackData[premise.premiseName] : []

        if (!initialCheckedList[colocation.site]) {
          initialCheckedList[colocation.site] = [{ [premise.premiseName]: initialValue }]
          shouldUpdate = true
        } else {
          const existingEntry = initialCheckedList[colocation.site].find(entry => entry.hasOwnProperty(premise.premiseName))
          if (!existingEntry) {
            initialCheckedList[colocation.site].push({ [premise.premiseName]: initialValue })
            shouldUpdate = true
          }
        }
      })
    })

    if (shouldUpdate) {
      setCheckedList(prevState => ({
        ...prevState,
        checkedList: initialCheckedList,
      }))
    }
  }, [collocations, collocationsSites, checkedList, setCheckedList])

  return (
    <div className='EditableCollocationContainer'>
      {collocations?.map((colocation, colocationIndex) => (
        <div style={{ width: '45%' }} key={colocationIndex}>
          <Divider>{colocation.site}</Divider>
          {colocation.premises.map((premise, premiseIndex) => {
            const premiseKey = `${colocation.site}_${premise.premiseName}`
            const selectedRackData = collocationsSites[colocation.site]?.find(data => data[premise.premiseName])
            const initialValue = selectedRackData ? selectedRackData[premise.premiseName] : []
            const checkedRacks = checkedList[colocation.site]?.find(p => p[premise.premiseName])?.[premise.premiseName] || initialValue
            return (
              <Col key={premiseIndex}>
                <Card style={{ overflow: 'auto', maxHeight: '250px' }}>
                  <Divider>{premise.premiseName}</Divider>
                  <Checkbox
                    onChange={(e) => onCheckAllChange(e, premise.racks, premise.premiseName, colocation.site)}
                    checked={checkAllStates[premiseKey]}
                  >
                    {checkAllStates[premiseKey] ? 'Pažymėti visas' : 'Atžymėti visas'}
                  </Checkbox>
                  <Checkbox.Group
                    options={premise.racks.map(rack => ({ label: rack, value: rack }))}
                    value={checkedRacks.length >= 0 ? checkedRacks : initialValue}
                    onChange={(selectedRacks) => onCheckboxChange(selectedRacks as string[], premise.premiseName, colocation.site, premise.racks)}
                  />
                </Card>
              </Col>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default EditableCollocationFormList