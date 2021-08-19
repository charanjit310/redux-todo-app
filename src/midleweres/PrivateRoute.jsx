import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthsService } from '../Services/auth.service'

export const PrivateRoute = ({ ...props }) => {
  const loggedIn = AuthsService.isLoggedIn()
  return loggedIn ? <Route {...props} /> : <Redirect to="/login" />
}