/* eslint-disable max-len */
import { Card, Form }       from 'antd'
import VisitPurposeButtons  from './VisitPurposeButtons'
import { VisitsType, Permissions }       from '../../../types/globalTypes'
import filterPermisions     from './filterPermisions'

type VisitPurposeListProps = {
  permissions: Permissions[]

}

const VisitPurposeList = ({ permissions }: VisitPurposeListProps) => {

  const form                = Form.useFormInstance<VisitsType>()
  const values              = Form.useWatch('visitors', form)
  const filteredPermisions  = filterPermisions(values)
  const matchingItems = permissions.filter(item => filteredPermisions.includes(item._id))

  return (
    <Card style={{margin: '10px', backgroundColor: '#f9f9f9'}} title={'Vizito Tikslas'}>
      <div className='VisitPurposeButtonContainer'>
        {matchingItems?.map((item, i) => <VisitPurposeButtons item={item} key={i} buttonWidth={(100 / filteredPermisions.length) - 5}/>)}
      </div>
    </Card>
  )
}

export default VisitPurposeList