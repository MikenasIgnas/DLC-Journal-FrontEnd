/* eslint-disable max-len */
import React                                                                    from 'react'
import { View }                                                                 from '@react-pdf/renderer'
import ChildTableRows                                                           from './ChildTableRows'
import { AreaType, HistoryDataType, PossibleProblemsType, RouteType, TodoType } from '../../../types/globalTypes'
import ChildTableHeader                                                         from './ChildTableHeader'

type ChildTableProps = {
  tableData: HistoryDataType[] | undefined
  children?: React.ReactNode
  tableStyle: TableStyleType
  table: HistoryDataType
  fetchedPremisesData: {
    routes: null | RouteType[];
    areas: null | AreaType[];
    problems: null | PossibleProblemsType[];
    todo: null | TodoType[];
  }
}

type TableStyleType = {
  tableContainer: {
      flexDirection: 'row';
      flexWrap: 'wrap';
      marginTop: number;
      borderWidth: number;
      borderColor: string;
  };
}


const ChildTable = ({ tableStyle, table, fetchedPremisesData }: ChildTableProps) => {
  const areas = fetchedPremisesData.areas
  const problems = fetchedPremisesData.problems
  const todo = fetchedPremisesData.todo
  const filteredData = table.filledData.map(item => ({
    ...item,
    values: Object.entries(item.values)
      .map(([key, objects]) => ({
        [key]: objects.filter(obj => !Object.values(obj).includes(false)),
      }))
      .reduce((acc, val) => {
        if (Object.values(val)[0].length > 0) {
          Object.assign(acc, val)
        }
        return acc
      }, {}),
  }))

  return(
    <View style={tableStyle.tableContainer}>
      {
        filteredData.map((el, i) => {
          const valueKey = Object.keys(el.values)
          const premiseNameItem = areas?.find((area) => area.id === el.pageID)
          const todoInArea = todo?.filter((todo) => todo.areasId === el?.pageID).filter((elem) => elem.id === Number(...valueKey))
          const inputValues = el.values[Number(...valueKey)][0]
          const todoId = Number(Object.keys(inputValues)[0])
          const fillter = problems?.filter((el) => el.todoId === Number(...valueKey)).find((ele) => ele.id === todoId)
          const {time, ticketNr} = inputValues
          return(
            <>
              <ChildTableHeader/>
              <ChildTableRows
                pageID={el.pageID}
                todoInArea={todoInArea}
                premiseName={premiseNameItem?.roomName}
                possibleProblem={fillter?.possibleProblem}
                ticketNr={String(ticketNr)}
                time={String(time)}
              />
              {/* <InvoiceTableFooter items={invoiceData.items} /> */}
            </>
          )})
      }
    </View>
  )
}

export default ChildTable