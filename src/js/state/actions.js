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
