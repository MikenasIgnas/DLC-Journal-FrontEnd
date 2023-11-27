/* eslint-disable max-len */
import React from 'react'
import {Text, View, StyleSheet } from '@react-pdf/renderer'

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
  premise: {
    width:            '20%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  duty: {
    width:            '32%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  problem: {
    width:            '32%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  odoo: {
    width:            '8%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  time: {
    width: '8%',
  },
})

type ChildTableHeaderProps = {
  id: number
}

const ChildTableHeader = ({id}: ChildTableHeaderProps ) => {
  return(
    <View key={id} style={styles.container}>
      <Text style={styles.premise}>Patalpa</Text>
      <Text style={styles.duty}>Veiksmas</Text>
      <Text style={styles.problem}>Problema</Text>
      <Text style={styles.odoo}>Odoo</Text>
      <Text style={styles.time}>Laikas</Text>
    </View>
  )
}

export default ChildTableHeader