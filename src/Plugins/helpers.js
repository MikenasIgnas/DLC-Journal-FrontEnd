/* eslint-disable max-len */
const get = async (url, token) => {
  try {
    const response = await fetch(`http://localhost:4000/${url}`, {
      method:  'GET',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    if (response.status === 401) {
      console.error('Unauthorized request')
      return
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}


const getFile = async (url, token) => {
  try {
    const response = await fetch(`http://localhost:4000/${url}`, {
      method:  'GET',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
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

const validateUser = async (url, data) => {
  const options = {
    method:  'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  const response = await fetch(`http://localhost:4000/${url}`, options)
  return response.json()
}

const post = async (url, data, token) => {
  const options = {
    method:  'POST',
    headers: {
      'content-type':  'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }

  const response = await fetch(`http://localhost:4000/${url}`, options)
  return response.json()
}

const postImage = async (url, data, token) => {
  const options = {
    method:  'POST',
    headers: {
      'content-type':  'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  }

  const response = await fetch(`http://localhost:4000/${url}`, options)
  return response.json()
}

const getCurrentDate = () => {
  const currentdate = new Date()
  const datetime = currentdate.getFullYear() + '/'
                  + (currentdate.getMonth()+1) + '/'
                  + currentdate.getDate()
  return datetime
}

const getCurrentTime = () => {
  const currentdate = new Date()
  const currentTime = currentdate.getHours() + ':'
                  + currentdate.getMinutes()
  return currentTime
}

const clearFilleChecklistdData = (totalAreasCount) => {
  for (let i = 1; i < totalAreasCount +1; i++) {
    localStorage.removeItem(`data${i}`)
  }
}

const uploadPhoto = async(fileList, setUploading, setFileList, url) => {
  const formData = new FormData()
  formData.append('file', fileList )
  setUploading(true)
  fetch(`http://localhost:4000/${url}`, {
    method: 'POST',
    body:   formData,
  })
    .then((res) => res.json())
    .then(() => {
      setFileList(fileList)
    })
    .finally(() => {
      setUploading(false)
    })
}


const deleteTableItem = async(id, setTableItems, tableItems, cookie, url, url2, url3) => {
  const tableItemRemoved = (id) => {
    if(tableItems){
      let newTableItems = [...tableItems]
      newTableItems = newTableItems.filter(x => x.id !== id)
      setTableItems(newTableItems)
    }
  }
  const deletionDate = getCurrentDate()
  if(tableItemRemoved){
    await get(`${url}/${id}`, cookie)
    if(url2 && url3){
      await post(`${url2}/${id}`, {status: 'inactive'}, cookie)
      await post(`${url3}/${id}`, {dateDeleted: deletionDate}, cookie)
      tableItemRemoved(id)
    }
    tableItemRemoved(id)
  }
}
const calculateTimeDifference = (startDate, startTime, endDate, endTime) => {
  if(startDate && startTime && endDate && endTime){
    const startDateTime = new Date(`${startDate} ${startTime}`)
    const endDateTime = new Date(`${endDate} ${endTime}`)
    const timeDifference = Number(endDateTime) - Number(startDateTime)
    const hours = Math.floor(timeDifference / (1000 * 60 * 60))
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
    const result = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    return result
  }else{
    return
  }
}

const convertUTCtoLocalTime = (utcTimestamp) => {
  if(utcTimestamp){
    const dateObject = new Date(utcTimestamp)
    const localTimeString = dateObject.toLocaleString('en-US', {
      timeZone: 'Europe/Vilnius',
      hour:     'numeric',
      minute:   'numeric',
      hour12:   false,
    })
    return localTimeString
  }
}
const convertUTCtoLocalDate = (utcTimestamp) => {
  if (utcTimestamp) {
    const dateObject = new Date(utcTimestamp)
    const day = dateObject.toLocaleString('en-US', { day: '2-digit' })
    const month = dateObject.toLocaleString('en-US', { month: '2-digit' })
    const year = dateObject.toLocaleString('en-US', { year: 'numeric' })
    const localDateTimeString = `${year}-${month}-${day}`
    return localDateTimeString
  }
}

const convertUTCtoLocalDateTime = (utcTimestamp) => {
  if (utcTimestamp) {
    const dateObject = new Date(utcTimestamp)
    const day = dateObject.toLocaleString('en-US', { day: '2-digit' })
    const month = dateObject.toLocaleString('en-US', { month: '2-digit' })
    const year = dateObject.toLocaleString('en-US', { year: 'numeric' })
    const hour = dateObject.toLocaleString('en-US', { hour: '2-digit', hour12: false })
    const minute = dateObject.toLocaleString('en-US', { minute: 'numeric' })
    const localDateTimeString = `${year}-${month}-${day}, ${hour}:${minute}`
    return localDateTimeString
  }
}


const generatePDF = async (visitId, token) => {
  try {
    const response = await getFile(`generatePDF?visitId=${visitId}`, token)
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

const generateCustomPDF = async (dateFrom, dateTo, token) => {
  try {
    const response = await getFile(`generateCustomPDF?dateFrom=${dateFrom}&dateTo=${dateTo}`, token)
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
  uploadPhoto,
  deleteTableItem,
  calculateTimeDifference,
  convertUTCtoLocalTime,
  convertUTCtoLocalDateTime,
  convertUTCtoLocalDate,
  getFile,
  generatePDF,
  generateCustomPDF,
}

