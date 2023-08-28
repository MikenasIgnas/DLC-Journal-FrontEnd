/* eslint-disable max-len */
import React                                      from 'react'
import {Input, Form, Typography, ConfigProvider}  from 'antd'
import { useAppDispatch, useAppSelector }         from '../../../store/hooks'
import { DeleteOutlined, EyeOutlined }            from '@ant-design/icons'
import { get }                                    from '../../../Plugins/helpers'
import { useCookies }                             from 'react-cookie'
import { setChecklistPhotos }                     from '../../../auth/FetchedDataReducer/fetchedDataReducer'
import PhotoUploader                              from '../../UniversalComponents/PhotoUploader/PhotoUploader'
import PreviewModal                               from './PreviewModal'

const { TextArea } = Input

type AreaProblemsInputsProps = {
  reaction:     string | undefined,
  name:         number,
  edit:         boolean,
  dutiesId:     number | undefined,
};

const HistoryProblemInputs = ({ reaction,name, edit, dutiesId }:AreaProblemsInputsProps) => {
  const dispatch =                                useAppDispatch()
  const defaultTheme =                            useAppSelector((state) => state.theme.value)
  const checklistPhotos =                         useAppSelector((state)=> state.fetchedData.checklistPhotos)
  const hasPhotoId =                              checklistPhotos?.find((photo) => photo.photoId === String(dutiesId))
  const [previewPhoto, setPreviewPhoto] =         React.useState(false)
  const [isPhotoUploaded, setIsPhotoUploaded] =   React.useState(false)
  const [cookies] =                               useCookies(['access_token'])
  const isMobile =                                window.innerWidth < 650

  const deletePhoto = () => {
    const hasPhotoId = checklistPhotos?.filter((photo) => photo.photoId !== String(dutiesId))
    if(hasPhotoId){
      dispatch(setChecklistPhotos(hasPhotoId))
      get(`deletePhoto/${dutiesId}`, cookies.access_token)
      setIsPhotoUploaded(false)
    }
  }

  return (
    <div className='AreaProblemsInputsContainer'>
      <div className='AreaProblemsInputsContainer'>
        <ConfigProvider theme ={{
          token: {
            colorBgContainer:     defaultTheme? '#1d1d1d' : 'white',
            colorText:            defaultTheme ? 'white' : 'black',
            colorTextPlaceholder: '#7d7d7d',
          },
        }}>
          <Form.Item className='FormItem' name={[name,'ticketNr']}>
            <Input disabled = {!edit} type='number' placeholder='Odoo bilieto Nr.' />
          </Form.Item>
          <Typography style={{color: defaultTheme ? 'white' : 'black'}}>Laikas:</Typography>
          <Form.Item className='FormItem' name={[name, 'time']} >
            <Input disabled = {!edit} placeholder='Laikas' />
          </Form.Item>
          <Typography style={{color: defaultTheme ? 'white' : 'black'}} className='Typography'>{reaction}</Typography>
          <Form.Item className='FormItem' name={[name,'notes']}>
            <TextArea disabled = {!edit} placeholder='Pastabos' />
          </Form.Item>
        </ConfigProvider>
      </div>
      <div style={{display: 'flex',width: isMobile ? '100%' : '20%', justifyContent: 'center', alignItems: 'center'}}>
        { hasPhotoId || isPhotoUploaded ? <EyeOutlined style={{marginLeft: '15px', color: defaultTheme ? 'white' : 'black'}} onClick={()=> setPreviewPhoto(true)}/> : ''}
        { previewPhoto &&
        <PreviewModal
          open={previewPhoto}
          onOk={() => setPreviewPhoto(false)}
          onCancel={() => setPreviewPhoto(false)}
          dutiesId={dutiesId}
        />
        }
        {edit && hasPhotoId || edit && isPhotoUploaded ? <DeleteOutlined style={{marginLeft: '15px', color: defaultTheme ? 'white' : 'black'}} onClick={deletePhoto}/>: ''}
        {/* {edit && <PhotoUploader setIsPhotoUploaded={setIsPhotoUploaded} dutiesId={dutiesId}/>} */}
      </div>
    </div>
  )
}

export default HistoryProblemInputs