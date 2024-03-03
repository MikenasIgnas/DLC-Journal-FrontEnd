/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React              from 'react'
import {
  Avatar,
  Form,
  Input,
  UploadFile,
}                         from 'antd'
import PhotoUploader      from '../../UniversalComponents/PhotoUploader/PhotoUploader'
import useSetWindowsSize  from '../../../Plugins/useSetWindowsSize'
import { useAppSelector } from '../../../store/hooks'

type SingleCompaniesTitleProps = {
    setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
    fileList:    UploadFile<any>[]
}

const SingleCompanyTitle = ({setFileList, fileList}: SingleCompaniesTitleProps) => {
  const windowSize      = useSetWindowsSize()
  const company         = useAppSelector((state) => state.singleCompany.singleCompany)
  const editCompanyPage = useAppSelector((state) => state.singleCompanyEdits.editCompanyPage)
  return (
    <div>
      {!editCompanyPage ?
        <div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>{company?.code}</div>
            <Avatar
              shape='square'
              size={70}
              style={{margin: '10px'}}
              src={
                <img style={{objectFit: 'contain'}}
                  src={company?.photo ? company?.photo : '../../CompanyLogos/noImage.jpg'}
                  alt='err'
                />
              }
            />
            <div style={{fontSize: windowSize > 600 ? '20px' : '12px', marginLeft: '20px'}}>{company?.name?.toUpperCase()}</div>
          </div>
          <div style={{fontSize: windowSize > 600 ? '15px' : '8px'}}>{company?.description}</div>
          <div style={{fontSize: windowSize > 600 ? '15px' : '8px'}}>Įmonės kodas: {company?.companyCode}</div>
        </div>
        :
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
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
          <Form.Item label='Pavadinimas' name='name' initialValue={company?.name}><Input/></Form.Item>
          <Form.Item label='Aprašymas' name='description' initialValue={company?.description}><Input/></Form.Item>
          <Form.Item label='Įmonės kodas' name='companyCode' initialValue={company?.companyCode}><Input/></Form.Item>
          <PhotoUploader setFileList={setFileList} fileList={fileList}/>
        </div>
      }
    </div>
  )
}

export default SingleCompanyTitle