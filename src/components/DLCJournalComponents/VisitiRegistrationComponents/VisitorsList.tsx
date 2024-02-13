/* eslint-disable max-len */
import { Card, List }                     from 'antd'
import VisitorsListItem                   from './VisitorsListItem'
import { useAppSelector }                 from '../../../store/hooks'
import { selectVisitingCompanyEmplyees }  from '../../../auth/VisitorEmployeeReducer/selectors'



const VisitorsList = () => {
  const visitingEmployees = useAppSelector(selectVisitingCompanyEmplyees)
  return (
    <Card title='Lankytojai' style={{margin: '10px', backgroundColor: '#f9f9f9'}}>
      <List
        dataSource={visitingEmployees}
        renderItem={(item) => <VisitorsListItem item={item}/>}
      />
    </Card>
  )
}

export default VisitorsList