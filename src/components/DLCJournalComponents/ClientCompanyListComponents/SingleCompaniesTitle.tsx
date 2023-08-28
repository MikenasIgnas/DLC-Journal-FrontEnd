/* eslint-disable max-len */
import React                                        from 'react'
import { Avatar, Button, Form, Input, UploadFile }  from 'antd'
import PhotoUploader                                from '../UniversalComponents/PhotoUploader/PhotoUploader'
import { RcFile }                                   from 'antd/es/upload'

type SingleCompaniesTitleProps = {
    companyTitle:       string | undefined;
    edit:               boolean;
    companyDescription: string | undefined;
    setFileList:        React.Dispatch<React.SetStateAction<UploadFile<RcFile>[]>>
    fileList:           UploadFile<RcFile>[];
    companyPhoto:       string | undefined;
}

const SingleCompanyTitle = ({companyTitle, companyDescription, edit, setFileList, fileList, companyPhoto}: SingleCompaniesTitleProps) => {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', width: '50%'}}>
        {!edit ?
          <Avatar src={<img
            src={`../CompanyLogos/${companyPhoto !== '' ? companyPhoto : 'noImage.jpg'}` }
            alt='err' />}
          />
          :
          <div>
            <Avatar src={<img
              src={`../CompanyLogos/${companyPhoto !== '' ? companyPhoto : 'noImage.jpg'}` }
              alt='err' />}
            />
            <PhotoUploader setFileList={setFileList} fileList={fileList}/>
          </div>
        }
        {!edit
          ?
          <div>
            <div>{companyTitle}</div>
            <div>{companyDescription}</div>
          </div>
          :
          <Form.Item name='companyName' initialValue={companyTitle}><Input/></Form.Item>
        }
        <Button htmlType='submit' type='link'>{!edit ? 'Edit' : 'Save'}</Button>
      </div>
    </div>
  )
}

export default SingleCompanyTitle