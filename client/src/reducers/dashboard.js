import { DASHBOARD_GET_DATA } from '../actions/types';

const initialState = {
  secret:''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case DASHBOARD_GET_DATA:
            return {
                 ...state,
                 secret:action.payload
      }
    default:
      return state
  }
}