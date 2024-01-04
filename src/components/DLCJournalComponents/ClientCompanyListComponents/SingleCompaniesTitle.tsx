/* eslint-disable max-len */
import React                    from 'react'
import { Avatar, Form, Input, UploadFile }  from 'antd'
import PhotoUploader            from '../../UniversalComponents/PhotoUploader/PhotoUploader'

type SingleCompaniesTitleProps = {
    companyTitle:       string | undefined;
    edit:               boolean;
    companyDescription: string | undefined;
    companyLogo:        string | undefined;
    setFileList:        React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
    fileList:           UploadFile<any>[]
}

const SingleCompanyTitle = ({companyTitle, companyDescription, edit, companyLogo, setFileList, fileList}: SingleCompaniesTitleProps) => {


  return (
    <div>
      {!edit ?
        <div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Avatar shape='square' size={70} style={{margin: '10px'}} src={<img style={{objectFit: 'contain'}} src={`../../CompanyLogos/${companyLogo ? companyLogo : 'noImage.jpg'}`}alt='err' />}/>
            <div style={{fontSize: '20px', marginLeft: '20px'}}>{companyTitle?.toUpperCase()}</div>
          </div>
          <div>{companyDescription}</div>
        </div>
        :
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <Form.Item name='companyName' initialValue={companyTitle}><Input/></Form.Item>
          <Avatar shape='square' size={70} style={{margin: '10px'}} src={<img style={{objectFit: 'contain'}} src={`../../CompanyLogos/${companyLogo ? companyLogo : 'noImage.jpg'}`} alt='err' />}/>
          <PhotoUploader setFileList={setFileList} fileList={fileList}/>
        </div>
      }
    </div>
  )
}

export default SingleCompanyTitle