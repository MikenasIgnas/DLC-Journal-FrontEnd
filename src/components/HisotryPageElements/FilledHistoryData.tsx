/* eslint-disable max-len */
import React                                    from 'react'
import {Card, Collapse, ConfigProvider, Form}   from 'antd'
import { useAppSelector }                       from '../../store/hooks'
import ChecklistHisotoryInputs                  from './ChecklistHistoryInputs'
import CollapsePannelHeader                     from '../CollapsePannelHeader/CollapsePannelHeader'
import ChecklistHistoryItemHeader               from './ChecklistHistoryItemHeader'

type ProblemsComponentProps = {
  routeID:        number | undefined,
  areasID:        number | undefined,
  areaName:       string | undefined,
  itemId:         string | undefined,
};

interface HistoryInputValues {
  [x: number]:    boolean,
  ticketNr?:      number,
  notes?:         number,
  time?:          number,
}

interface RadioValues {
  [key: string]:  boolean,
}

const FilledHistoryData = ({
  routeID, areasID, areaName, itemId,
}:ProblemsComponentProps) => {
  const { Panel } =                     Collapse
  const defaultPageTheme =              useAppSelector((state) => state.theme.value)
  const filledData =                    useAppSelector((state)=> state.fetchedData.FilledData)
  const possibleProblemsTable =         useAppSelector((state) => state.fetchedData.possibleProblems)
  const todo =                          useAppSelector((state) => state.fetchedData.ToDo)?.filter((el) => el.areasId === areasID)
  const filteredByRoute =               filledData?.filter((el) => el.routeNumber === routeID).map((el) => el.values)
  const [edit, setEdit] =               React.useState(false)
  const [activeKey, setActiveKey] =   React.useState<string[]>()

  return (
    <div style={{marginBottom: '10px'}} >
      <Card
        key={String(areasID)}
        title={<ChecklistHistoryItemHeader setActiveKey={setActiveKey} todo={todo} setEdit={setEdit} itemId={itemId} areaName={areaName && areaName}/>}
        className='ChecklistBodyCard'
        style={{backgroundColor: defaultPageTheme? '#191919': 'white'}}
      >
        {filledData && todo?.map((el, i) => {
          const checklistTextValues =   possibleProblemsTable?.filter((item) => item.todoId === el.id)
          const filteredValues =        filteredByRoute?.find((item) => Object.keys(item).includes(String(el.id)))
          const radioValues =           filteredValues ? filteredValues[el.id] : undefined
          const problemCount =          radioValues?.filter((obj: RadioValues ) => Object.values(obj)[0] === true).length
          const dutiesId =              radioValues?.map(({ ticketNr, notes, time, ...rest }: HistoryInputValues) => {
            return Number(Object.keys(rest))
          })
          return (
            <ConfigProvider key={el.id} theme = {{
              token: {
                colorText:        defaultPageTheme ? 'white' : 'black',
                colorBgContainer: defaultPageTheme ? '#191919' : 'white',
              },
            }}>
              <Collapse
                style={{backgroundColor: '#fafafa', margin: '5px'}}
                className='ChecklistBodyCard'
                key={el?.id}
                activeKey={edit ? activeKey : undefined}
              >
                <Panel
                  style={{backgroundColor: defaultPageTheme ? '#1e1e1e' : 'white', borderRadius: '8px'}}
                  header={<CollapsePannelHeader duty={el.duty} problemCount={problemCount}/>}
                  key={`${i + 1}`}
                >
                  <Form.List
                    name={el?.id}
                    key={el?.id}
                    initialValue={radioValues}
                  >
                    {(fields) => (
                      <div key={el?.id} style={{backgroundColor: defaultPageTheme ? '#191919' : 'white'}}>
                        {fields.map(({ name, ...rest }, index) => {
                          return(
                            <ChecklistHisotoryInputs
                              key={index}
                              name={name}
                              possibleProblems={checklistTextValues && checklistTextValues[index]?.possibleProblem}
                              reaction={checklistTextValues && checklistTextValues[index]?.reaction}
                              dutiesId={dutiesId && dutiesId[index]}
                              radioValues={radioValues && radioValues[index]}
                              rest={rest}
                              edit={edit}
                            />
                          )
                        })}
                      </div>
                    )}
                  </Form.List>
                </Panel>
              </Collapse>
            </ConfigProvider>
          )
        })}
      </Card>
    </div>
  )
}

export default FilledHistoryData
