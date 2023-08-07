/* eslint-disable max-len */
import { Card } from 'antd'
import React from 'react'


type VisitPurposeForm = {
    setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const VisitPurposeForm = ({setCurrent}: VisitPurposeForm) => {
  const handleCardClick = (value: string) => {
    const puppose = {
      visitPurpose: value,
    }
    console.log(puppose)
    localStorage.setItem('visitDetails2', JSON.stringify(puppose))
    setCurrent(2)
  }



  return (
    <div style={{display: 'flex', width: '100%' }}>
      <div style={{width: '50%'}}>
        <Card hoverable={true} onClick={() => handleCardClick('Įrangos įnešimas')}>Įrangos įnešimas</Card>
        <Card hoverable={true} onClick={() => handleCardClick('Įrangos išnešimas')} >Įrangos išnešimas</Card>
      </div>
      <div style={{width: '50%'}}>
        <Card hoverable={true} onClick={() => handleCardClick('Komutavimas')}>Komutavimas</Card>
        <Card hoverable={true} onClick={() => handleCardClick('Konfiguracija')}>Konfiguracija</Card>
      </div>
    </div>
  )
}

export default VisitPurposeForm