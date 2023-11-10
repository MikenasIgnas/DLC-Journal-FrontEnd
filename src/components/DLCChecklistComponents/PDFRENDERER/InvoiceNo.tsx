import React, { Fragment } from 'react'
import {Text, View, StyleSheet } from '@react-pdf/renderer'
import { HistoryDataType } from '../../../types/globalTypes'

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection:  'row',
    marginTop:      36,
    justifyContent: 'flex-end',
  },
  invoiceDateContainer: {
    flexDirection:  'row',
    justifyContent: 'flex-end',
  },
  invoiceDate: {
    fontSize:  12,
    fontStyle: 'bold',
  },
  label: {
    width: 60,
  },

})

type InvoiceNoProps = {
  fileName: string | undefined
}

const InvoiceNo = ({fileName}:InvoiceNoProps) => (
  <Fragment>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: {fileName}</Text>
    </View >
  </Fragment>
)

export default InvoiceNo