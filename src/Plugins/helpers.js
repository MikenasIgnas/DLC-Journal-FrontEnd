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
export { get, post,getCurrentDate, getCurrentTime, clearFilleChecklistdData, validateUser, postImage }
