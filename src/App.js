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

function App() {
  console.log('ddd');
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
        <Navbar />
        <Switch>
          {/* <Route exact path="/" component={Home}></Route> */}
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/contact" component={Contact}></Route>
          <Route exact path="/verifyOTP" component={VerifyOTP}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
