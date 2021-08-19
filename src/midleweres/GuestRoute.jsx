import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthsService } from '../Services/auth.service'

export const GuestRoute = ({ ...props }) => {
  console.log({ ...props });
  const loggedIn = AuthsService.isLoggedIn()
  return loggedIn ? <Redirect to="/home" /> : <Route {...props} />
}