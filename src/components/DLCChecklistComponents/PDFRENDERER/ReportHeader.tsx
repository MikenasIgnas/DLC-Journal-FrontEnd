/* eslint-disable max-len */
import React                      from 'react'
import {Text, View, StyleSheet }  from '@react-pdf/renderer'
import { HistoryDataType }        from '../../../types/globalTypes'

const styles = StyleSheet.create({
  headerContainer: {
    width:          '100%',
    marginTop:      36,
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'center',
    textAlign:      'center',
    alignItems:     'center',
  },
  headerTitle: {
    fontSize: '15px',
  },
  image: {
    width: '150px',
  },
})

type tableDataProps = {
  tableData:    HistoryDataType[] | undefined
  fileName:     string | undefined
  specificDate: string | undefined
}

const ReportHeader = ({ tableData, specificDate }:tableDataProps) => {
  const monthlyReportDate = `${tableData?.[0].startDate} - ${tableData?.[tableData.length - 1].startDate}`
  return(
    <View key={Math.random()} style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Patalpu tikrinimo ataskaita</Text>
      <Text>{specificDate ? specificDate : monthlyReportDate}</Text>
    </View>
  )
}

export default ReportHeader