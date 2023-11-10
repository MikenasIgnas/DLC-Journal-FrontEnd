import React                        from 'react'
import {Text, View, StyleSheet }    from '@react-pdf/renderer'

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
  container: {
    display:           'flex',
    justifyContent:    'space-between',
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
    width:            '33%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  employee: {
    width:            '33%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date: {
    width: '33%',
  },
})

type TableHeaderProps = {
  id: string | undefined;
  date: string;
  employee: string | undefined
}

const TableHeader = ({date, id, employee}: TableHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.id}>{id}</Text>
    <Text style={styles.employee}>{employee}</Text>
    <Text style={styles.date}>{date}</Text>
  </View>
)

export default TableHeader