import axios from "axios";
import { AuthsService } from "./auth.service";
import { Storage } from "./storage.service";

const instance = axios.create({
  baseURL: AuthsService.baseURL,
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