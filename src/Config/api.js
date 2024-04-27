import axios from "axios";

const jwToken = localStorage.getItem('jwt')

export const API_BASE_URL= 'http://localhost:8080';

export const api = axios.create({baseURL:API_BASE_URL,
  headers:{
  "Authorization":`Bearer ${jwToken}`,
  'Content-Type':'application/json'
}}

)