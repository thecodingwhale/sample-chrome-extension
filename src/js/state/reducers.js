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
  user,
  // currentUrl,
  // dataset,
});


// function tabIndex(state = initial.tabIndex, action) {
//   switch (action.type) {
//     case Actions.UPDATE_TAB:
//       return action.tabIndex;
//     default:
//       return state;
//   }
// }

// function currentUrl(state = initial.currentUrl, action) {
//   switch (action.type) {
//     case Actions.UPDATE_CURRENT_URL:
//       return action.currentUrl;
//     default:
//       return state;
//   }
// }

// function dataset(state = initial.dataset, action) {
//   switch (action.type) {
//     case Actions.UPDATE_DATASET:
//       return action.dataset;
//     default:
//       return state;
//   }
// }
