/* eslint-disable max-len */
import React            from 'react'

import SignatureCanvas  from 'react-signature-canvas'

import {
  CheckCircleOutlined,
  DeleteOutlined,
}                       from '@ant-design/icons'

import {
  Button,
  Form,
  List,
  Modal,
  Select,
  Tag,
  message,
}                       from 'antd'


import {
  useAppDispatch,
  useAppSelector,
}                       from '../../../store/hooks'

import { useCookies }   from 'react-cookie'
import { removeGuest }  from '../../../auth/VisitorEmployeeReducer/VisitorEmployeeReducer'
import { deleteItem }   from '../../../Plugins/helpers'
import { Guest }        from '../../../types/globalTypes'

type GuestsListItemProps = {
    item:   Guest
    index:  number
}

const GuestsListItem = ({ item, index }: GuestsListItemProps) => {
  const [open, setOpen]                 = React.useState(false)
  const [signatureUrl, setSignatureURl] = React.useState('')
  const signatureCanvasRef              = React.useRef<SignatureCanvas>(null)
  const visitorIdTypes                  = useAppSelector((state) => state.visit.visitorIdTypes).map((el) => ({value: el._id, label: el.name}))
  const dispatch                        = useAppDispatch()
  const [cookies]                       = useCookies(['access_token'])
  const editClientsGuests               = useAppSelector((state) => state.visitPageEdits.editClientsGuests)
  const [messageApi]                    = message.useMessage()
  const form                            = Form.useFormInstance<Guest>()

  const removeListItem = async(id: string | undefined) => {
    try{
      dispatch(removeGuest(id))
      await deleteItem('visit/guests', { id: id } ,cookies.access_token)
      messageApi.success({
        type:    'success',
        content: 'Ištrinta',
      })
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  const onOk = async(id: string | undefined) => {
    if(signatureCanvasRef.current){
      form.setFieldValue(['guests', id, 'signatures'], signatureCanvasRef.current.toDataURL())
      setSignatureURl(signatureCanvasRef.current.toDataURL())
      setOpen(false)
    }
  }

  const onCancel = () => {
    if(signatureCanvasRef.current){
      signatureCanvasRef.current.clear()
    }
    setOpen(false)
  }

  const removeSignature = () => {
    if(signatureCanvasRef.current){
      signatureCanvasRef.current.clear()
      setSignatureURl('')
    }
  }

  return (
    <List.Item
      key={index}
      actions={[
        <div
          key={item._id}
          style={{width: !signatureCanvasRef.current ? '500px' : '450px'}}
          className='SelectedVisitorsButtonContainer'
        >
          <div>
          </div>
          {
            signatureUrl === '' && !item.signed ?
              <Button disabled={!editClientsGuests} onClick={() => setOpen(true)}>Pasirašyti</Button>
              :
              <>
                <Tag icon={<CheckCircleOutlined />} color='success'>
                  Pasirašyta
                </Tag>
                {
                  signatureUrl !== '' && !item.signed &&
                  <DeleteOutlined type='primary' onClick={() => removeSignature()}/>
                }
              </>
          }
          <Form.Item
            name={['guests', item._id, 'idType']}
            className='RegisteredVisitorsSelect'
            initialValue={item.idType}
          >
            <Select disabled={!editClientsGuests} options={visitorIdTypes} />
          </Form.Item>
          <Button key={index} onClick={() => removeListItem(item._id)} type='link'>
        Ištrinti
          </Button>
        </div>,
      ]}

    >
      <List.Item.Meta
        title={item.name || 'Unknown Name'}
        description={item.company || 'Unknown Company'}
      />
      <Modal
        open={open}
        onCancel={onCancel}
        onOk={() => onOk(item?._id)}
      >
        <Form.Item name={['guests', item._id, 'signatures']}>
          <SignatureCanvas canvasProps={{width: 500, height: 200 }} ref={signatureCanvasRef} />
        </Form.Item>
      </Modal>
    </List.Item>
  )
}

export default GuestsListItem