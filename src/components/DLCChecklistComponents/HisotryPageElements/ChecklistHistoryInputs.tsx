/* eslint-disable max-len */
import React                            from 'react'
import { ConfigProvider, Form, Radio }  from 'antd'
import HistoryProblemInputs             from './HistoryProblemInputs'
import { useAppSelector }               from '../../../store/hooks'

type InputProps = {
  reaction:         string | undefined,
  possibleProblems: string | undefined,
  dutiesId?:        number | undefined,
  name:             number,
  rest:{
    key:            number,
    fieldKey?:      number | undefined,
  },
  radioValues:      { [key: string] : boolean; } | undefined,
  edit:             boolean,
};

const ChecklistHisotoryInputs = ({
  reaction,
  possibleProblems,
  name,
  dutiesId,
  rest,
  radioValues,
  edit,
}:InputProps) => {
  const [radioButtonValue, setRadioButtonValue] = React.useState(false)
  return (
    <div className='ChecklistHistoryInputsMainContainer'>
      <div className='ChecklistHistoryInputsContainer' >
        <div className='PossibleProblems'>{possibleProblems}</div>
        <Form.Item
          {...rest}
          name={[name, Number(dutiesId)]}
          className='ChecklistFormItem'
        >
          <Radio.Group className='RadioGroup'>
            <Radio onChange={() => setRadioButtonValue(false)} disabled={!edit} value={false}>No</Radio>
            <Radio onChange={() => setRadioButtonValue(true)} disabled={!edit} value={true}>Yes</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
      {radioButtonValue || !!dutiesId && !!radioValues && !!radioValues[dutiesId] ? (<HistoryProblemInputs edit={edit} dutiesId={dutiesId} reaction={reaction} name={name} />) : ''}
    </div>
  )
}

export default ChecklistHisotoryInputs