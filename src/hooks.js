import { useState } from 'react';
export const useLocalStorage = (key, initialValue) => {
  const [localStore, setLocalStore] = useState(()=>{
    const alarmList = localStorage.getItem(key);
    return alarmList ? JSON.parse(alarmList) : initialValue;
  });
  const setValue = (value) => {
    setLocalStore(value);
    localStorage.setItem(key, JSON.stringify(value));
  }
  return [localStore, setValue]
}