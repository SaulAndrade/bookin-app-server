export const sendQuery = async (query, token='') => {
  const reqBody = {
    query:query
  }

  const config = {
    method:'POST',
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json',
    }
  }
  if (token){
    config.headers = { ...config.headers, 'Authorization': `Bearer ${token}`}
  }

  const response = await fetch('http://localhost:3001/graphql', config)
  const responseJson = await response.json()

  if (Object.keys(responseJson).includes('errors')){
    return {
      data:null, 
      msg:responseJson.errors[0].message
    }
  }

  return {
    data:{...responseJson.data}, 
    msg:'ok'
  }
}