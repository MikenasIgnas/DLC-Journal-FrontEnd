/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                from 'react'
import { FileAddOutlined }  from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  List,
  message,
}                           from 'antd'
import { useCookies }       from 'react-cookie'
import { post }             from '../../../Plugins/helpers'
import VisitConfigListItem  from './VisitConfigListItem'
import SuccessMessage       from '../../UniversalComponents/SuccessMessage'

type ConfingItemsType = {
    name:   string | undefined;
    _id:    string;
}

type VisitsConfingFormProps = {
    configItems:    ConfingItemsType[]
    setConfigItems: React.Dispatch<React.SetStateAction<ConfingItemsType[]>>
    url:            string
}

const VisitsConfingForm = ({ configItems, url, setConfigItems }: VisitsConfingFormProps ) => {
  const [form]                      = Form.useForm()
  const [cookies]                   = useCookies(['access_token'])
  const [messageApi, contextHolder] = message.useMessage()
  const onFinish = async(values: any) => {
    try{
      const res = await post(url, values, cookies.access_token)
      setConfigItems([...configItems, res])
      form.resetFields(['name'])
      messageApi.success({
        type:    'success',
        content: 'Pridėta',
      })
    }catch(error){
      if (error instanceof Error) {
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }
  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px'}}>
          <Form.Item noStyle name='name'>
            <Input style={{width: '75%'}}/>
          </Form.Item>
          <Button icon={<FileAddOutlined />} htmlType='submit'>Pridėti</Button>
        </div>
      </Form>
      <List
        size='large'
        bordered
        dataSource={configItems}
        renderItem={(item) => <VisitConfigListItem item={item} url={url} setConfigItems={setConfigItems} configItems={configItems}/>}
      />
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default VisitsConfingForm