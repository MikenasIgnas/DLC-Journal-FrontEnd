/* eslint-disable max-len */
import { useCookies } from 'react-cookie'
import { getPdfFile } from './helpers'
import React          from 'react'
import type { Dayjs }                                   from 'dayjs'
const useGenerateVisitsReport = () => {
  const [loading, setLoading] = React.useState(false)
  const [cookies]             = useCookies(['access_token'])

  const generateVisitsReport = async (url: string, dateFrom: Dayjs | null, dateTo: Dayjs | null) => {
    console.log(dateFrom)
    console.log(dateTo)
    try {
      setLoading(true)
      const response = await getPdfFile(`${url}?dateFrom=${dateFrom}&dateTo=${dateTo}`, cookies.access_token)
      if(response){
        const blob = new Blob([response], { type: 'visit/csv' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'visit.csv'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setLoading(false)
      }
    } catch (error) {
      alert(error)
    }
  }

  return {generateVisitsReport, loading}
}

export default useGenerateVisitsReport