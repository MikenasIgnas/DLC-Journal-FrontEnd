import React, { Fragment } from 'react'
import {Text, View, StyleSheet } from '@react-pdf/renderer'

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
type InvoiceItem = {
  sno: number;
  desc: string;
  qty: number;
  rate: number;
};

type InvoiceData = {
  id: string;
  invoice_no: string;
  balance: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  trans_date: string;
  due_date: string;
  items: InvoiceItem[];
};
type InvoiceNoProps = {
  tableData: InvoiceData
}

const InvoiceNo = ({tableData}:InvoiceNoProps) => (
  <Fragment>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Invoice No:</Text>
      <Text style={styles.invoiceDate}>{tableData.invoice_no}</Text>
    </View >
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text >{tableData.trans_date}</Text>
    </View >
  </Fragment>
)

export default InvoiceNo