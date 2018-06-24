import qs from 'qs';

export const SET_LOADING = 'SET_LOADING';
export function setLoading(isLoading) {
  return {
    type: SET_LOADING,
    isLoading,
  };
}

export const SET_LOGIN = 'SET_LOGIN';
export function setLogin(isLogin) {
  return {
    type: SET_LOGIN,
    isLogin,
  };
}

export const SET_USER = 'SET_USER';
export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export function makePaymentSuccess() {
  return {
    type: PAYMENT_SUCCESS
  };
}

// export const UPDATE_DATASET = 'UPDATE_DATASET';
// export function updateDataset(dataset) {
//   return {
//     type: UPDATE_DATASET,
//     dataset,
//   };
// }

// export const UPDATE_TAB = 'UPDATE_TAB';
// export function updateTab(tabIndex) {
//   return {
//     type: UPDATE_TAB,
//     tabIndex,
//   };
// }

// export const UPDATE_CURRENT_URL = 'UPDATE_CURRENT_URL';
// export function updateCurrentUrl(currentUrl) {
//   return {
//     type: UPDATE_CURRENT_URL,
//     currentUrl,
//   };
// }
