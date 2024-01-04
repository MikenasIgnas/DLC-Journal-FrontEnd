/* eslint-disable max-len */
import React                                        from 'react'
import { Checkbox, Collapse, CollapseProps, Form }  from 'antd'

type ColocationSelectorsProps = {
    collocationSite:    string;
    colocationPremises: {
      premiseName:      string;
      racks:            string[]
    }[];
    colocationId:       number;
}

const ColocationSelectors = ({collocationSite, colocationPremises, colocationId }: ColocationSelectorsProps) => {

  const nestedItems = (premiseName: string, racks:string[], name: number) => {
    const item: CollapseProps['items'] = [
      {
        key:   '1',
        label: premiseName,
        children:
        <Form.Item name={[name, premiseName]}>
          <Checkbox.Group options={racks} className='CollocationSelectorCheckboxes'/>
        </Form.Item>,
      },
    ]
    return item
  }


  const FormList = () => {
    return(
      <Form.List
        name={collocationSite}
        initialValue={colocationPremises?.map((ele) => ({[ele.premiseName]: []}))}
      >
        {(fields) => {
          return fields?.map(({ name }, index) => {
            const premise = colocationPremises[index]
            return <Collapse key={index} items={nestedItems(premise.premiseName, premise.racks, name)}/>
          })}
        }
      </Form.List>
    )
  }

  const items: CollapseProps['items'] = [
    {
      key:      '1',
      label:    collocationSite,
      children: <FormList/>,
    },
  ]

  return(
    <div style={{width: '100%'}} key={colocationId}>
      <Collapse items={items}/>
    </div>
  )
}

export default ColocationSelectors