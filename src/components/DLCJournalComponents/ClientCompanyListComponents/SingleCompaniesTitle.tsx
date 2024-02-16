/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                from 'react'
import { Avatar, Form, Input, UploadFile }  from 'antd'
import PhotoUploader                        from '../../UniversalComponents/PhotoUploader/PhotoUploader'
import useSetWindowsSize                    from '../../../Plugins/useSetWindowsSize'
import { CompaniesType }                    from '../../../types/globalTypes'

type SingleCompaniesTitleProps = {
    edit:        boolean;
    setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
    fileList:    UploadFile<any>[]
    company:     CompaniesType | undefined
}

const SingleCompanyTitle = ({company, edit, setFileList, fileList}: SingleCompaniesTitleProps) => {
  const windowSize = useSetWindowsSize()

  return (
    <div>
      {!edit ?
        <div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>{company?.code}</div>
            <Avatar
              shape='square'
              size={70}
              style={{margin: '10px'}}
              src={
                <img style={{objectFit: 'contain'}}
                  src={company?.photo ? company?.photo :'../../CompanyLogos/noImage.jpg'}
                  alt='err'
                />
              }
            />
            <div style={{fontSize: windowSize > 600 ? '20px' : '12px', marginLeft: '20px'}}>{company?.name?.toUpperCase()}</div>
          </div>
          <div style={{fontSize: windowSize > 600 ? '15px' : '8px'}}>{company?.description}</div>
        </div>
        :
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <Form.Item name='name' initialValue={company?.name}><Input/></Form.Item>
          <Form.Item name='description' initialValue={company?.description}><Input/></Form.Item>
          <Avatar
            shape='square'
            size={70}
            style={{margin: '10px'}}
            src={
              <img
                style={{objectFit: 'contain'}}
                src={company?.photo ? company?.photo : '../../CompanyLogos/noImage.jpg'}
                alt='err'
              />
            }
          />
          <PhotoUploader setFileList={setFileList} fileList={fileList}/>
        </div>
      }
    </div>
  )
}

export default SingleCompanyTitle