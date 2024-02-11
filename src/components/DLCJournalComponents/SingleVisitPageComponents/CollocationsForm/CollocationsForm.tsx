/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React                                from 'react'
import { useAppDispatch, useAppSelector }   from '../../../../store/hooks'
import { Card, Form }                       from 'antd'
import CardTitle                            from '../CardTitle'
import { put }                              from '../../../../Plugins/helpers'
import { setEditCollocations }              from '../../../../auth/SingleVisitPageEditsReducer/singleVisitPageEditsReducer'
import VisitsPremises                       from './VisitsPremises'
import { useParams }                        from 'react-router'
import { useCookies }                       from 'react-cookie'
import { CompaniesType, Premises, Racks, VisitsType }        from '../../../../types/globalTypes'
import { CheckboxValueType }                from 'antd/es/checkbox/Group'
import EditableVisitPremises                from './EditableVisitPremises'

type CollocationsFormPrps = {
  siteId:         string | null | undefined
  visitData:      VisitsType | undefined
  companies:      CompaniesType[]
  companyPremise: Premises[]
  companyRacks:   Racks[] | undefined
}

const CollocationsForm = ({ siteId, visitData, companies, companyPremise, companyRacks }: CollocationsFormPrps) => {
  const [form]                        = Form.useForm()
  const dispatch                      = useAppDispatch()
  const { id }                        = useParams()
  const [cookies]                     = useCookies(['access_token'])
  const editCollocations              = useAppSelector((state) => state.visitPageEdits.editCollocations)
  const [checkedList, setCheckedList] = React.useState<CheckboxValueType[] | undefined>([])
  const edit                          = useAppSelector((state) => state.visitPageEdits.editCollocations)

  const saveChanges = async() => {
    dispatch(setEditCollocations(!editCollocations))
    if(editCollocations){
      await put('visit/visit', {id: id, racks: checkedList}, cookies.access_token)
    }
  }

  return (
    <Form form={form} onFinish={saveChanges}>
      <Card title={<CardTitle/>} className='SelectedCollocationListContainer' >
        {!edit ?
          <VisitsPremises siteId={siteId} companyRacks={visitData?.racks} setCheckedList={setCheckedList} checkedList={checkedList} companies={companies}/>
          : <EditableVisitPremises
            checkedList={checkedList}
            visitDataRacks={visitData?.racks}
            setCheckedList={setCheckedList}
            companyRacks={companyRacks}
            siteId={siteId}
            companyPremise={companyPremise}
            companies={companies}
          />
        }
      </Card>
    </Form>
  )
}

export default CollocationsForm