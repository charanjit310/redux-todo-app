import { Storage } from '../../Services/storage.service'
import { actionTypes } from '../Actions/actionTypes'

const userKeyPrefix = 'users'
let getUsers = Storage.getJSON(userKeyPrefix)

const initialState = {
  loggedIn: false,
  user: {},
  allUsers: getUsers,
}
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      if (getUsers == null) {
        // console.log('1111');
        Storage.setJSON(userKeyPrefix, [action.payload])
      } else {
        // console.log('2222');
        getUsers.push(action.payload)
        Storage.setJSON(userKeyPrefix, getUsers)
      }

      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        allUsers: getUsers
      }
    default:
      return state
  }
}

export default registerReducer