/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector }   from '../../../../store/hooks'
import SelectedCollocationList              from '../SelectedCollocationList'
import CollocationsList                     from '../CollocationsList'
import useSetSingleVisitData                from '../../../../Plugins/useSetSingleVisitData'
import { Card, Form }                       from 'antd'
import CardTitle                            from '../CardTitle'
import { post }                             from '../../../../Plugins/helpers'
import { setEditCollocations }              from '../../../../auth/SingleVisitPageEditsReducer/SingleVisitPageEditsReducer'


const CollocationsForm = () => {
  const [form]              = Form.useForm()
  const dispatch            = useAppDispatch()
  const editCollocations    = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const {
    updatedTransformedArray,
    companiesColocations,
    fetchData,
    id,
    cookies,
  }                         = useSetSingleVisitData()

  const filteredArray = updatedTransformedArray?.filter(obj => {
    return Object.values(obj).some(value => Array.isArray(value) && value.length > 0)
  })

  const saveChanges = async(values: any) => {
    dispatch(setEditCollocations(!editCollocations))
    if(editCollocations){
      await post(`updateVisitInformation?visitId=${id}`, values, cookies.access_token)
      await fetchData()
    }
  }

  return (
    <Form form={form} onFinish={saveChanges}>
      <Card title={<CardTitle/>} className='SelectedCollocationListContainer' >
        {!editCollocations ?
          <SelectedCollocationList
            selectedCollocations={filteredArray}
            edit={editCollocations}
          /> :
          <CollocationsList companiesColocations={companiesColocations}
          />
        }
      </Card>
    </Form>
  )
}

export default CollocationsForm