import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyOTP from "./components/VerifyOTP";
import { useSelector, useDispatch } from 'react-redux'
import { AuthsService } from "./Services/auth.service";
import { PrivateRoute, GuestRoute } from "./midleweres";


function App() {
  const isLoggedIn = useSelector((state) => {
    return state.registerReducer.loggedIn
  })
  console.log(isLoggedIn);
  // let p = new Promise((res, rej) => {
  //   let i = 3
  //   if (i == 2) {
  //     res('SUCCESS')
  //   }
  //   rej("ERROR");
  // })
  // p.then((messages) => {
  //   console.log('this is in then ' + messages);
  // }).catch((errorMessage) => {
  //   console.log('this is in catch ' + errorMessage);
  // })
  return (
    <Router>
      <div>
        {isLoggedIn && <Navbar />}
        <Switch>
          <GuestRoute exact path="/login" component={Login}></GuestRoute>
          <GuestRoute exact path="/register" component={Register}></GuestRoute>
          <GuestRoute exact path="/verifyOTP" component={VerifyOTP}></GuestRoute>
          <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
          <PrivateRoute exact path="/about" component={About}></PrivateRoute>
          <PrivateRoute exact path="/contact" component={Contact}></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// https://github.com/charanjit310/redux-todo-app/commits/redux-todo-app