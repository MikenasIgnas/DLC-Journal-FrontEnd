/* eslint-disable max-len */
import React     from 'react'
import { Modal } from 'antd'

type PhotoViewProps = {
    showImage:    boolean,
    setShowImage: (value: React.SetStateAction<boolean>) => void,
    photo:        string,
}

const PhotoView = ({showImage, setShowImage, photo}: PhotoViewProps) => {
  return (
    <Modal
      centered
      open={showImage}
      onOk={() => setShowImage(false)}
      onCancel={() => setShowImage(false)}
    >
      <div>
        <img style={{width: '100%'}} src={photo} alt='error'></img>
      </div>
    </Modal>
  )
}

export default PhotoView