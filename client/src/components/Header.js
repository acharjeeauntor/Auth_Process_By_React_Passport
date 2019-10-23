import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {signOut} from '../actions/authActions'

class Header extends Component {

  onClick = () => {
   this.props.signOut()
  }

     render() {
          return (
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Auth React Passport</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
          </ul>
                <ul className="nav navbar-nav ml-auto">
                  {!this.props.isAuth ? [
                <li className="nav-item" key="signup">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>,
            <li className="nav-item" key="signin">
              <Link className="nav-link" to="/signin">Sign In</Link>
            </li>
              ]:null} 
            {this.props.isAuth?(<li className="nav-item">
              <Link className="nav-link" to="/" onClick={this.onClick}>Sign Out</Link>
            </li>):null}
          </ul>
        </div>
      </nav>
          )
     }
}

const mapStateToProps = (state) => ({
  isAuth:state.auth.isAuthenticated
})


export default connect(mapStateToProps,{signOut})(withRouter(Header))