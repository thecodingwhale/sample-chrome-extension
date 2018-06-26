import { combineReducers } from 'redux';

import * as Actions from './actions';
import initial from './initial';

function isLoading(state = initial.isLoading, action) {
  switch (action.type) {
    case Actions.SET_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

function error(state = initial.error, action) {
  switch (action.type) {
    case Actions.SET_ERROR:
      return action.error;
    default:
      return state;
  }
}

function isLogin(state = initial.isLogin, action) {
  switch (action.type) {
    case Actions.SET_LOGIN:
      return action.isLogin;
    default:
      return state;
  }
}

function user(state = initial.user, action) {
  switch (action.type) {
    case Actions.SET_USER:
      return action.user;
    default:
      return state;
  }
}

export default combineReducers({
  isLoading,
  isLogin,
  error,
  user,
});
