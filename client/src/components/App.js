import React,{ Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './Header'
import Dashboard from './Dashboard'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Home from './Home'
import { currentUser,signOut} from '../actions/authActions'
import store from '../store'
import authGuard from './HOCS/authGuard'
import { Provider } from 'react-redux'
import axios from 'axios';
import jwt_decode from 'jwt-decode'



const jwtToken = localStorage.getItem('JWT_TOKEN')
if (jwtToken) {
  axios.defaults.headers.common['Authorization'] = jwtToken
  store.dispatch(currentUser(jwtToken))

  const decoded = jwt_decode(jwtToken)
  const currentTime =Date.now() / 1000
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(signOut())
    //Redirect to Login
    window.location.href='/signin'
  }
    }

class App extends Component{
  render() {
    return (
      <Provider store={store}>
      <Router>
    <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={authGuard(Dashboard)} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </div>
        </Router>
        </Provider>
  );
  }
  
}

export default App
