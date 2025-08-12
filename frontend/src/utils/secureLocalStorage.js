import { decryptData, encryptData } from './encryption';

export const saveToStorage = (key, value) => {
  const encrypted = encryptData(value);
  localStorage.setItem(key, encrypted);
};

export const getFromStorage = (key) => {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;
  return decryptData(encrypted);
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};
