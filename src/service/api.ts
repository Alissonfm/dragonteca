import axios from "axios";

const baseURL = "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1"

type ApiCallT = {
  path: string
  data?: any,
}

const API = {
  get: ({ path, data }: ApiCallT) => axios({ url: `${baseURL}/${path}`, method: 'GET', data }),
  post: ({ path, data }: ApiCallT) => axios({ url: `${baseURL}/${path}`, method: 'POST', data }),
  put: ({ path, data }: ApiCallT) => axios({ url: `${baseURL}/${path}`, method: 'PUT', data }),
  delete: ({ path, data }: ApiCallT) => axios({ url: `${baseURL}/${path}`, method: 'DELETE', data }),
}
