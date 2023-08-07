/* eslint-disable max-len */
import React                            from 'react'
import { ConfigProvider, Form, Radio }  from 'antd'
import HistoryProblemInputs             from './HistoryProblemInputs'
import { useAppSelector }               from '../../store/hooks'

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
  const defaultTheme =                            useAppSelector((state) => state.theme.value)
  const isMobile = window.innerWidth < 650
  return (
    <div style={{backgroundColor: defaultTheme ? '#1e1e1e' : ''}} className='ChecklistHistoryInputsMainContainer'>
      <div className='ChecklistHistoryInputsContainer' >
        <div style={{color: defaultTheme ? 'white' : 'black'}} className='PossibleProblems'>{possibleProblems}</div>
        <ConfigProvider theme = {{
          token: {
            colorBgContainerDisabled: defaultTheme ? 'lightgray' : 'white',
          },
        }}>
          <Form.Item
            {...rest}
            name={[name, Number(dutiesId)]}
            className='ChecklistFormItem'
          >
            <Radio.Group className='RadioGroup'>
              <Radio style={{color: defaultTheme ? 'white' : 'black'}} onChange={() => setRadioButtonValue(false)} disabled={!edit} value={false}>No</Radio>
              <Radio style={{color: defaultTheme ? 'white' : 'black'}} onChange={() => setRadioButtonValue(true)} disabled={!edit} value={true}>Yes</Radio>
            </Radio.Group>
          </Form.Item>
        </ConfigProvider>
      </div>
      {radioButtonValue || !!dutiesId && !!radioValues && !!radioValues[dutiesId] ? (<HistoryProblemInputs edit={edit} dutiesId={dutiesId} reaction={reaction} name={name} />) : ''}
    </div>
  )
}

export default ChecklistHisotoryInputs




