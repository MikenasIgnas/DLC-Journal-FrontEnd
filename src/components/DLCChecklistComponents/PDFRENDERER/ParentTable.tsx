/* eslint-disable max-len */
import React                from 'react'
import {View }              from '@react-pdf/renderer'
import { HistoryDataType }  from '../../../types/globalTypes'
import ParentTableHeader    from './ParentTableHeader'

type ParentTableProps = {
  children:   React.ReactNode
  tableStyle: TableStyleType
  table:      HistoryDataType
}

type TableStyleType = {
  tableContainer: {
      flexDirection:  'row';
      flexWrap:       'wrap';
      marginTop:      number;
      borderWidth:    number;
      borderColor:    string;
  };
}

const ParentTable = ({children, tableStyle, table}: ParentTableProps) => (
  <View key={table.id} style={tableStyle.tableContainer}>
    <ParentTableHeader id={`ChecklistID: ${table.id}`} employee={table.userName} date={table.startDate}/>
    {children}
  </View>
)

export default ParentTable