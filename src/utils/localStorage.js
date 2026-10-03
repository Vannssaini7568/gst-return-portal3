import { seed } from '../data/mockData';

const KEYS = {
  auth: 'gst_auth',
  user: 'gst_user',
  returns: 'gst_returns',
  gstins: 'gst_gstins',
  history: 'gst_upload_history',
  settings: 'gst_settings',
  notifications: 'gst_notifications',
  profile: 'gst_profile',
  users: 'gst_users',
};

export const get = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export const set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const remove = (key) => localStorage.removeItem(key);

export const initStorage = () => {
  if (get(KEYS.returns, null) === null) {
    set(KEYS.returns, seed.returns);
  }

  if (get(KEYS.gstins, null) === null) {
    set(KEYS.gstins, seed.gstins);
  }

  if (get(KEYS.history, null) === null) {
    set(KEYS.history, seed.history);
  }

  if (get(KEYS.users, null) === null) {
    set(KEYS.users, seed.users);
  }

  if (get(KEYS.profile, null) === null) {
    set(KEYS.profile, seed.profile);
  }

  if (get(KEYS.settings, null) === null) {
    set(KEYS.settings, seed.settings);
  }
};

export { KEYS };