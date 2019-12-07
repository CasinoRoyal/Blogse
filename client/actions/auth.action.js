import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { API } from '../config';

export const signup = async (userData) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  };
  try {
    const res = await fetch(`${API}/signup`, options);
    return res.json();
  } catch(err) {
      console.log('From auth action: ', err)
  }
};

export const signin = async (userData) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  };
  try {
    const res = await fetch(`${API}/signin`, options);
    return res.json();
  } catch(err) {
      console.log('From auth action: ', err)
  }
};

export const signout = async (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
  try {
    const res = await fetch(`${API}/logout`, {
      method: 'GET'
    })
    return res;
  } catch(err) {
    console.log('signout ', err);
  }
};

export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
};

export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};

// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
      return false;
    }
};