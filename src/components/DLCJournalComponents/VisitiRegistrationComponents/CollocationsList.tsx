/* eslint-disable max-len */
import React, { useState } from 'react'
import { Card, Checkbox, Form } from 'antd'
import { CollocationType } from '../../../types/globalTypes'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

type CollocationsListProps = {
  companiesColocations: CollocationType[] | undefined;
  setCheckedList:  React.Dispatch<React.SetStateAction<CollocationType>>
  checkedList: CollocationType
  edit?: boolean
};

const CollocationsList = ({ companiesColocations, setCheckedList, checkedList, edit }: CollocationsListProps) => {
  const [checkAllStates, setCheckAllStates] = useState<{ [key: string]: boolean }>({})
  const onCheckAllChange = (e: CheckboxChangeEvent, values: string[], category: string) => {
    setCheckedList((prev) => ({
      ...prev,
      [category]: e.target.checked ? values : [],
    }))
    setCheckAllStates((prev) => ({
      ...prev,
      [category]: e.target.checked,
    }))
  }

  const onCheckboxChange = (list: string[], category: string) => {
    setCheckedList((prev) => ({
      ...prev,
      [category]: list,
    }))
    setCheckAllStates((prev) => ({
      ...prev,
      [category]: list.length === (companiesColocations?.find((collocation) => Object.keys(collocation)[0] === category)?.[category]?.length || 0),
    }))
  }

  return (
    <Card
      title={
        <div>
          Kolokacijossssss
        </div>
      }
      className='CollocationsListCard'
    >
      <div className='CollocationsListCardBody'>
        {companiesColocations?.map((el, i) => {
          const [category, values] = Object.entries(el)[0]
          return (
            <Card className='CollocationItemCard' key={i} title={category}>
              <Form.Item name={['visitCollocation', category]}>
                <Checkbox disabled={edit} onChange={(e) => onCheckAllChange(e, values, category)} checked={checkAllStates[category]}>
                  {checkAllStates[category] ? 'Atžymėti visus' : 'Pažymėti visus'}
                </Checkbox>
                <Checkbox.Group disabled={edit} options={values} value={checkedList[category]} onChange={(list: any) => onCheckboxChange(list, category)} />
              </Form.Item>
            </Card>
          )
        })}
      </div>
    </Card>
  )
}

export default CollocationsList






/* eslint-disable max-len */
// import React                    from 'react'
// import { Card, Checkbox, Form}  from 'antd'
// import { CollocationType }      from '../../../types/globalTypes'

// type CollocationsListProps = {
//     companiesColocations: CollocationType[] | undefined
// }

// const CollocationsList = ({companiesColocations}: CollocationsListProps) => {
//   return (
//     <Card title={'Kolokacijos'} className='CollocationsListCard'>
//       <div className='CollocationsListCardBody'>
//         {companiesColocations?.map((el, i) => {
//           const objEntries = Object.entries(el)
//           return(
//             <Card className='CollocationItemCard' key={i} title={objEntries[0][0]}>
//               <Form.Item name={['visitCollocation', objEntries[0][0]]} >
//                 <Checkbox.Group options={objEntries[0][1]} key={i}/>
//               </Form.Item>
//             </Card>
//           )})
//         }
//       </div>
//     </Card>
//   )
// }

// export default CollocationsList