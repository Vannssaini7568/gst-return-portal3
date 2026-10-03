import { get, set, KEYS } from '../utils/localStorage';

export const getGSTINs = () => get(KEYS.gstins, []);

export const addGSTIN = (r) => {
  set(KEYS.gstins, [r, ...getGSTINs()]);
  return r;
};

export const updateGSTIN = (r) => {
  set(
    KEYS.gstins,
    getGSTINs().map((x) => (x.id === r.id ? r : x))
  );

  return r;
};

export const deleteGSTIN = (id) =>
  set(
    KEYS.gstins,
    getGSTINs().filter((x) => x.id !== id)
);