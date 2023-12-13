/* eslint-disable max-len */
import * as React           from 'react'
import VisitPurposeButtons  from './VisitPurposeButtons'


const VisitPurposeForm = () => {
  const aa= ['Komutacija', 'Irangos inesimas', 'irangos isnesimas', 'profilaktika']
  return (
    <div>
      {aa?.map((el, i) => <VisitPurposeButtons buttonText={el} key={i} buttonWidth={(100 / aa.length) - 5}/>)}
    </div>
  )
}

export default VisitPurposeForm