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
    textAlign:         'center',
  },
  premiseName: {
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
      <View style={styles.row} key={item.id}>
        <Text key={item?.id} style={styles?.premiseName}>{replacedPremiseNameText}</Text>
        <Text key={item?.id} style={styles?.duty}>{replacedText}</Text>
        <Text key={item?.id} style={styles?.problem}>{possibleProblem}</Text>
        <Text key={item?.id} style={styles?.odoo}>{ticketNr !== 'undefined' ? ticketNr : '-'}</Text>
        <Text key={item?.id} style={styles?.time}>{time}</Text>
      </View>
    )
  }
  )
  return (<Fragment>{rows}</Fragment> )
}

export default ChildTableRows