import axios from '../Services/axiosInstance';

const list = (params = {}) => {
  return axios.get(`/users-listing?role=${params.role}`)
}

export const DashboardServices = {
  list,
}