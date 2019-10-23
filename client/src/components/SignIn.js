import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import TextFieldGroup from '../common/TextFieldGroup'
import {signInUser,oauthFacebook,oauthGoogle} from '../actions/authActions'

class SignIn extends Component {
      state = {
          email: '',
          password: ''
      }

 
     
onChange=(e)=>{
this.setState({
     [e.target.name]:e.target.value
})
  }
  
onSubmit=(e)=>{
     e.preventDefault()
     const newUser = {
          email:this.state.email,
          password:this.state.password,
     }
    this.props.signInUser(newUser,this.props.history)
     }
     

     responseGoogle = (res) => {
           this.props.oauthGoogle(res.accessToken,this.props.history)
     }
     responseFacebook = (res) => {
           this.props.oauthFacebook(res.accessToken,this.props.history)
  }
     render() {
          return (
               <div className="container"> 
                    <div className="row mt-5">
                         <div className="col">
                              <h4>Sign In</h4>
                        { this.props.errors ? 
            <div className="alert alert-danger">
              { this.props.errors }
            </div> : null }      
                              <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                                        type="email"
                                        placeholder="Enter your Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                   /> 
                                   <TextFieldGroup
            type="password" 
           placeholder="Enter Password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}                                    
          />
       <input type="submit" className="btn btn-info mt-1" />
                         </form>
                         </div>
                         <div className="col">
<div className="text-center">
            <div className="alert alert-primary">
              Or sign In using third-party services
            </div>
            <FacebookLogin
              appId="536936917069216"
              textButton="Facebook"
               fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-outline-primary"
            />
            <GoogleLogin 
              clientId="771294463348-dp7540po6msgu4dvec1ninj2lfiuofne.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn btn-outline-danger"
            />
          </div>
         </div>
           </div>
               </div>
          )
     }
}

const mapStateToProps = (state) => ({
     errors:state.auth.error
})

export default connect(mapStateToProps,{signInUser,oauthFacebook,oauthGoogle})(withRouter(SignIn))