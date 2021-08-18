import { actionTypes } from "../actionTypes";

export const addUser = (user) => {
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