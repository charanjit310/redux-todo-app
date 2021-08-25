import axios from '../Services/axiosInstance';

const list = (params = {}) => {
  return axios.get(`/users-listing?role=${params.role}&&page=${params.page}`)
}

export const DashboardServices = {
  list,
}