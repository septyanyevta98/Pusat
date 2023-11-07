import {initialStateLogin} from './initialState';
import * as t from './actionTypes';

export const loginReducer = (state = initialStateLogin, action) => {
  switch (action.type) {
    case t.SET_LOGIN_STATE:
      return {
        ...state,
        isLoading: true,
        ...action.payload, // this is what we expect to get back from API call and login page input
        isLoading: false,
        isLoggedIn: true, // we set this as true on login
      };
    case t.SET_LOGOUT_STATE:
      return state;
    default:
      return state;
  }
};
