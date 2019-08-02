import { enLocalStorageKeys } from 'enums/enLocalStorageKeys';

export function localStorageSetItem(key: enLocalStorageKeys, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function localStorageGetItem(key: enLocalStorageKeys): any {
  return JSON.parse(localStorage.getItem(key));
}
