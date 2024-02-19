/* eslint-disable max-len */
import VisitRacks                           from './VisitRacks'
import EditableVisitRacks                   from './EditableVisitRacks'
import SuccessMessage                       from '../../../UniversalComponents/SuccessMessage'
import CardTitle                            from '../CardTitle'

import {
  useAppDispatch,
  useAppSelector,
}                                           from '../../../../store/hooks'

import {
  Card,
  Form,
  message,
}                                           from 'antd'

import { selectVisitingCompanyEmplyees }    from '../../../../auth/VisitorEmployeeReducer/selectors'
import { selectPremises }                   from '../../../../auth/SitesReducer/selectors'
import { useForm }                          from 'antd/es/form/Form'
import { put }                              from '../../../../Plugins/helpers'
import { setEditCollocations }              from '../../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'
import { useSearchParams }                  from 'react-router-dom'
import { useCookies }                       from 'react-cookie'

const CollocationsForm = () => {
  const companyPremise              = useAppSelector(selectPremises)
  const [form]                      = useForm()
  const visitingEmployees           = useAppSelector(selectVisitingCompanyEmplyees)
  const editCollocations            = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const dispatch                    = useAppDispatch()
  const [searchParams]              = useSearchParams()
  const visitId                     = searchParams.get('id')
  const [cookies]                   = useCookies()
  const checkedList                 = useAppSelector((state) => state.racks.checkedList)
  const [messageApi, contextHolder] = message.useMessage()

  const saveChanges = async() => {
    dispatch(setEditCollocations(!editCollocations))
    if(editCollocations){
      try{
        await put('visit/visit', {id: visitId, racks: checkedList}, cookies.access_token)
        messageApi.success({
          type:    'success',
          content: 'Išsaugota',
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
  }

  return (
    <Form form={form} onFinish={saveChanges}>
      {visitingEmployees.length > 0 && (
        <Card title={<CardTitle />} className='CollocationsListCard'>
          {companyPremise?.map((el) => (
            !editCollocations ? <VisitRacks premise={el} key={el._id} /> : <EditableVisitRacks key={el._id} premise={el} />
          ))}
        </Card>
      )}
      <SuccessMessage contextHolder={contextHolder}/>
    </Form>
  )
}

export default CollocationsForm