/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector }   from '../../../../store/hooks'
import { Card, Form }                       from 'antd'
import CardTitle                            from '../CardTitle'
import { put }                              from '../../../../Plugins/helpers'
import { setEditCollocations }              from '../../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'
import VisitsPremises                       from './VisitsPremises'
import { useParams }                        from 'react-router'
import { useCookies }                       from 'react-cookie'
import EditableVisitPremises                from './EditableVisitPremises'


const CollocationsForm = () => {
  const [form]           = Form.useForm()
  const dispatch         = useAppDispatch()
  const { id }           = useParams()
  const [cookies]        = useCookies(['access_token'])
  const editCollocations = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const checkedList      = useAppSelector((state) => state.racks.checkedList)

  const saveChanges = async() => {
    dispatch(setEditCollocations(!editCollocations))
    if(editCollocations){
      await put('visit/visit', {id: id, racks: checkedList}, cookies.access_token)
    }
  }

  return (
    <Form form={form} onFinish={saveChanges}>
      <Card title={<CardTitle/>} className='SelectedCollocationListContainer' >
        {!editCollocations ? <VisitsPremises /> : <EditableVisitPremises/>}
      </Card>
    </Form>
  )
}

export default CollocationsForm