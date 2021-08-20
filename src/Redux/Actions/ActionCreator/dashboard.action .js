import { actionTypes } from "../actionTypes";

export const fetchUsers = () => {
  return {
    type: actionTypes.ADD_USER,
    payload: user
  }
}

export const login = (user) => {
  return {
    type: actionTypes.LOGIN,
    payload: user
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  }
}