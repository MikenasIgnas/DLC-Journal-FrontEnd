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

const convertUTCtoLocalTime = (utcTimestamp, timezone) => {
  if(utcTimestamp){
    const dateObject = new Date(utcTimestamp)
    const localTimeString = dateObject.toLocaleString('en-US', {
      timeZone: timezone,
      hour:     'numeric',
      minute:   'numeric',
      hour12:   false,
    })
    return localTimeString
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
}

