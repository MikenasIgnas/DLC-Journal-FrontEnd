/* eslint-disable max-len */
import React, {Fragment} from 'react'
import {Text, View, StyleSheet } from '@react-pdf/renderer'
import { TodoType } from '../../../types/globalTypes'

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
  row: {
    flexDirection:     'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems:        'center',
    height:            24,
    fontStyle:         'bold',
  },
  premiseName: {
    width:            '20%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign:        'right',
    paddingRight:     8,
  },
  duty: {
    width:            '30%',
    textAlign:        'left',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft:      8,
  },
  problem: {
    width:            '20%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign:        'right',
    paddingRight:     8,
  },
  odoo: {
    width:        '15%',
    textAlign:    'right',
    paddingRight: 8,
  },
  time: {
    width:        '15%',
    textAlign:    'right',
    paddingRight: 8,
  },
})

type InvoiceTableRowType = {
  todoInArea: TodoType[] | undefined
  pageID: number | undefined
  premiseName: string | undefined
  possibleProblem: string | undefined
  ticketNr: string | undefined,
  time: string | undefined
}

const ChildTableRows = ({todoInArea, premiseName, possibleProblem, ticketNr, time}: InvoiceTableRowType) => {
  const rows = todoInArea?.map( (item) => {
    const replaceSpecialCharacters = (text: string | undefined) => {
      const replacements:  { [key: string]: string } = {
        'ą': 'a',
        'č': 'c',
        'ę': 'e',
        'ė': 'e',
        'į': 'i',
        'š': 's',
        'ū': 'u',
        'ų': 'u',
        'ž': 'z',
      }

      for (const char in replacements) {
        const regex = new RegExp(char, 'g')
        text = text?.replace(regex, replacements[char])
      }
      return text
    }
    const replacedText = replaceSpecialCharacters(item.duty)
    const replacedPremiseNameText = replaceSpecialCharacters(premiseName)

    return(
      <View style={styles.row} key={item.id?.toString()}>
        <Text key={item?.id} style={styles?.premiseName}>{replacedPremiseNameText}</Text>
        <Text key={item?.id} style={styles?.duty}>{replacedText}</Text>
        <Text key={item?.id} style={styles?.problem}>{possibleProblem}</Text>
        <Text key={item?.id} style={styles?.odoo}>{ticketNr !== 'undefined' ? ticketNr : '-'}</Text>
        <Text key={item?.id} style={styles?.time}>{time}</Text>
        {/* <Text style={styles.qty}>{item?.qty}</Text>
        <Text style={styles.rate}>{item?.rate}</Text>
        <Text style={styles.amount}>{(item?.qty * item?.rate).toFixed(2)}</Text> */}
      </View>
    )
  }
  )
  return (<Fragment>{rows}</Fragment> )
}

export default ChildTableRows