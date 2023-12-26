
import React                      from 'react'
import {Text, View, StyleSheet }  from '@react-pdf/renderer'

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
  description: {
    width:            '20%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width:            '20%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    width:            '20%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: '20%',
  },
  aaa: {
    width: '20%',
  },
})

type TableHeaderProps = {
  headerTitle:  string | undefined;
  employee:     string;
  date:         string;
  problemCount: number;
}

const TableHeader = ({date, headerTitle, problemCount}: TableHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.description}>Patalpa: {headerTitle}</Text>
    <Text style={styles.rate}>Veiksmas: {date}</Text>
    <Text style={styles.aaa}>Problema: {date}</Text>
    <Text style={styles.amount}>Odoo: {problemCount}</Text>
    <Text style={styles.amount}>Laikas: {problemCount}</Text>
  </View>
)

export default TableHeader