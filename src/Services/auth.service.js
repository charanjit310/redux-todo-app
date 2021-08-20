import { Storage } from "./storage.service";

const isLoggedIn = () => {
  // return !!Storage.getJSON('_token') || false   // if we have token then return true else false
  return !!Storage.getJSON('_token')   // if we have token then return true else false
}

export const AuthsService = {
  isLoggedIn
}