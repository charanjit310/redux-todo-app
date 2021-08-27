import axios from '../Services/axiosInstance';

const list = (params = {}) => {
  return axios.get(`/users-listing?role=${params.role}&&page=${params.page}`)
}

const asyncList = async (params = {}) => {
  return await axios.get(`/users-listing?role=${params.role}&&page=${params.page}`)
  // try {
  //   const response = await axios.get(`/users-listing?role=${params.role}&&page=${params.page}`)
  //   return response.data
  // } catch (error) {
  //   return error.response
  // }
}

export const DashboardServices = {
  list,
  asyncList,
}