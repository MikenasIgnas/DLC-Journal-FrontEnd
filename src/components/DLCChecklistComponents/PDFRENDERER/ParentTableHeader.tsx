import React                        from 'react'
import {Text, View, StyleSheet }    from '@react-pdf/renderer'

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
  container: {
    flexDirection:     'row',
    borderBottomColor: '#bff0fd',
    backgroundColor:   '#bff0fd',
    borderBottomWidth: 1,
    alignItems:        'center',
    height:            24,
    textAlign:         'center',
    fontStyle:         'bold',
    flexGrow:          1,
  },
  id: {
    width:            '25%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  problemCount: {
    width:            '5%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  employee: {
    width:            '25%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date: {
    width: '15%',
  },
})

type TableHeaderProps = {
    id: string | undefined;
  date: string;
  problemCount: number;
  employee: string | undefined
}

const TableHeader = ({date, id, problemCount, employee}: TableHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.id}>{id}</Text>
    <Text style={styles.employee}>{employee}</Text>
    <Text style={styles.date}>{date}</Text>
    <Text style={styles.problemCount}>{problemCount}</Text>
  </View>
)

export default TableHeader