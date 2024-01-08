/* eslint-disable max-len */
import React                                                        from 'react'
import { Card, Checkbox, Col, ConfigProvider, Divider, Form, Row }  from 'antd'
import { CollocationsType, CollocationsSites }                      from '../../../../types/globalTypes'
import { CheckboxChangeEvent }                                      from 'antd/es/checkbox'

type CollocationFormListProps = {
    collocations:      CollocationsType[] | undefined;
    collocationsSites: CollocationsSites
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
}

const EditableCollocationFormList = ({collocations, collocationsSites, checkAllStates, checkedList, onCheckAllChange, onCheckboxChange}: CollocationFormListProps) => {

  return (
    <div className='EditableCollocationContainer'>
      {collocations?.map((colocation, colocationIndex) => (
        <div style={{width: '45%'}} key={colocationIndex}>
          <Divider>{colocation.site}</Divider>
          {colocation.premises.map((premise, premiseIndex) => {
            const premiseKey = `${colocation.site}_${premise.premiseName}`
            const selectedRackData = collocationsSites[colocation.site]?.find(data => data[premise.premiseName])
            const initialValue = selectedRackData ? selectedRackData[premise.premiseName] : []
            const checkedRacks = checkedList[colocation.site]?.find(p => p[premise.premiseName])?.[premise.premiseName] || initialValue
            return (
              <Col key={premiseIndex}>
                <Card style={{overflow: 'auto', maxHeight: '250px'}}>
                  <Divider>{premise.premiseName}</Divider>
                  <Checkbox
                    onChange={(e) => onCheckAllChange(e, premise.racks, premise.premiseName, colocation.site)}
                    checked={checkAllStates[premiseKey]}
                  >
                    {checkAllStates[premiseKey] ? 'Uncheck All' : 'Check All'}
                  </Checkbox>
                  <Checkbox.Group
                    options={premise.racks.map(rack => ({ label: rack, value: rack }))}
                    value={checkedRacks}
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