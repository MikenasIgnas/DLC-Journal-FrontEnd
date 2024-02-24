/* eslint-disable max-len */
import { useCookies } from 'react-cookie'
import { getPdfFile } from './helpers'
import React          from 'react'

const useGenerateSingleVisitPDF = () => {
  const [loading, setLoading] = React.useState(false)
  const [cookies]             = useCookies(['access_token'])

  const generateSingleVisitPDF = async (visitId: string) => {
    try {
      setLoading(true)
      const response = await getPdfFile(`visit/pdf?id=${visitId}`, cookies.access_token)
      if(response){
        const blob = new Blob([response], { type: 'visit/pdf' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'visit.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  return {generateSingleVisitPDF, loading}
}

export default useGenerateSingleVisitPDF