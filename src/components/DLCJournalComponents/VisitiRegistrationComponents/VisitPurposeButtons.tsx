/* eslint-disable max-len */
import React      from 'react'
import { Button } from 'antd'
import { Permissions }       from '../../../types/globalTypes'

type VisitPurposeButtonsProps = {
  buttonWidth:  number;
  item: Permissions
};

const VisitPurposeButtons = ({ item }: VisitPurposeButtonsProps) => {
  const [isToggled, setToggled] = React.useState(false)

  React.useEffect(() => {
    const selectedButtons = JSON.parse(localStorage.getItem('visitPurpose') || '[]')
    setToggled(selectedButtons.includes(item.name))
  }, [item.name])

  const handleToggle = () => {
    setToggled(!isToggled)
    const visitPurposeButtons = JSON.parse(localStorage.getItem('visitPurpose') || '[]')
    const updatedButtons = isToggled
      ? visitPurposeButtons.filter((button: string) => button !== item._id)
      : [...visitPurposeButtons, item._id]
    localStorage.setItem('visitPurpose', JSON.stringify(updatedButtons))
  }

  return (
    <Button className='VisitPurposeButton' type={isToggled ? 'primary' : 'default'} onClick={handleToggle}>
      {item.name}
    </Button>
  )
}

export default VisitPurposeButtons