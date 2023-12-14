/* eslint-disable max-len */
import React                                from 'react'
import { Modal }                            from 'antd'
import { post }                             from '../../../Plugins/helpers'
import { useCookies }                       from 'react-cookie'
import { useAppDispatch, useAppSelector }   from '../../../store/hooks'
import { setOpenCollocationRemovalModal }   from '../../../auth/ModalStateReducer/ModalStateReducer'

const CollocationRemovalModal = () => {
  const [cookies]                   = useCookies(['access_token'])
  const openCollocationRemovalModal = useAppSelector((state) => state.modals.openCollocationRemovalModal)
  const dispatch                    = useAppDispatch()
  const item                        = useAppSelector((state) => state.collocationItem.collocationItem)

  const onOK = async() => {
    dispatch(setOpenCollocationRemovalModal(false))
    await post('deleteCollocation', item, cookies.access_token )
  }

  const onCancel = () => {
    dispatch(setOpenCollocationRemovalModal(false))
  }

  return (
    <Modal open={openCollocationRemovalModal} onOk={onOK} onCancel={onCancel} >
      <p>išrinti kolokaciją?</p>
    </Modal>
  )
}

export default CollocationRemovalModal