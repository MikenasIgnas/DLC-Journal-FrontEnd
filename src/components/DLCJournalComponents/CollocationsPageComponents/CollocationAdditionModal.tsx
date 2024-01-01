/* eslint-disable max-len */
import { Button, Form, Input, Modal, Select } from 'antd'
import React                                  from 'react'
import { useAppDispatch, useAppSelector }     from '../../../store/hooks'
import { setOpenCollocationAdditionModal }    from '../../../auth/ModalStateReducer/ModalStateReducer'
import ItemList                               from '../VisitiRegistrationComponents/ItemList'
import { useCookies }                         from 'react-cookie'
import { post }                               from '../../../Plugins/helpers'

type CollocationAdditionModalProps = {
  tabKey: string | null
}

const CollocationAdditionModal = ({tabKey}: CollocationAdditionModalProps) => {
  const dispatch = useAppDispatch()
  const [racks, setRacks]            = React.useState<string[]>([])
  const [cookies]                    = useCookies(['access_token'])
  const [inputValue, setInputValue]  = React.useState('')
  const [form]                       = Form.useForm()
  const openCollocationAdditionModal = useAppSelector((state) => state.modals.openCollocationAdditionModal)

  const onFinish = async(values: any) => {
    values.racks = racks
    const res = await post('addCollocation', values, cookies.access_token)
    if(!res.error){
      form.resetFields()
      setRacks([])
      setInputValue('')
      dispatch(setOpenCollocationAdditionModal(false))
    }
  }

  const onCancel = () => {
    form.resetFields()
    setRacks([])
    setInputValue('')
    dispatch(setOpenCollocationAdditionModal(false))
  }

  return (
    <Modal
      width={1000}
      title='Kolokacijos pridėjimas'
      open={openCollocationAdditionModal}
      onOk={() => dispatch(setOpenCollocationAdditionModal(false))}
      onCancel={onCancel}
      footer={false}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name='addressId' rules={[{ required: true, message: 'Pasirinkite adresą'}]}>
          <Select placeholder='Pasirinkite adresą' style={{width: '100%'}} options={tabKey === '1' ? [{value: '1', label: 'J13'}] : [{value: '2', label: 'T72'}] }/>
        </Form.Item>
        <Form.Item name='premise' rules={[{ required: true, message: 'Įveskite patalpą'}]}>
          <Input placeholder='Patalpa'/>
        </Form.Item>
        <ItemList cardTitle={'Pridėti Racksus'} inputValue={inputValue} inputPlaceHolder={'prideti'} setInputValue={setInputValue } list={racks} setListItems={setRacks}/>
        <Button htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default CollocationAdditionModal