/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                from 'react'
import { Avatar, Form, Input, UploadFile }  from 'antd'
import PhotoUploader                        from '../../UniversalComponents/PhotoUploader/PhotoUploader'
import useSetWindowsSize                    from '../../../Plugins/useSetWindowsSize'

type SingleCompaniesTitleProps = {
    companyTitle:       string | undefined;
    edit:               boolean;
    companyDescription: string | undefined;
    companyLogo:        string | undefined;
    setFileList:        React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
    fileList:           UploadFile<any>[]
    companyCode:        string | undefined
}

const SingleCompanyTitle = ({companyTitle, companyDescription, edit, companyLogo, setFileList, fileList, companyCode}: SingleCompaniesTitleProps) => {
  const windowSize = useSetWindowsSize()

  return (
    <div>
      {!edit ?
        <div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>{companyCode}</div>
            <Avatar shape='square' size={70} style={{margin: '10px'}} src={<img style={{objectFit: 'contain'}} src={`../../CompanyLogos/${companyLogo ? companyLogo : 'noImage.jpg'}`}alt='err' />}/>
            <div style={{fontSize: windowSize > 600 ? '20px' : '12px', marginLeft: '20px'}}>{companyTitle?.toUpperCase()}</div>
          </div>
          <div style={{fontSize: windowSize > 600 ? '15px' : '8px'}}>{companyDescription}</div>
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