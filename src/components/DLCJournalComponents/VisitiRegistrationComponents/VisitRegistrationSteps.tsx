import React from 'react'
import { Divider, Steps } from 'antd'

type JournalStepsProps = {
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const VisitRegistrationSteps = ({current, setCurrent}: JournalStepsProps) => {
  const onChange = (value: number) => {
    setCurrent(value)
  }

  return (
    <>
      <Steps
        type='navigation'
        current={current}
        className='site-navigation-steps'
        onChange={onChange}
        items={[
          {
            title: 'Atvykstantis klientas',
          },
          {
            title: 'Vizito tikslas',
          },
          {
            title: 'Kliento identifikacija',
          },
        ]}
      />
      <Divider />
    </>
  )
}

export default VisitRegistrationSteps