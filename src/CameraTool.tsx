/* eslint-disable max-len */
import React                                            from 'react'
import { CameraType }                                   from './Camera'
import { CameraOutlined, EyeOutlined, DeleteOutlined }  from '@ant-design/icons'
import OpenedCamera                                     from './components/UniversalComponents/CameraComponents/OpenedCamera'
import PhotoView                                        from './components/UniversalComponents/CameraComponents/PhotoView'
import { useAppSelector }                               from './store/hooks'
import { ChecklistPhotosType }                          from './types/globalTypes'
import { get }                                          from './Plugins/helpers'
import { useCookies }                                   from 'react-cookie'

type CameraToolProps = {
  dutiesId: number | undefined;
};
type SpecificPhotoType = {
  photo:    string,
  photoId:  string
}
const CameraTool = ({ dutiesId }: CameraToolProps) => {
  const [numberOfCameras, setNumberOfCameras] = React.useState(0)
  const [photo, setPhoto]                     = React.useState<string | null>(null)
  const [photoId, setPhotoId]                 = React.useState<string | null>(null)
  const [showImage, setShowImage]             = React.useState<boolean>(false)
  const [showCamera, setShowCamera]           = React.useState(false)
  const camera                                = React.useRef<CameraType>(null)
  const [isPhotoDeleted, setIsPhotoDeleted]   = React.useState(false)
  const [hasPhoto, setHasPhoto]               = React.useState(false)
  const [hasOldPhoto, setHasOldPhoto]         = React.useState<ChecklistPhotosType>()
  const latesPhotos                           = useAppSelector((state) => state.fetchedData.latestPhotos)
  const [cookies]                             = useCookies(['access_token'])

  React.useEffect(() => {
    const localStoragePhotos = localStorage.getItem('photos')
    if (localStoragePhotos) {
      const parsedPhotos: SpecificPhotoType[] = JSON.parse(localStoragePhotos)
      const specificPhoto = parsedPhotos.find((obj) => obj.photoId === String(dutiesId))
      if (specificPhoto) {
        setPhoto(specificPhoto.photo)
        setPhotoId(specificPhoto.photoId)
        setHasPhoto(true)
      }

    }
  }, [dutiesId, isPhotoDeleted, hasPhoto])

  React.useEffect(()=> {
    if(latesPhotos){
      const photos = [...latesPhotos]
      const oldChecklistPhoto = photos?.find((obj) => obj.photoId === String(dutiesId))
      if(oldChecklistPhoto){
        setHasOldPhoto(oldChecklistPhoto)
        setPhoto(oldChecklistPhoto.photo)
        setPhotoId(oldChecklistPhoto.photoId)
      }
    }
  },[])

  const handleTakePhoto = (takenPhoto: string) => {
    setPhoto(takenPhoto)
    const localStoragePhotos = localStorage.getItem('photos')
    if (localStoragePhotos) {
      const parsedPhotos: SpecificPhotoType[] = JSON.parse(localStoragePhotos)
      const updatedPhotos = parsedPhotos.filter((photo) => photo.photoId !== String(dutiesId))
      updatedPhotos.push({ photo: takenPhoto, photoId: String(dutiesId) })
      localStorage.setItem('photos', JSON.stringify(updatedPhotos))
    } else {
      localStorage.setItem('photos', JSON.stringify([{ photo: takenPhoto, photoId: String(dutiesId) }]))
    }
    setHasPhoto(true)
    setIsPhotoDeleted(false)
  }

  const deletePhoto = () => {
    const localStoragePhotos = localStorage.getItem('photos')
    let photosArray: SpecificPhotoType[] = []
    if (localStoragePhotos) {
      photosArray = JSON.parse(localStoragePhotos)
      const updatedPhotosArray = photosArray.filter((photo) => photo.photoId !== String(dutiesId))
      if (updatedPhotosArray.length === 0) {
        localStorage.removeItem('photos')
      } else {
        localStorage.setItem('photos', JSON.stringify(updatedPhotosArray))
      }

      setIsPhotoDeleted(true)
    }
    if(latesPhotos){
      const oldPhotos = latesPhotos?.filter((photo) => photo.photoId !== String(dutiesId))
      if(oldPhotos){
        get(`deletePhoto/${photoId}`, cookies.access_token)
        setIsPhotoDeleted(true)
      }
    }
  }

  return (
    <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
      <CameraOutlined rev='' style={{fontSize: '20px'}} onClick={() => setShowCamera(true)} />
      {showCamera ? (
        <OpenedCamera
          showCamera={showCamera}
          setShowCamera={setShowCamera}
          camera={camera}
          setNumberOfCameras={setNumberOfCameras}
          numberOfCameras={numberOfCameras}
          onTakePhoto={handleTakePhoto}
        />
      ) : (
        ''
      )}
      {(photo && hasPhoto && !isPhotoDeleted ) || hasOldPhoto && !isPhotoDeleted ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <EyeOutlined rev='' style={{ marginLeft: '15px', fontSize: '20px' }} onClick={() => setShowImage(true)} />
          <DeleteOutlined rev='' style={{marginLeft: '15px', fontSize: '20px'}} onClick={deletePhoto}/>
        </div>
      ) : (
        ''
      )}
      {photo && showImage ? (
        <PhotoView showImage={showImage} setShowImage={setShowImage} photo={photo} />
      ) : (
        ''
      )}
    </div>
  )
}

export default CameraTool