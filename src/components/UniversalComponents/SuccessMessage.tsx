/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type SuccessMessageProps = {
    contextHolder:React.ReactElement<any, string | React.JSXElementConstructor<any>>,

};
const SuccessMessage = ({ contextHolder }:SuccessMessageProps) => (
  <div>
    {contextHolder}
  </div>
)

export default SuccessMessage
