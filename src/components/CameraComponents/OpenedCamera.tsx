/* eslint-disable max-len */
import { Modal }                from 'antd'
import React                    from 'react'
import { CameraType, Camera }   from '../../Camera'
import styled                   from 'styled-components'
import Resizer                  from 'react-image-file-resizer'
type OpenedCameraProps = {
    showCamera:             boolean,
    setShowCamera:          React.Dispatch<React.SetStateAction<boolean>>,
    camera:                 React.RefObject<CameraType>,
    setNumberOfCameras:     React.Dispatch<React.SetStateAction<number>>,
    numberOfCameras:        number,
    onTakePhoto:            (photo: string) => void,
}

const Button = styled.button`
  outline: none;
  color: white;
  opacity: 1;
  background: transparent;
  background-color: transparent;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-image: none;
  padding: 0;
  text-shadow: 0px 0px 4px black;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  filter: invert(100%);
  border: none;

  &:hover {
    opacity: 0.7;
  }
`
const TakePhotoButton = styled(Button)`
  background: url('https://img.icons8.com/ios/50/000000/compact-camera.png');
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border: solid 4px black;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const ChangeFacingCameraButton = styled(Button)`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;
  &:disabled {
    opacity: 0;
    cursor: default;
    padding: 60px;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
    &:disabled {
      padding: 40px 25px;
    }
  }
`

const OpenedCamera = ({
  showCamera,
  setShowCamera ,
  camera,
  setNumberOfCameras,
  numberOfCameras,
  onTakePhoto,
}:OpenedCameraProps) => {

  const takePhoto = async () => {
    if (camera.current) {
      const photo = camera.current.takePhoto()
      const blobPhoto = await fetch(photo).then((res) => res.blob())
      try {
        Resizer.imageFileResizer(
          blobPhoto,
          300,
          300,
          'JPEG',
          60,
          0,
          (resizedPhoto) => {
            const img = new Image()
            img.src = resizedPhoto as string
            img.onload = () => {
              const canvas = document.createElement('canvas')
              const context = canvas.getContext('2d')
              if(context){
                canvas.width = img.width
                canvas.height = img.height
                context.translate(canvas.width, 0)
                context.scale(-1, 1)
                context.drawImage(img, 0, 0)
                const flippedPhoto = canvas.toDataURL('image/jpeg')
                onTakePhoto(flippedPhoto)
                setShowCamera(false)
              }
            }
          },
          'base64'
        )
      } catch (error) {
        console.error('Error compressing image:', error)
      }
    }
  }

  return (
    <div>
      <Modal
        okButtonProps={{style: {display: 'none'}}}
        cancelButtonProps={{style: {display: 'none'}}}
        centered
        open={showCamera}
        onOk={() => setShowCamera(false)}
        onCancel={() => setShowCamera(false)}
      >
        <div style={{height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
          <Camera
            aspectRatio='cover'
            style={{width: '100px', height: '100%', padding: '50px'}}
            ref={camera}
            numberOfCamerasCallback={(i:number) => setNumberOfCameras(i)}
          />
          <TakePhotoButton
            onClick={takePhoto}
          />
          {
            numberOfCameras > 1?
              <ChangeFacingCameraButton
                onClick={() => {
                  if (camera.current) {
                    camera.current.switchCamera()
                  }
                }}
              />
              :''
          }
        </div>
      </Modal>
    </div>
  )
}

export default OpenedCamera