/* eslint-disable max-len */
import React                              from 'react'
import { Form, Radio, Tooltip }           from 'antd'
import AreaProblemsInputs                 from './AreaProblemsInputs'
import { InfoCircleOutlined }             from '@ant-design/icons'
import { useAppSelector }                 from '../../../store/hooks'

type InputProps = {
  reaction:             string | undefined,
  possibleProblems:     string | undefined,
  dutiesId:             number | undefined,
  name:                 number,
  rest:  {
    key:                number,
    fieldKey?:          number | undefined,
  }
  radioValues:          { [key: string] : boolean; } | undefined,
  alreadyFilledValues:  { [key: string] : boolean; } | undefined,
};
const ChecklistInputs = ({
  reaction,
  possibleProblems,
  name,
  dutiesId,
  rest,
  radioValues,
  alreadyFilledValues,
}:InputProps) => {
  const [noSelected, setNoSelected] = React.useState(false)
  const defaultTheme =                useAppSelector((state) => state.theme.value)
  return (
    <div style={{backgroundColor: defaultTheme ? '#1e1e1e' : 'white'}} className='ChecklistHistoryInputsMainContainer'>
      <div className='ChecklistHistoryInputsContainer'>
        <div className='PossibleProblems' >
          {possibleProblems}
          {dutiesId && radioValues && radioValues[dutiesId] === true &&
              <Tooltip
                title={
                  `Pasirinkta: ${radioValues[dutiesId] === true ? 'Taip' : '' },
                   TicketNr: ${radioValues.ticketNr},
                   Laikas: ${radioValues.time},
                   Pastabos: ${radioValues.notes}.`
                }
                placement='topLeft'
              >
                <InfoCircleOutlined style={{color: 'red', marginLeft: '10px'}}/>
              </Tooltip>
          }
        </div>
        <Form.Item
          {...rest}
          name={[name, Number(dutiesId)]}
          rules={[{ required: true, message: 'Pasirinkite vieną' }]}
        >

          <Radio.Group buttonStyle='outline' className='RadioGroup'>
            <Radio style={{color: defaultTheme ? 'white' : 'black'}} onChange={() => setNoSelected(false)} value={false}>Ne</Radio>
            <Radio style={{color: defaultTheme ? 'white' : 'black'}} onChange={() => setNoSelected(true)} value={true}>Taip</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
      {noSelected || (alreadyFilledValues && dutiesId && alreadyFilledValues[dutiesId]) ? (
        <AreaProblemsInputs dutiesId={dutiesId} name={name} reaction={reaction} />
      ) : null}
    </div>
  )
}

export default ChecklistInputs
