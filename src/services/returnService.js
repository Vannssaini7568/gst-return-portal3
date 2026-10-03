import { get, set, KEYS } from '../utils/localStorage';

export const getReturns = () => get(KEYS.returns, []);

export const addReturn = (r) => {
  const x = [r, ...getReturns()];
  set(KEYS.returns, x);
  return r;
};

export const updateReturn = (r) => {
  const x = getReturns().map((a) => (a.id === r.id ? r : a));
  set(KEYS.returns, x);
  return r;
};

export const deleteReturn = (id) =>
  set(
    KEYS.returns,
    getReturns().filter((r) => r.id !== id)
  );

export const getUploadHistory = () => get(KEYS.history, []);

export const addHistory = (r) =>
  set(KEYS.history, [r, ...getUploadHistory()]);