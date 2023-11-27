/* eslint-disable max-len */
import React      from 'react'
import { Button } from 'antd'

type VisitPurposeButtonsProps = {
    buttonText:   string;
    buttonWidth:  number;
}

const VisitPurposeButtons = ({buttonText, buttonWidth}: VisitPurposeButtonsProps) => {
  const [isToggled, setToggled] = React.useState(false)

  React.useEffect(() => {
    const selectedButtons = JSON.parse(localStorage.getItem('selectedButtons') || '[]')
    setToggled(selectedButtons.includes(buttonText))
    setToggled(false)
  }, [buttonText])

  const handleToggle = () => {
    setToggled(!isToggled)
    const selectedButtons = JSON.parse(localStorage.getItem('selectedButtons') || '[]')
    const updatedButtons = isToggled
      ? selectedButtons.filter((button: string) => button !== buttonText)
      : [...selectedButtons, buttonText]
    localStorage.setItem('selectedButtons', JSON.stringify(updatedButtons))
  }

  return (
    <Button style={{width: `${buttonWidth}%`, height: '110px'}} type={isToggled ? 'primary' : 'default'} onClick={handleToggle}>
      {buttonText}
    </Button>
  )
}

export default VisitPurposeButtons