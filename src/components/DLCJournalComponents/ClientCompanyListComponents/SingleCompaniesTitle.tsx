/* eslint-disable max-len */
import React                                        from 'react'
import { Button, Form, Input }                      from 'antd'

type SingleCompaniesTitleProps = {
    companyTitle:       string | undefined;
    edit:               boolean;
    companyDescription: string | undefined;
}

const SingleCompanyTitle = ({companyTitle, companyDescription, edit}: SingleCompaniesTitleProps) => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
      <div style={{width: '50%',display: 'flex', alignItems: 'center'}}>
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
      <div>
        <Button htmlType='submit' type='link'>{!edit ? 'Edit' : 'Save'}</Button>
      </div>
    </div>
  )
}

export default SingleCompanyTitle