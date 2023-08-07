import React                from 'react'
import { Modal }            from 'antd'
import { get }              from '../../Plugins/helpers'
import { useParams }        from 'react-router-dom'
import { useCookies }       from 'react-cookie'
import Resizer              from 'react-image-file-resizer'

type PreviewModalProps = {
open:       boolean
onOk:       ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
onCancel:   ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
dutiesId:   number | undefined
}

type PhotoType = {
  checklistId:  number,
  photo:        string,
  photoId:      string,
}

const PreviewModal = ({open, onOk, onCancel, dutiesId}:PreviewModalProps) => {
  const [photo, setPhoto] = React.useState('')
  const { id } =            useParams()
  const [cookies] =         useCookies(['access_token'])

  React.useEffect(() => {
    (async () => {
      const checklistPhotos = await get(`getPhotos/${id}`, cookies.access_token)
      const filter = checklistPhotos.data.filter((el: PhotoType) => Number(el.photoId) === dutiesId)
      const blobPhoto = await fetch(filter[0].photo as string).then((res) => res.blob())
      Resizer.imageFileResizer (
        blobPhoto,
        1000,
        1000,
        'JPEG',
        100,
        0,
        (resizedPhoto) => {
          setPhoto(resizedPhoto as string)
        },
        'base64'
      )
    })()
  }, [])

  return (
    <Modal
      centered
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div style={{width: '100%'}}>
        <img style={{width: '100%'}} src={photo} alt='error'></img>
      </div>
    </Modal>
  )
}

export default PreviewModal