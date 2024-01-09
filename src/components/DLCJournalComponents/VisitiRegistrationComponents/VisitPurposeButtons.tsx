/* eslint-disable max-len */
import React      from 'react'
import { Button } from 'antd'

type VisitPurposeButtonsProps = {
  buttonText:   string;
  buttonWidth:  number;
};

const VisitPurposeButtons = ({ buttonText }: VisitPurposeButtonsProps) => {
  const [isToggled, setToggled] = React.useState(false)

  React.useEffect(() => {
    const selectedButtons = JSON.parse(localStorage.getItem('visitPurpose') || '[]')
    setToggled(selectedButtons.includes(buttonText))
  }, [buttonText])

  const handleToggle = () => {
    setToggled(!isToggled)
    const visitPurposeButtons = JSON.parse(localStorage.getItem('visitPurpose') || '[]')
    const updatedButtons = isToggled
      ? visitPurposeButtons.filter((button: string) => button !== buttonText)
      : [...visitPurposeButtons, buttonText]
    localStorage.setItem('visitPurpose', JSON.stringify(updatedButtons))
  }

  return (
    <Button className='VisitPurposeButton' type={isToggled ? 'primary' : 'default'} onClick={handleToggle}>
      {buttonText}
    </Button>
  )
}

export default VisitPurposeButtons