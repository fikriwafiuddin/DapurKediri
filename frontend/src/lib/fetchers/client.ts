import axios from "axios"
import { API_URL } from "../constants/application"

export const axiosAuthIntance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export const axiosIntance = axios.create({
  baseURL: API_URL,
})
