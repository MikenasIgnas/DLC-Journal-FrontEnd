import React from 'react'
import { Divider, Steps } from 'antd'

type JournalStepsProps = {
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const JournalSteps = ({current, setCurrent}: JournalStepsProps) => {

  const onChange = (value: number) => {
    console.log('onChange:', value)
    setCurrent(value)
  }
  const description = 'This is a description.'

  return (
    <>
      <Steps
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            description,
          },
          {
            title: 'Step 2',
            description,
          },
          {
            title: 'Step 3',
            description,
          },
        ]}
      />
      <Divider />
    </>
  )
}

export default JournalSteps