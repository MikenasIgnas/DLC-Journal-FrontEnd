/* eslint-disable max-len */
import React                                from 'react'
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'
import { HistoryDataType }                  from '../../../types/globalTypes'

const styles = StyleSheet.create({
  body: {
    paddingTop:        35,
    paddingBottom:     65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize:  24,
    textAlign: 'center',
  },
  text: {
    margin:    12,
    fontSize:  14,
    textAlign: 'justify',

  },
  image: {
    marginVertical:   15,
    marginHorizontal: 100,
  },
  header: {
    fontSize:     12,
    marginBottom: 20,
    textAlign:    'center',
    color:        'grey',
  },
  pageNumber: {
    position:  'absolute',
    fontSize:  12,
    bottom:    30,
    left:      0,
    right:     0,
    textAlign: 'center',
    color:     'grey',
  },
})

type PDFFileProps = {
  pdfData: HistoryDataType[] | undefined
}

const PDFFile = ({ pdfData }:PDFFileProps) => {
  return (
    <Document>
      <Page>
        <Text>

        </Text>
      </Page>
    </Document>
  // <Page>
  //   <Image style={{height: '20px', width: '140px'}} src='../../../Images/DLClogo.png'/>
  //   <Text style={styles.header} >Patalpų tikrinimo ataskaita</Text>
  //   <Text style={styles.header} >{pdfData?.[0].startDate} - {pdfData?.[pdfData?.length -1].startDate}</Text>
  //   <Text style={styles.text}>
  //     {pdfData?.map((el) => (
  //       <div style={{display: 'block'}} key={el.id}>
  //         <Text>{el.startDate}</Text>
  //       </div>
  //     ))}
  //   </Text>
  //   <Text
  //     style={styles.pageNumber}
  //     render={({ pageNumber, totalPages }) =>
  //       `${pageNumber} / ${totalPages}`
  //     }
  //   />
  // </Page>
  )
}

export default PDFFile