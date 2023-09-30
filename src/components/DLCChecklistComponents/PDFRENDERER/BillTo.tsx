import React from 'react'
import {Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop:     20,
    paddingBottom: 3,
    fontFamily:    'Helvetica-Oblique',
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
type tableDataProps = {
  tableData: InvoiceData
}

const BillTo = ({tableData}:tableDataProps) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>{tableData.company}</Text>
    <Text>{tableData.address}</Text>
    <Text>{tableData.phone}</Text>
    <Text>{tableData.email}</Text>
  </View>
)

export default BillTo