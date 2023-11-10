import React from 'react'
import { View, StyleSheet, Image } from '@react-pdf/renderer'

const styles = StyleSheet.create({

  titleContainer: {
    flexDirection: 'row',
    marginTop:     24,
  },
  reportTitle: {
    color:         '#61dafb',
    letterSpacing: 4,
    fontSize:      25,
    textAlign:     'center',
    textTransform: 'uppercase',
    width:         '200px',
  },
})


const ReportTitle = () => (
  <View style={styles.titleContainer}>
    <Image style={styles.reportTitle} src={'../../Images/DLClogo.png'}/>
  </View>
)

export default ReportTitle