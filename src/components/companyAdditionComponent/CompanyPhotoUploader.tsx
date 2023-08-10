import React, { ChangeEvent } from 'react'
import { post } from '../../Plugins/helpers'
import { useCookies } from 'react-cookie'
import Resizer from 'react-image-file-resizer'
import { Button, Upload, UploadProps, message } from 'antd'

type PhotoUploaderProps = {
    setCompanyPhoto: React.Dispatch<React.SetStateAction<string>>
};

const CompanyPhotoUploader = ({ setCompanyPhoto }: PhotoUploaderProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async(event) => {
        const base64Image = event?.target?.result
        const blobPhoto = await fetch(base64Image as string).then((res) => res.blob())
        Resizer.imageFileResizer (
          blobPhoto,
          300,
          300,
          'JPEG',
          60,
          0,
          async (resizedPhoto) => {
            setCompanyPhoto(`${resizedPhoto}`)
          },
          'base64'
        )
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <input
      type='file'
      id='fileInput'
      name='filename'
      onChange={handleFileChange}
    />
  )
}

export default CompanyPhotoUploader