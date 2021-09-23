import { Storage } from "./storage.service";

const isLoggedIn = () => {
  // return !!Storage.getJSON('_token') || false   // if we have token then return true else false
  return !!Storage.getJSON('_token')   // if we have token then return true else false
}

const baseURL = `http://127.0.0.1:8000/api/`;
const formDataConfig = { // Configs for FormData
  headers: {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
    "Authorization": `Bearer ${Storage.getJSON('_token')}`
  }
}

export const AuthsService = {
  isLoggedIn,
  baseURL,
  formDataConfig,
}