import axios from "axios";
import { Storage } from "./storage.service";

const instance = axios.create({
  // baseURL: 'http://bt-app.zapbuild.in/api/',
  baseURL: 'http://127.0.0.1:8000/api/',
  // headers: { 'Content-Type': 'multipart/form-data' }
})
// instance.defaults.headers.common = {
//   'Authorization': 'Bearer ' + Storage.getJSON('_token')
// };

instance.interceptors.request.use(function (config) {
  const token = Storage.getJSON('_token')
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;