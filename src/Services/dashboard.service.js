import axios from '../Services/axiosInstance';

const list = (params = {}) => {
  return axios.get(`/users-listing?role=${params.role}&&page=${params.page}`)
}

const asyncList = async (params = {}) => {
  console.log('sssssssssssssssssssssssss');
  // return await axios.post(`/save-professional-info`, {
  //   // data: { "registration": [{ "registration_number": "44444444", "registration_authority": "1234", "year": "2021", "document": {} }], "education": [{ "id": 11, "user_id": 28, "qualification": "12", "college_university": "hindu college", "year": 1996, "document": "public/doctor/education/2aaesthzEoA0iVhiuDHDYa2YBU7h1P2ucd83j6tv.png", "created_at": "2021-09-01T13:47:49.000000Z", "updated_at": "2021-09-01T13:47:49.000000Z" }], "workExperince": [{ "id": 1, "user_id": 28, "role": "ss", "clinic_name": "ss", "address_line1": "sds", "address_line2": "sdd", "city": "Khem Kar", "state": "Eastern", "country": "India", "zipcode": "1234", "duration": "ff", "reference": "ff", "linkedin_profile": "ff", "reference_email": "fff", "reference_phone": "fff", "current_organization": 0, "created_at": "2021-08-30T13:47:44.000000Z", "updated_at": "2021-09-01T14:27:44.000000Z" }], "speciality": [{ "label": "  Cardiology - Non Interventional", "value": 0 }], "document": "" }
  //   data: data
  // })
  // // try {
  // //   const response = await axios.get(`/users-listing?role=${params.role}&&page=${params.page}`)
  // //   return response.data
  // // } catch (error) {
  // //   return error.response
  // // }
}

const deleteItem = async (data) => {
  console.log('delete');
  console.log(data);
  return await axios.delete(`/activate-inactivate-user`,
    {
      data: data // passing the payload with delete request
    }
  )
}

const getUserById = async (id) => {
  return await axios.get(`/profile-details/${id}`)
}

export const DashboardServices = {
  list,
  asyncList,
  deleteItem,
  getUserById,
}