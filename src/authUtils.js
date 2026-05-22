// Authentication utility functions
const AUTH_KEY_STORAGE = 'portfolio_auth_key';
const AUTH_TIMESTAMP_STORAGE = 'portfolio_auth_timestamp';
const KEY_EXPIRATION_DAYS = 5;
const KEY_EXPIRATION_MS = KEY_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
const VALID_KEYS = ['PORTFOLIO2026', 'ACCESS5DAYS'];

export const isAuthValid = () => {
  const storedTimestamp = localStorage.getItem(AUTH_TIMESTAMP_STORAGE);

  if (!storedTimestamp) {
    return false;
  }

  const keyTimestamp = parseInt(storedTimestamp, 10);
  const currentTime = Date.now();
  const isExpired = currentTime - keyTimestamp > KEY_EXPIRATION_MS;

  if (isExpired) {
    clearAuth();
    return false;
  }

  return true;
};

export const setAuth = (key) => {
  localStorage.setItem(AUTH_KEY_STORAGE, key);
  localStorage.setItem(AUTH_TIMESTAMP_STORAGE, Date.now().toString());
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY_STORAGE);
  localStorage.removeItem(AUTH_TIMESTAMP_STORAGE);
};

export const getAuthExpirationTime = () => {
  const storedTimestamp = localStorage.getItem(AUTH_TIMESTAMP_STORAGE);

  if (!storedTimestamp) {
    return null;
  }

  const keyTimestamp = parseInt(storedTimestamp, 10);
  const expirationTime = keyTimestamp + KEY_EXPIRATION_MS;

  return new Date(expirationTime);
};

export const validateKey = (key) => {
  return VALID_KEYS.includes(key.trim().toUpperCase());
};
