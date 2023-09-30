/* eslint-disable max-len */
import React                          from 'react'
import { Page, Document, StyleSheet } from '@react-pdf/renderer'
import ReportTitle                    from './ReportTitle'
import ChildTable                     from './ChildTable'
import ParentTable                    from './ParentTable'
import { HistoryDataType }            from '../../../types/globalTypes'

const styles = StyleSheet.create({
  page: {
    fontFamily:    'Helvetica',
    fontSize:      11,
    paddingTop:    30,
    paddingLeft:   60,
    paddingRight:  60,
    lineHeight:    1.5,
    flexDirection: 'column',
  },
  logo: {
    width:       74,
    height:      66,
    marginLeft:  'auto',
    marginRight: 'auto',
  },
})

const parentTableStyle = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    marginTop:     24,
    borderWidth:   1,
    borderColor:   '#bff0fd',
  },
})

const childTableStyle = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    marginTop:     0,
    borderWidth:   1,
    padding:       2,
    borderColor:   '#bff0fd',
  },
})

type PDFTableProps = {
  tableData: HistoryDataType[] | undefined
  fetchedPremisesData: {
    routes: null;
    areas: null;
    problems: null;
    todo: null;
  }
}

const PDFTable = ({tableData, fetchedPremisesData }: PDFTableProps) => {
  return(
    <Document>
      <Page size='A4' style={styles.page}>
        <ReportTitle title='Invoice'/>
        {/* <InvoiceNo tableData={tableData}/>
        <BillTo tableData={tableData}/> */}
        {
          tableData?.map((table) => (
            <ParentTable key={table.id} table={table} tableStyle={parentTableStyle}>
              <ChildTable fetchedPremisesData={fetchedPremisesData} table={table} tableStyle={childTableStyle} tableData={tableData}/>
            </ParentTable>
          ))
        }
      </Page>
    </Document>
  )

}

export default PDFTable