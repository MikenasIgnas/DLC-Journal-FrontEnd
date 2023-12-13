/* eslint-disable max-len */
import React           from 'react'
import { Form, Input } from 'antd'

type SingleCompaniesTitleProps = {
    companyTitle:       string | undefined;
    edit:               boolean;
    companyDescription: string | undefined;
}

const SingleCompanyTitle = ({companyTitle, companyDescription, edit}: SingleCompaniesTitleProps) => {
  return (
    <div >
      {!edit
        ?
        <div>
          <div style={{fontSize: '20px', marginLeft: '20px'}}>{companyTitle}</div>
          <div>{companyDescription}</div>
        </div>
        :
        <Form.Item name='companyName' initialValue={companyTitle}><Input/></Form.Item>
      }
    </div>
  )
}

export default SingleCompanyTitle