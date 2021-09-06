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
import axios from "axios";
import AddUser from "./components/AddUser";

function App() {
  const isLoggedIn = useSelector((state) => {
    return state.registerReducer.loggedIn
  })
  // console.log(isLoggedIn);
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

  // async function harry() { // async functions always returns Promise
  //   console.log('before fetch');
  //   // let res = await fetch('https://api.github.com/users')
  //   // res = await res.json(); // await res.json() is a method on the Response object that lets you extract a JSON object from the response. The method returns a promise, so you have to wait for the JSON: await response.json().
  //   // console.log('after first fetch');
  //   // let res1 = await fetch(`https://api.github.com/user/${res[0].id}`)
  //   // res1 = await res1.json();
  //   // console.log('after second fetch');
  //   // return res;

  //   // using axios 
  //   // let res = await axios.get('https://api.github.com/users')
  //   // console.log('after first fetch');
  //   // console.log(res.data);
  //   // let res1 = await axios.get(`https://api.github.com/user/${res.data[0].id}`)
  //   // console.log('after second fetch');
  //   // console.log(res1.data);
  //   // return res;

  // }

  // const a = harry();
  // a.then((res) => {
  //   console.log(res);
  // }).catch((err) => {
  //   console.log(err);
  // })
  // console.log('aaaa');
  // console.log('bbbbb');

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
          <PrivateRoute exact path="/add-user" component={AddUser}></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// https://github.com/charanjit310/redux-todo-app/commits/redux-todo-app