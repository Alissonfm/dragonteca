import axios, { Method } from "axios";

const baseURL = "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1"

type ApiCallT = {
  path: string
  data?: any,
}

const handleRequest = async (url: string, method: Method, data?: any) => {
  try {
    // return await (await axios({ url, method, data })).data
    return await axios({ url, method, data }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response
      } else {
        console.error("Error response on request: ", response)
        return response
      }
    })
  } catch (error) {
    console.log("Error on trying to make a request: ", error)
  }
}

const API = {
  get: ({ path, data }: ApiCallT) => handleRequest(`${baseURL}/${path}`, 'GET', data),
  post: ({ path, data }: ApiCallT) => handleRequest(`${baseURL}/${path}`, 'POST', data),
  put: ({ path, data }: ApiCallT) => handleRequest(`${baseURL}/${path}`, 'PUT', data),
  delete: ({ path, data }: ApiCallT) => handleRequest(`${baseURL}/${path}`, 'DELETE', data),
}


export default API