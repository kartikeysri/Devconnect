const STORAGE_TOKEN_KEY = 'auth_token';
const STORAGE_USER_KEY = 'auth_user';

export function getStoredToken() {
  return window.localStorage.getItem(STORAGE_TOKEN_KEY);
}

export function setStoredToken(token) {
  if (token) {
    window.localStorage.setItem(STORAGE_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(STORAGE_TOKEN_KEY);
  }
}

export function getStoredUser() {
  const rawUser = window.localStorage.getItem(STORAGE_USER_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  if (user) {
    window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(STORAGE_USER_KEY);
  }
}

export function clearStoredAuth() {
  window.localStorage.removeItem(STORAGE_TOKEN_KEY);
  window.localStorage.removeItem(STORAGE_USER_KEY);
}
