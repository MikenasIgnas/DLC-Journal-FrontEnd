/* eslint-disable max-len */
import { Button, Form, Input }   from 'antd'
import React        from 'react'

type SingleCompaniesTitleProps = {
    companyTitle:       string | undefined;
    setEdit:            React.Dispatch<React.SetStateAction<boolean>>;
    edit:               boolean;
    companyDescription: string | undefined;
}

const SingleCompanyTitle = ({companyTitle, companyDescription, setEdit, edit}: SingleCompaniesTitleProps) => {

  const editCompany = () => {
    setEdit(!edit)
  }
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', width: '50%'}}>
        {!edit ?
          <div>
            <div>{companyTitle}</div>
            <div>{companyDescription}</div>
          </div> : <Form.Item name='companyName' initialValue={companyTitle}><Input/></Form.Item> }
        <Button onClick={editCompany} type='link'>{!edit ? 'Edit' : 'Save'}</Button>
      </div>
    </div>
  )
}

export default SingleCompanyTitle