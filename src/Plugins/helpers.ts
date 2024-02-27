/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

import { TokenType } from '../types/globalTypes'

const get = async (url: string, token: TokenType) => {
  const response = await fetch(`http://localhost:4002/${url}`, {
    method:  'GET',
    headers: {
      'Content-Type': 'application/json',
      'token':        `${token}`,
    },
  })

  if (response.ok) {
    return response.json()
  } else {
    const responseJson = await response.json()
    throw new Error(responseJson.message)
  }
}

const patch = async (url: string, values: any, token: TokenType) => {
  try {
    const options = {
      method:  'PATCH',
      headers: {
        'content-type': 'application/json',
        'token':        `${token}`,
      },
      body: JSON.stringify(values),
    }

    const response = await fetch(`http://localhost:4002/${url}`, options)
    if(response.ok){
      return response.json()
    }else{
      const responseJson = await response.json()
      throw new Error(responseJson.messsage)
    }
  } catch (error) {
    console.error(error)
  }
}

const put = async (url: string, values: any, token: string, fileList?:any, setUploading?: any, setFileList?: any, formDataName?: string) => {
  if(fileList && setUploading && setFileList){

    const formData = new FormData()

    if (formDataName && fileList && fileList.length > 0) {
      formData.append(formDataName, fileList)
    }

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (Array.isArray(values[key])) {
          values[key].forEach((item: any) => {
            formData.append(`${key}[]`, item)
          })
        } else {
          formData.append(key, values[key])
        }
      }
    }

    setUploading(true)

    try {
      const response = await fetch(`http://localhost:4002/${url}`, {
        method:  'PUT',
        headers: {
          'token': token,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || 'Unknown error', data: null }
      }

      setFileList(data)

      return { error: null, data: data }
    } catch (error) {

      if (error instanceof Error) {
        return { error: error.message, data: null }
      } else {
        return { error: 'An unknown error occurred', data: null }
      }
    } finally {
      setUploading(false)
    }
  }else{
    const options = {
      method:  'PUT',
      headers: {
        'content-type': 'application/json',
        'token':        `${token}`,
      },
      body: JSON.stringify(values),
    }

    const response = await fetch(`http://localhost:4002/${url}`, options)
    if(response.ok){
      return response.json()
    }else{
      const responseJson = await response.json()
      throw new Error(responseJson.messsage)
    }
  }
}

const post = async (url: string, values: any, token: string, fileList?:any, setUploading?: any, setFileList?: any) => {
  if(fileList && setUploading && setFileList){

    const formData = new FormData()

    if (fileList && fileList.length > 0) {
      formData.append('photo', fileList)
    }

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (Array.isArray(values[key])) {
          values[key].forEach((item: any) => {
            formData.append(`${key}[]`, item)
          })
        } else {
          formData.append(key, values[key])
        }
      }
    }

    setUploading(true)

    try {
      const response = await fetch(`http://localhost:4002/${url}`, {
        method:  'POST',
        headers: {
          'token': token,
        },
        body: formData,
      })

      const data = await response.json()
      setFileList(fileList[0])
      return data

    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setUploading(false)
    }
  }else{

    const options = {
      method:  'POST',
      headers: {
        'content-type': 'application/json',
        'token':        `${token}`,
      },
      body: JSON.stringify(values),
    }

    const response = await fetch(`http://localhost:4002/${url}`, options)
    if(response.ok){
      return response.json()
    }else{
      const responseJson = await response.json()
      throw new Error(responseJson.message)
    }
  }
}

const postDocument = async (url: string, values: any, token: string, fileList?:any, setFileList?: any) => {
  if(fileList && setFileList){

    const formData = new FormData()

    if (fileList && fileList.length > 0) {
      formData.append('file', fileList)
    }

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (Array.isArray(values[key])) {
          values[key].forEach((item: any) => {
            formData.append(`${key}[]`, item)
          })
        } else {
          formData.append(key, values[key])
        }
      }
    }

    try {
      const response = await fetch(`http://localhost:4002/${url}`, {
        method:  'POST',
        headers: {
          'token': token,
        },
        body: formData,
      })

      const data = await response.json()
      setFileList(fileList[0])
      return data

    } catch (error) {
      console.log(error)
    }
  }else{
    const options = {
      method:  'POST',
      headers: {
        'content-type': 'application/json',
        'token':        `${token}`,
      },
      body: JSON.stringify(values),
    }

    const response = await fetch(`http://localhost:4002/${url}`, options)
    return response.json()
  }
}

const deleteItem = async (url: string, data: any, token: string) => {
  const options = {
    method:  'DELETE',
    headers: {
      'content-type': 'application/json',
      'token':        `${token}`,
    },
    body: JSON.stringify(data),
  }
  const response = await fetch(`http://localhost:4002/${url}`, options)

  if(response.ok){
    return response.json()
  }else{
    const responseJson = await response.json()
    throw new Error(responseJson.message)
  }
}

const getPdfFile = async (url: string, token: TokenType) => {
  try {
    const response = await fetch(`http://localhost:4002/${url}`, {
      method:  'GET',
      headers: {
        'Content-Type': 'application/json',
        'token':        `${token}`,
      },
    })

    if (response.status === 401) {
      console.error('Unauthorized request')
      return null
    }

    const data = await response.blob()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}


const getFile = async (url: string, token: TokenType) => {
  try {
    const response = await fetch(`http://localhost:4002/${url}`, {
      method:  'GET',
      headers: {
        'Content-Type': 'application/json',
        'token':        `${token}`,
      },
    })

    if (response.status === 404) {
      console.error('Document file not found')
      return null
    }

    if (response.status === 500) {
      console.error('Unexpected error')
      return null
    }

    if (response.status === 401) {
      console.error('Unauthorized request')
      return null
    }

    if (response.ok) {
      const data = await response.blob()
      return data
    }

    throw new Error('An error occurred while fetching the document')
  } catch (error) {
    console.error(error)
    return null
  }
}

const downloadFile = async (url: string, name: string, format: string, token: TokenType) => {
  const blob = await getFile(url, token)
  if (blob) {
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `${name}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } else {
    console.error('Failed to download file')
  }
}

const getCsvFile = async (url: string, data: any, token: TokenType) => {
  const options = {
    method:  'POST',
    headers: {
      'content-type': 'application/json',
      'token':        `${token}`,
    },
    body: JSON.stringify(data),
  }

  const response = await fetch(`http://localhost:4002/${url}`, options)
  const doc = await response.blob()
  return doc
}

const generateCsv = async (url: string, data: any, cookie: TokenType) => {
  try {
    const response = await getCsvFile(url, data, cookie)
    if(response){
      const blob = new Blob([response], { type: 'kolokacijos/csv' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'kolokacijos.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } catch (error) {
    console.error('Error downloading file:', error)
  }
}
const validateUser = async (url: string, data: any) => {
  const options = {
    method:  'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  const response = await fetch(`http://localhost:4002/auth/${url}`, options)
  if(response.ok){
    return response.json()
  }else{
    const responseJson = await response.json()
    throw new Error(responseJson.message)
  }
}

const postImage = async (url: string, data: any, token: TokenType) => {
  const options = {
    method:  'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'token':        `${token}`,
    },
    body: data,
  }

  const response = await fetch(`http://localhost:4002/${url}`, options)
  return response.json()
}

const getCurrentDate = () => {
  const currentdate = new Date()
  const year = currentdate.getFullYear()
  const month = (currentdate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentdate.getDate().toString().padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}
const getCurrentTime = () => {
  const currentdate = new Date()
  const currentTime = currentdate.getHours() + ':'
                  + currentdate.getMinutes()
  return currentTime.padStart(2, '0')
}

const clearFilleChecklistdData = (totalAreasCount: number) => {
  for (let i = 1; i < totalAreasCount +1; i++) {
    localStorage.removeItem(`data${i}`)
  }
}



const deleteTableItem = async(url: string, data: any, postData: any, setData: any, cookie: string) => {
  const tableItemRemoved = (id: string) => {
    if(data){
      let newTableItems = [...data]
      newTableItems = newTableItems.filter(x => x._id !== id)
      setData(newTableItems)
    }
  }

  if(tableItemRemoved){
    await deleteItem(`${url}`, postData, cookie)
    tableItemRemoved(postData.id)
  }
}

const calculateTimeDifference = (startDate: Date | undefined, endDate: Date | undefined) => {
  if(startDate && endDate){
    const startDateTime   = new Date(`${startDate}`)
    const endDateTime     = new Date(`${endDate}`)
    const timeDifference  = Number(endDateTime) - Number(startDateTime)
    const hours           = Math.floor(timeDifference / (1000 * 60 * 60))
    const minutes         = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
    const result          = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    return result
  }else{
    return
  }
}

const convertUTCtoLocalTime = (utcTimestamp: Date | undefined) => {
  if(utcTimestamp){
    const date      = new Date(utcTimestamp)
    const hours     = date.getHours()
    const minutes   = date.getMinutes()

    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    return timeString
  }
}

const convertUTCtoLocalDate = (utcTimestamp: Date | undefined | string) => {
  if (utcTimestamp) {
    const dateObject          = new Date(utcTimestamp)
    const day                 = dateObject.toLocaleString('en-US', { day: '2-digit' })
    const month               = dateObject.toLocaleString('en-US', { month: '2-digit' })
    const year                = dateObject.toLocaleString('en-US', { year: 'numeric' })
    const localDateTimeString = `${year}-${month}-${day}`
    return localDateTimeString
  }
}

const convertUTCtoLocalDateTime = (utcTimestamp: Date | undefined) => {
  if (utcTimestamp) {
    const dateObject          = new Date(utcTimestamp)
    const hour                = dateObject.toLocaleString('en-US', { hour: '2-digit', hour12: false })
    const minute              = dateObject.toLocaleString('en-US', { minute: 'numeric' })
    const localDateTimeString = `${hour}:${minute}`
    return localDateTimeString
  }
}


const generatePDF = async (visitId: number, token: TokenType) => {
  try {
    const response = await getPdfFile(`generatePDF?visitId=${visitId}`, token)
    if(response){
      const blob = new Blob([response], { type: 'visit/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'visit.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } catch (error) {
    console.error('Error downloading file:', error)
  }
}

const generateCustomPDF = async (dateFrom: string, dateTo: string, token: TokenType) => {
  try {
    const response = await getPdfFile(`generateMultipleVisitPdf?dateFrom=${dateFrom}&dateTo=${dateTo}`, token)
    if(response){
      const blob = new Blob([response], { type: 'visit/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'visit.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } catch (error) {
    console.error('Error downloading file:', error)
  }
}


export {
  get,
  post,
  getCurrentDate,
  getCurrentTime,
  clearFilleChecklistdData,
  validateUser,
  postImage,
  deleteTableItem,
  calculateTimeDifference,
  convertUTCtoLocalTime,
  convertUTCtoLocalDateTime,
  convertUTCtoLocalDate,
  getPdfFile,
  generatePDF,
  generateCustomPDF,
  getCsvFile,
  generateCsv,
  put,
  patch,
  deleteItem,
  getFile,
  downloadFile,
  postDocument,
}

