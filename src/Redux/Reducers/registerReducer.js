import { Storage } from '../../Services/storage.service'
import { actionTypes } from '../Actions/actionTypes'

const userKeyPrefix = 'users'
let getUsers = Storage.getJSON(userKeyPrefix)
let getState = Storage.getJSON('_state')

const initialState = getState || { loggedIn: false, user: {} }

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
    case actionTypes.LOGIN:
      const newState = {
        ...state,
        loggedIn: true,
        user: action.payload.data,
      }
      Storage.setJSON('_token', action.payload.data.token)
      Storage.setJSON('_state', newState)
      return newState
    case actionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, loggedIn: false, user: {} }
    default:
      return state
  }
}

export default registerReducer