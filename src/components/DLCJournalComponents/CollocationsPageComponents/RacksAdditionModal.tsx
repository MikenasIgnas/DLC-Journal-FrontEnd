/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React                                from 'react'
import { Form, Input, List, Modal }         from 'antd'
import { useAppDispatch, useAppSelector }   from '../../../store/hooks'
import { setOpenRacksAdditionModal }        from '../../../auth/ModalStateReducer/ModalStateReducer'
import { useCookies }                       from 'react-cookie'
import { SearchProps }                      from 'antd/es/input'
import { get, post }                        from '../../../Plugins/helpers'
import { useSearchParams }                  from 'react-router-dom'
import { Racks }                            from '../../../types/globalTypes'

const { Search } = Input

const RacksAdditionModal = () => {
  const [form]                  = Form.useForm()
  const openRacksAdditionModal  = useAppSelector((state) => state.modals.openRacksAdditionModal)
  const dispatch                = useAppDispatch()
  const [cookies]               = useCookies(['access_token'])
  const [searchParams]          = useSearchParams()
  const premiseId               = searchParams.get('premiseId')
  const [racks, setRacks]       = React.useState<Racks[]>([])
  React.useEffect(() => {
    (async () => {
      try {
        if(premiseId){
          const rackRes:Racks[]  = await get(`site/rack?premiseId=${premiseId}&page=1&limit=10`, cookies.access_token)
          const filter = rackRes?.filter((el: Racks) => el.premiseId === premiseId)
          setRacks(filter)
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [openRacksAdditionModal])

  const onOK = () => {
    dispatch(setOpenRacksAdditionModal(false))
  }

  const onCancel = () => {
    form.resetFields()
    dispatch(setOpenRacksAdditionModal(false))
  }

  const onkeydown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }
  const onSearch: SearchProps['onSearch'] = async(value) => {
    if(value !== ''){
      const data = {
        name:      value,
        premiseId: premiseId,
      }
      const res = await post('site/rack', data, cookies.access_token)
      setRacks([...racks, res])
      form.resetFields(['name'])
    }
  }

  return (
    <Modal
      width={1000}
      title={'Spintų pridėjimas'}
      open={openRacksAdditionModal}
      onOk={onOK}
      onCancel={onCancel}
    >
      <Form form={form} onFinish={onSearch} onKeyDown={onkeydown}>
        <Form.Item style={{width: '100%'}} name='name' rules={[{ required: true, message: 'Įveskite patalpą'}]}>
          <Search placeholder='Spinta' onSearch={onSearch} />
        </Form.Item>
      </Form>
      <List dataSource={racks} renderItem={(item) => <List.Item>{item.name}</List.Item>}/>
    </Modal>
  )
}

export default RacksAdditionModal