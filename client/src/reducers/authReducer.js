import { AUTH_SIGN_UP,AUTH_SIGN_OUT,AUTH_SIGN_IN,GET_ERRORS} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  token: '',
  error: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case AUTH_SIGN_IN:
            return {
                 ...state,
                 token: action.payload,
                 isAuthenticated: true
      }
    case AUTH_SIGN_OUT:
      return{
        ...state,
        token: action.payload,
        isAuthenticated:false
      }
    case GET_ERRORS:
      return {
        ...state,
        error:action.payload
      }
    default:
      return state
  }
}