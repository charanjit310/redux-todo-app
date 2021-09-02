import axios from "axios";
import { Storage } from "./storage.service";

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  // baseURL: 'http://bt-app.zapbuild.in/api/',
  // headers: { 'Content-Type': 'multipart/form-data' }
})
// instance.defaults.headers.common = {
//   'Authorization': 'Bearer ' + Storage.getJSON('_token')
// };

instance.interceptors.request.use(function (config) {
  const token = Storage.getJSON('_token')
  config.headers.Authorization = `Bearer ${token}`;
  // config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNjRjZDNjMGFmOTQyY2QwY2JhMjIzZTg5MGY5OTMyZGMyNzFkZWU2MWM4N2QzYWIyNzEwZjk1NWE0YjA4Y2I0OTg5OTIzMjk4ODc0NjM3ZTAiLCJpYXQiOjE2MzA1NjA1ODYsIm5iZiI6MTYzMDU2MDU4NiwiZXhwIjoxNjYyMDk2NTg2LCJzdWIiOiIyNSIsInNjb3BlcyI6W119.ur_PGdBlJOemFNKgeZkGsiwk4HkuOlC7fZqETgdaxTaqsHgMb6QKsYoJ72BtO7BjiD50ylNXDjqOFSLNXa57owCpeHWFIwSUh66dBCPh3w-y77QMoBB7U7UE3-pXunvUr0qMEU8VZ2V5RUw3-v0chEKMjvPIeQKtArlAL0ER2k6eH8MlGyGqw7VM7TH1qYMdAILmTr91STU6xbvqyXMD9YImHLJxQdg_BREEkcFWwvXZjjpitTvsdIDRywbbBARI81FPY942n9IT2hbIRo75g-cd1K-E5MMmL-yyXRbfBckAeDWnZpchu5PZpb4cCH2cATDXTEPMhdiquf1oXFDo5-Rd1Z-yCANK5wO82DoSJsDtjxB3Lc7n_eMm5gucOxqC3bKjLqvJX6lrpeS3xQcqGSyUnMjA0TMSiDaiUPLZ0QPt5dx7xBBL8zv1t47hkVtD3jL19QWO5CkhvAchlg6W-5VylcFC-l-XK8S-CSGN0HAWUbC5fHA16PXgEYOapcjkztboA0QzKnAv_T8zJjYTfwtfdl5Wdq6u7TDy_Lo-WrF3FBTv-Ar0BGsR9TimqOCgVOrP8RLFoobzBJjAOmwP8IFa9FulUe6b1k_oLZdaXnNjQlK5ImOKcRhuLqvEqn4PpULivPbWZn5dL4RAcMxFBJRhxfI-iIKelpXQ_WebFq8`;
  // config.headers.post['Content-Typew'] = 'multipart/form-data';
  return config;
});

export default instance;