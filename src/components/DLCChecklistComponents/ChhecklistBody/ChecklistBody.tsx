/* eslint-disable max-len */
import { Form, Card }       from 'antd'
import { useSearchParams }  from 'react-router-dom'
import { useAppSelector }   from '../../../store/hooks'
import ChecklistInputs      from './ChecklistInputComponents/ChecklistRoutesPageInputs'

const ChecklistBody = () => {
  const [searchParams]          = useSearchParams()
  const currentPageUrlParam     = Number(searchParams.get('page'))
  const data                    = localStorage.getItem(`data${currentPageUrlParam}`)
  const duties                  = useAppSelector((state) => state?.fetchedData?.toDo?.filter((todo) => currentPageUrlParam === todo.areasId))
  const possibleProblemsTable   = useAppSelector((state) => state.fetchedData.possibleProblems)
  const latestHistoryItemData   = useAppSelector((state) => state.fetchedData.latestHistoryItemData?.filter((item)=>currentPageUrlParam === item.pageID ))
  const latestHistoryItemValues = latestHistoryItemData?.map((el)=> el.values)

  return (
    <div>
      {duties?.map((el) => {
        const dutiesInitialVals   = possibleProblemsTable?.filter((item) => item.todoId === el.id)
        const filteredValues      = latestHistoryItemValues?.find((item) => Object.keys(item).includes(String(el.id)))
        const radioValues         = filteredValues ? filteredValues[el.id] : undefined
        const alreadyFilledValues = data && JSON.parse(data).values[el?.id]
        return (
          <Card
            style={{ marginTop: 16 }}
            type='inner'
            title={<div>{el?.duty}</div>}
            key={el?.id}
          >
            <Form.List
              name={el?.id}
              key={el?.id}
              initialValue={ data ? JSON.parse(data).values[el?.id] : dutiesInitialVals?.map((values) => ({ [values?.id]: false }))
              }>
              {(fields) => (
                <div className='CardContent' key={el?.id}>
                  {fields.map(({ name, ...rest }, index) => (
                    <ChecklistInputs
                      key={index}
                      name={name}
                      possibleProblems={dutiesInitialVals && dutiesInitialVals[index]?.possibleProblem}
                      reaction={dutiesInitialVals && dutiesInitialVals[index]?.reaction}
                      dutiesId={dutiesInitialVals && dutiesInitialVals[index]?.id}
                      radioValues={radioValues && radioValues[index]}
                      alreadyFilledValues={alreadyFilledValues && alreadyFilledValues[index]}
                      rest={rest}
                    />
                  ))}
                </div>
              )}
            </Form.List>
          </Card>
        )
      })}
    </div>
  )
}
export default ChecklistBody