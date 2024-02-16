/* eslint-disable max-len */
import { Button, Form, Input, Modal }         from 'antd'
import React                                  from 'react'
import { useAppDispatch, useAppSelector }     from '../../../store/hooks'
import { setOpenCollocationAdditionModal }    from '../../../auth/ModalStateReducer/ModalStateReducer'
import { useCookies }                         from 'react-cookie'
import { post }                               from '../../../Plugins/helpers'
import { useSearchParams }                    from 'react-router-dom'

type FormValuesType = {
  premise:  string;
  siteId:   string | null;
}

const CollocationAdditionModal = () => {
  const dispatch = useAppDispatch()
  const [cookies]                     = useCookies(['access_token'])
  const [form]                        = Form.useForm()
  const openCollocationAdditionModal  = useAppSelector((state) => state.modals.openCollocationAdditionModal)
  const [searchParams]                = useSearchParams()
  const siteId                        = searchParams.get('siteId')

  const onFinish = async(values: FormValuesType) => {
    values.siteId = siteId
    const res = await post('site/premise', values, cookies.access_token)
    if(!res.error){
      form.resetFields()
      dispatch(setOpenCollocationAdditionModal(false))
    }
  }

  const onCancel = () => {
    form.resetFields()
    dispatch(setOpenCollocationAdditionModal(false))
  }

  const onkeydown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  return (
    <Modal
      width={1000}
      title='Pataltpos pridėjimas'
      open={openCollocationAdditionModal}
      onOk={() => dispatch(setOpenCollocationAdditionModal(false))}
      onCancel={onCancel}
      footer={false}
    >
      <Form form={form} onFinish={onFinish} onKeyDown={onkeydown}>
        <Form.Item name='name' rules={[{ required: true, message: 'Įveskite patalpą'}]}>
          <Input placeholder='Patalpa'/>
        </Form.Item>
        <Button htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default CollocationAdditionModal