import axios from 'axios'

import { AUTH_SIGN_UP,GET_ERRORS,AUTH_SIGN_OUT,AUTH_SIGN_IN,DASHBOARD_GET_DATA} from './types'

export const signUpUser = (userData,history) => dispatch => {
     axios.post('/users/signup', userData)
          .then(res => {
               dispatch({
                    type: AUTH_SIGN_IN,
                    payload: res.data.token
               })
               localStorage.setItem('JWT_TOKEN', res.data.token);
               axios.defaults.headers.common['Authorization'] = res.data.token
               history.push('/dashboard')
          }
     )
          .catch(err =>dispatch({
          type: GET_ERRORS,
          payload:err.response.data.error
     }))
}

export const signInUser = (userData,history) => dispatch => {
     axios.post('/users/signin', userData)
          .then(res => {
               dispatch({
                    type: AUTH_SIGN_IN,
                    payload: res.data.token
               })
               localStorage.setItem('JWT_TOKEN', res.data.token);
       axios.defaults.headers.common['Authorization'] = res.data.token
               history.push('/dashboard')
          }
     )
          .catch(err =>dispatch({
          type: GET_ERRORS,
               payload: 'Email Or Password invalid.Please Enter Correct Email Or Password'
     }))
}

export const oauthGoogle = (data,history) =>dispatch=> {
     axios.post('/users/oauth/google', {
          access_token:data
     })
          .then(res => {
               dispatch({
               type: AUTH_SIGN_IN,
               payload: res.data.token
               })
               localStorage.setItem('JWT_TOKEN', res.data.token);
               axios.defaults.headers.common['Authorization'] = res.data.token
               history.push('/dashboard')
          })
     .catch(err=>console.log(err))
}

export const oauthFacebook = (data,history) =>dispatch=> {
     axios.post('/users/oauth/facebook', {
          access_token:data
     })
          .then(res => {
               dispatch({
               type: AUTH_SIGN_IN,
               payload: res.data.token
               })
               localStorage.setItem('JWT_TOKEN', res.data.token);
               axios.defaults.headers.common['Authorization'] = res.data.token
               history.push('/dashboard')
          })
     .catch(err=>console.log(err))
}

export const currentUser = (data) =>dispatch=> {
     dispatch({
          type: AUTH_SIGN_IN,
      payload: data
     })
}

export const signOut = () => dispatch => {
     localStorage.removeItem('JWT_TOKEN') 
     axios.defaults.headers.common['Authorization'] =''
     dispatch({
          type: AUTH_SIGN_OUT,
          payload:''
     })
}





export const getSecret = () => dispatch=>{
     axios.get('/users/secret')
          .then(res => {
               dispatch({
                    type: DASHBOARD_GET_DATA,
                    payload:res.data.secret
          }) 
          })
     .catch(err=>console.log(err))
}