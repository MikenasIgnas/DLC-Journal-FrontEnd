/* eslint-disable max-len */
import React           from 'react'
import { Avatar, Form, Input } from 'antd'

type SingleCompaniesTitleProps = {
    companyTitle:       string | undefined;
    edit:               boolean;
    companyDescription: string | undefined;
    companyLogo:        string | undefined;
}

const SingleCompanyTitle = ({companyTitle, companyDescription, edit, companyLogo}: SingleCompaniesTitleProps) => {
  return (
    <div >
      {!edit
        ?
        <div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Avatar src={`../../CompanyLogos/${companyLogo ? companyLogo : 'noImage.jpg'}`}></Avatar>
            <div style={{fontSize: '20px', marginLeft: '20px'}}>{companyTitle?.toUpperCase()}</div>
          </div>
          <div>{companyDescription}</div>
        </div>
        :
        <Form.Item name='companyName' initialValue={companyTitle}><Input/></Form.Item>
      }
    </div>
  )
}

export default SingleCompanyTitle